require 'rails_helper'

describe 'As a project manager, I want to list my issues' do
  let!(:user) { FactoryBot.create(:user) }

  specify "It lists active issues by default" do
    project = FactoryBot.create(:project)

    FactoryBot.create(:issue, project: project, title: "Implement new feature")
    FactoryBot.create(:issue, :archived, project: project, title: "Archived issue")

    visit project_issues_path(project)

    expect(page).to have_content("Implement new feature")
    expect(page).not_to have_content("Archived issue")
  end

  specify "I can filter issues by archiving status" do
    project = FactoryBot.create(:project)

    FactoryBot.create(:issue, project: project, title: "Implement new feature")
    FactoryBot.create(:issue, project: project, title: "Debug code")
    FactoryBot.create(:issue, :archived, project: project, title: "Archived issue")

    visit project_issues_path(project)

    within ".cpy-filter-form" do
      select "List only archived issues", from: "q[by_archiving_status]"

      click_button "Search"
    end

    expect(page).to have_content("Archived issue")
    expect(page).not_to have_content("Implement new feature")
    expect(page).not_to have_content("Debug code")

    within ".cpy-filter-form" do
      select "List only active issues", from: "q[by_archiving_status]"

      click_button "Search"
    end

    expect(page).to have_content("Implement new feature")
    expect(page).to have_content("Debug code")
    expect(page).not_to have_content("Archived issue")


    within ".cpy-filter-form" do
      select "List all issues", from: "q[by_archiving_status]"

      click_button "Search"
    end

    expect(page).to have_content("Implement new feature")
    expect(page).to have_content("Debug code")
    expect(page).to have_content("Archived issue")
  end
end
