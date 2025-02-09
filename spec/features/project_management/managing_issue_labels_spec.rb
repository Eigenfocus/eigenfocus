require 'rails_helper'

describe 'As a project manager, I want to manage my issue labels' do
  let!(:user) { FactoryBot.create(:user) }

  let!(:project) { FactoryBot.create(:project) }

  let!(:issue) { FactoryBot.create(:issue, title: "A dev task", description: "Issue description", project: project) }

  let!(:label_development) { project.issue_labels.create!(title: 'Development') }
  let!(:label_marketing) { project.issue_labels.create!(title: 'Marketing') }
  let!(:label_urgent) { project.issue_labels.create!(title: 'Urgent') }

  let!(:other_project) { FactoryBot.create :project, with_issue_labels: [ 'other-project-label' ] }

  specify "I can list all labels" do
    visit project_issues_path(project)

    within '.cpy-project-navigation' do
      click_link 'Manage issue labels'
    end

    within 'table' do
      expect(page).to have_content("Development")
      expect(page).to have_content("Marketing")
      expect(page).to have_content("Urgent")
      expect(page).to_not have_content("other-project-label")
    end
  end

  specify 'If there are no labels, I should see a message to create one' do
    project.issue_labels.destroy_all

    visit project_issue_labels_path(project)

    expect(page).to have_content("You haven't created any Issue Label yet.")
  end

  specify 'I can filter label by title' do
    visit project_issue_labels_path(project)

    within '#issue_label_search' do
      fill_in :q_title_cont, with: 'gen'
      click_button 'Search'
    end


    within 'table' do
      expect(page).to_not have_content("Development")
      expect(page).to_not have_content("Marketing")

      expect(page).to have_content("Urgent")
    end
  end

  specify "I can add a label" do
    visit project_issue_labels_path(project)

    click_link 'Create issue label'

    fill_in :issue_label_title, with: "type:test"

    click_button "Create"

    within 'table' do
      expect(page).to have_content("type:test")
    end

    expect(IssueLabel.last.title).to eq('type:test')
  end

  specify "I can edit a label" do
    visit project_issue_labels_path(project)

    within dom_id(label_development) do
      click_link "Edit"
    end

    fill_in :issue_label_title, with: "type:development"
    click_button "Update"

    within 'table' do
      expect(page).to have_content("type:development")
    end

    label_development.reload
    expect(label_development.title).to eq('type:development')
  end

  specify "I can remove a label" do
    label_development.issues << issue
    label_development.reload
    expect(label_development.issues.first).to eq(issue)

    visit project_issue_labels_path(project)

    within dom_id(label_development) do
      click_link "Remove"
    end

    within '#issue_label_removal_confirmation' do
      expect(page).to have_content('This label is associated with 1 Issue Label')

      accept_confirm do
        click_link("Remove")
      end
    end

    expect(page).to have_content("Issue Label was successfully destroyed.")

    within 'table' do
      expect(page).to_not have_content("Development")
    end

    expect(issue.labels.count).to be(0)
  end
end
