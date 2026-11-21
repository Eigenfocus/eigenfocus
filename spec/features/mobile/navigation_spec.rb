require 'rails_helper'

describe "Mobile navigation", :mobile do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project, name: "Mobile project") }
  let!(:issue) { FactoryBot.create(:issue, project:, title: "Phone issue") }

  specify "I can navigate with the drawer" do
    visit projects_path

    find('label[for="mobile-nav-drawer"]', match: :first).click
    within(".drawer-side") { click_link "Timesheet" }

    expect(page).to have_current_path(time_entries_path)
  end

  specify "I can archive an issue from the issue actions sheet" do
    visit project_issues_path(project)

    within dom_id(issue) do
      find(".cpy-edit-button").click
    end

    within ".cpy-issue-detail" do
      find('[aria-label="Issue actions"]').click
      accept_confirm do
        click_link "Archive"
      end
    end

    expect(page).to have_content("Issue was successfully archived.")
    expect(issue.reload).to be_archived
  end

  specify "I can close the issue detail" do
    visit project_issues_path(project)

    within dom_id(issue) do
      find(".cpy-edit-button").click
    end
    expect(page).to have_css(".cpy-issue-detail")

    find(".cpy-close-modal").click

    expect(page).to have_no_css(".cpy-issue-detail")
  end

  specify "the project more actions sheet fits the phone" do
    visit visualization_path(project.default_visualization)

    find('.cpy-project-navigation [aria-label="More actions"]').click

    within(".cpy-project-navigation dialog") do
      expect(page).to have_link("Track time")
    end
  end
end
