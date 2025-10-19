require 'rails_helper'

describe "As a project manager, I want to manage issue archive status" do
  let!(:user) { FactoryBot.create(:user) }

  let!(:project) { FactoryBot.create(:project) }

  let!(:archieved_issue) { FactoryBot.create(:issue, :archived, project: project) }
  let!(:non_archived_issue) { FactoryBot.create(:issue, project: project) }

  specify "I can archive an issue" do
    visit project_issues_path(project)

    within dom_id(non_archived_issue) do
      find(".cpy-edit-button").click
    end

    within '.cpy-issue-detail' do
      accept_confirm do
        click_link('Archive')
      end
    end

    expect(page).to have_content("Issue was successfully archived.")
    within '.cpy-issue-detail' do
      expect(page).to have_content("This issue was archived on")
    end

    non_archived_issue.reload

    expect(non_archived_issue).to be_archived
  end

  specify "I can unarchive an issue" do
    visit project_issues_path(project)

    select "List only archived issues", from: "q[by_archiving_status]"

    within "table #issue_#{archieved_issue.id}" do
      find(".cpy-edit-button").click
    end

    within '.cpy-issue-detail' do
      accept_confirm do
        click_link('Unarchive')
      end
    end

    expect(page).to have_content("Issue was successfully unarchived.")

    archieved_issue.reload

    expect(archieved_issue).not_to be_archived

    within "table #issue_#{archieved_issue.id}" do
      expect(page).to_not have_content("Active")
    end
  end
end

describe "As a project manager, I want to remove an issue" do
  let!(:user) { FactoryBot.create(:user) }

  let!(:project) { FactoryBot.create(:project) }

  let!(:archieved_issue) { FactoryBot.create(:issue, :archived, project: project) }
  let!(:non_archived_issue) { FactoryBot.create(:issue, project: project) }

  specify "I can remove an archived issue" do
    visit project_issues_path(project)

    select "List only archived issues", from: "q[by_archiving_status]"

    within "table #issue_#{archieved_issue.id}" do
      find(".cpy-edit-button").click
    end

    within '.cpy-issue-detail' do
      accept_confirm do
        click_link('Remove')
      end
    end

    wait_for_alert_modal_close

    expect(page).to have_content("Issue was successfully removed.")

    expect(Issue.exists?(archieved_issue.id)).to be_falsey
    within 'table' do
      expect(page).not_to have_content(archieved_issue.title)
    end
  end

  specify "I can't remove an issue that is not archived" do
    visit project_issues_path(project)

    within dom_id(non_archived_issue) do
      find(".cpy-edit-button").click
    end

    within '.cpy-issue-detail' do
      expect(page).not_to have_link('Remove')
    end
  end
end
