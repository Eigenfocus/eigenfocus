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

  specify "I can filter issues by due date" do
    project = FactoryBot.create(:project)

    FactoryBot.create(:issue, project: project, due_date: Date.new(2025, 1, 1), title: "Due to January")
    FactoryBot.create(:issue, project: project, due_date: Date.new(2025, 2, 1), title: "Due to February")
    FactoryBot.create(:issue, project: project, due_date: Date.new(2025, 3, 1), title: "Due to March")

    visit project_issues_path(project)

    expect(page).to have_content("Due to January")
    expect(page).to have_content("Due to February")
    expect(page).to have_content("Due to March")

    select_from_flatpickr "#q_due_date_gteq", "2025-01-15"

    within ".cpy-filter-form" do
      click_button "Search"
    end

    expect(page).not_to have_content("Due to January")
    expect(page).to have_content("Due to February")
    expect(page).to have_content("Due to March")

    select_from_flatpickr "#q_due_date_lteq", "2025-02-15"

    within ".cpy-filter-form" do
      click_button "Search"
    end

    expect(page).not_to have_content("Due to January")
    expect(page).to have_content("Due to February")
    expect(page).not_to have_content("Due to March")


    within ".cpy-filter-form" do
      find("#q_due_date_gteq + .cpy-flatpickr-clear-button").click

      click_button "Search"
    end

    expect(page).to have_content("Due to January")
    expect(page).to have_content("Due to February")
    expect(page).not_to have_content("Due to March")
  end

  specify "I can filter issues by finished status" do
    project = FactoryBot.create(:project)

    FactoryBot.create(:issue, :unfinished, project:, title: "Implement new feature")
    FactoryBot.create(:issue, :unfinished, project:, title: "Debug code")
    FactoryBot.create(:issue, :finished, project:, title: "Finished issue")

    visit project_issues_path(project)

    within ".cpy-filter-form" do
      select "List only finished issues", from: "q[by_archiving_status]"

      click_button "Search"
    end

    expect(page).to have_content("Finished issue")
    expect(page).not_to have_content("Implement new feature")
    expect(page).not_to have_content("Debug code")

    within ".cpy-filter-form" do
      select "List all issues", from: "q[by_archiving_status]"

      click_button "Search"
    end

    expect(page).to have_content("Implement new feature")
    expect(page).to have_content("Debug code")
    expect(page).to have_content("Finished issue")
  end
end
