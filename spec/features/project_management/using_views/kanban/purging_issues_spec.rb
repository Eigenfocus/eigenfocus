require 'rails_helper'

describe "As a project manager, I want to achieve a issue from kanban board" do
  let!(:user) { FactoryBot.create(:user) }

  let!(:project) { FactoryBot.create(:project) }

  let!(:grouping) { FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO") }

  let!(:issue) { FactoryBot.create(:issue, project: project, title: "DELETE ME") }

  let!(:archived_issue) { FactoryBot.create(:issue, :archived, project: project, title: "ARCHIVED ISSUE") }

  before(:each) do
    FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)
    FactoryBot.create(:grouping_issue_allocation, issue: archived_issue, grouping: grouping)
  end

  def archive_issue(issue)
    visit visualization_path(project.default_visualization)

    click_link issue.title

    within ".cpy-issue-detail" do
      accept_confirm do
        click_link "Archive"
      end
    end
  end

  specify 'I can archive an issue' do
    archive_issue(issue)

    expect(page).to have_content("Issue was successfully archived.")

    issue.reload

    expect(issue).to be_archived

    within ".cpy-issue-detail" do
      expect(page).not_to have_link("Archive")
      expect(page).to have_link("Unarchive")
    end
  end

  specify "I can remove an issue immediately after archiving it" do
    archive_issue(issue)

    expect(page).to have_content("Issue was successfully archived.")

    within ".cpy-issue-detail" do
      accept_confirm do
        click_link "Remove"
      end
    end

    expect(page).to_not have_css(".cpy-issue-detail")
    expect(page).to have_content("Issue was successfully removed.")

    expect(Issue.exists?(issue.id)).to be_falsey
  end
end
