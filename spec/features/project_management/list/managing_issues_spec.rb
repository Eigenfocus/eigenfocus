require 'rails_helper'

describe 'As a project manager, I want to manage my issues from List Boards' do
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
    FactoryBot.create(:issue, project: project, title: "Third issue")

    visit project_issues_path(project)

    expect(page).to have_content("Project Alpha")

    expect(page).to have_content("First issue")
    expect(page).to have_content("Second issue")
    expect(page).to have_content("Third issue")
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
end
