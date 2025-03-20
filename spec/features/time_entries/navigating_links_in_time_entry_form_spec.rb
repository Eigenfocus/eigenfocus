require 'rails_helper'

describe 'As a user, I want to see appropriate links in the time entry form' do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }
  let!(:issue) { FactoryBot.create(:issue, project: project, title: "Issue 1") }
  let!(:issue2) { FactoryBot.create(:issue, project: project, title: "Issue 2") }

  specify "I see project link when no issue is selected" do
    visit time_entries_path(new_entry: { project_id: project.id })

    within '#time_entry_form' do
      expect(page).not_to have_link("Go to issue", exact: true)
      click_link("Go to issues list")
      expect(page).to have_current_path(project_issues_path(project))
    end
  end

  specify "I see issue link when an issue is selected" do
    visit time_entries_path(new_entry: { project_id: project.id, issue_id: issue.id })

    within '#time_entry_form' do
      expect(page).not_to have_link("Go to issues list", exact: true)
      click_link("Go to issue")
      expect(page).to have_current_path(project_show_issue_path(project, issue.id))
    end
  end

  specify "Links are updated when I select an issue" do
    visit time_entries_path(new_entry: { project_id: project.id })

    within '#time_entry_form' do
      expect(page).to have_link("Go to issues list", exact: true)
      expect(page).not_to have_link("Go to issue", exact: true)
    end

    select_from_select2(selector: '#project_dependent_fields .select2', option_text: issue.title)

    within '#time_entry_form' do
      expect(page).not_to have_link("Go to issues list", exact: true)
      expect(page).to have_link("Go to issue", href: project_show_issue_path(project, issue.id), exact: true)
    end
  end
end
