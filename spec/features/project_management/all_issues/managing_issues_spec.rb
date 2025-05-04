require 'rails_helper'

describe 'As a project manager, I want to manage my issues from all issues' do
  let!(:user) { FactoryBot.create(:user) }

  specify "I can see a no issues feedback message when there are no issues" do
    project = FactoryBot.create(:project, name: "Project Alpha")

    visit project_issues_path(project)

    expect(page).to have_content("Project Alpha")

    expect(page).to have_content("You haven't created any Issue yet")
  end

  specify "I can see all project issues" do
    project = FactoryBot.create(:project, name: "Project Alpha")

    FactoryBot.create(:issue, project: project, title: "First issue")
    FactoryBot.create(:issue, project: project, title: "Second issue")
    issue = FactoryBot.create(:issue, project: project, title: "Third issue") do |issue|
      grouping = FactoryBot.create(:grouping, title: "Custom grouping")
      FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)
    end

    visit project_issues_path(project)

    expect(page).to have_content("Project Alpha")

    expect(page).to have_content("First issue")
    expect(page).to have_content("Second issue")
    expect(page).to have_content("Third issue")

    within dom_id(issue) do
      expect(page).to have_content("Custom grouping")
    end
  end

  specify "There is a custom message for zero results when filtering" do
    project = FactoryBot.create(:project, name: "Project Alpha")

    visit project_issues_path(project)

    within ".cpy-filter-form" do
      fill_in 'q[title_cont]', with: "NOMATCH"

      click_button "Search"
    end

    expect(page).to have_content("No records were found for your search.")
  end

  specify "I can filter issues by name" do
    project = FactoryBot.create(:project)

    FactoryBot.create(:issue, project: project, title: "First issue")
    FactoryBot.create(:issue, project: project, title: "Second issue")
    FactoryBot.create(:issue, project: project, title: "Third issue")

    visit project_issues_path(project)

    expect(page).to have_content("First issue")
    expect(page).to have_content("Second issue")
    expect(page).to have_content("Third issue")

    within ".cpy-filter-form" do
      fill_in 'q[title_cont]', with: "First"

      click_button "Search"
    end

    expect(page).to have_content("First issue")
    expect(page).not_to have_content("Second issue")
    expect(page).not_to have_content("Third issue")
  end

  specify "I can filter issues by labels" do
    project = FactoryBot.create(:project)

    FactoryBot.create(:issue, project: project, title: "First issue", with_labels: [ "red", "green" ])
    FactoryBot.create(:issue, project: project, title: "Second issue", with_labels: [ "blue", "green" ])
    FactoryBot.create(:issue, project: project, title: "Third issue", with_labels: [ "red", "blue" ])

    visit project_issues_path(project)

    expect(page).to have_content("First issue")
    expect(page).to have_content("Second issue")
    expect(page).to have_content("Third issue")

    select_from_select2 selector: '.cpy-by-labels-titles .select2', option_text: 'red'
    click_button "Search"

    expect(page).to have_content("First issue")
    expect(page).to have_content("Third issue")

    expect(page).not_to have_content("Second issue")

    select_from_select2 selector: '.cpy-by-labels-titles .select2', option_text: 'green'
    click_button "Search"

    expect(page).to have_content("First issue")

    expect(page).not_to have_content("Second issue")
    expect(page).not_to have_content("Third issue")
  end

  specify "I can add a new issue" do
    project = FactoryBot.create(:project)
    project.issue_labels.create(title: "Development")
    project.issue_labels.create(title: "Testing")
    project.issue_labels.create(title: "Bug")

    visit project_issues_path(project)

    click_link "Create issue"

    within '#new_issue_form' do
      fill_in 'issue_title', with: "My issue"
      write_in_md_editor_field("My description")
    end

    select_from_select2(selector: '.cpy-by-labels-titles .select2', option_text: "Development")

    click_button 'Create'

    within 'table' do
      expect(page).to have_content("My issue")
    end

    expect(Issue.last.title).to eq("My issue")
    expect(Issue.last.labels_list).to eq([ "Development" ])
    expect(Issue.last.description).to include("My description")
  end

  specify "I can update issues" do
    project = FactoryBot.create(:project)

    issue = FactoryBot.create(:issue, title: "Issue testing title", project: project)

    visit project_issues_path(project)

    within dom_id(issue) do
      expect(page).to have_content("Issue testing title")

      find(".cpy-edit-button").click
    end

    within '#issue_detail' do
      fill_in :issue_title, with: "Updated title"
    end

    click_button "Save"

    expect(page).to have_content("Issue was successfully updated.")

    issue = Issue.last
    expect(issue.title).to eq("Updated title")

    within dom_id(issue) do
      expect(page).to have_content("Updated title")
    end
  end

  specify "I can start time tracking for an issue" do
    project = FactoryBot.create(:project)

    issue = FactoryBot.create(:issue, title: "Issue testing title", project: project)

    visit project_issues_path(project)

    within dom_id(issue) do
      find(".cpy-edit-button").click
    end

    within ".cpy-issue-detail" do
      click_link "Track time"
    end

    expect(page).to have_content("Create Time entry")

    expect(page).to have_current_path(time_entries_path(new_entry: { project_id: project.id, issue_id: issue.id }))
  end
end
