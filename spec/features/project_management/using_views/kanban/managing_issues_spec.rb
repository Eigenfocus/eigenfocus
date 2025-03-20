require 'rails_helper'

describe 'As a user, I want to manage my project using a kanban view' do
  let!(:user) { FactoryBot.create(:user) }

  specify 'When I have a recent created project, I can access its default visualization page' do
    project = FactoryBot.create(:project)

    visit projects_path

    within dom_id(project) do
      click_link "Go to workflow board"
    end

    expect(page).to have_content("Board")
  end

  specify 'I can create issues using top grouping menu' do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO")

    visit visualization_path(project.default_visualization)

    within dom_id(grouping) do
      find('.cpy-column-menu-button').click

      within '.cpy-column-menu' do
        expect(page).to have_content("Actions")

        click_link "Create issue"
      end
    end

    within "#grouping-#{grouping.id}-inline-issue-form" do
      fill_in 'issue[title]', with: "Issue 1"
      click_button "Create"
    end

    expect(page).to have_content("Issue was successfully created.")

    issue = Issue.last
    expect(issue.title).to eq("Issue 1")
  end

  specify "I can create issues using the footer button" do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO")

    visit visualization_path(project.default_visualization)

    within dom_id(grouping) do
      find('.cpy-inline-create-button').click
    end

    within "#grouping-#{grouping.id}-inline-issue-form" do
      fill_in 'issue[title]', with: "Issue 1"
      click_button "Create"
    end

    expect(page).to have_content("Issue was successfully created.")


    within "#grouping-#{grouping.id}-inline-issue-form" do
      fill_in 'issue[title]', with: "Issue 2"
      click_button "Create"
    end

    expect(page).to have_content("Issue was successfully created.")

    within dom_id(grouping) do
      expect(page).to have_content("Issue 1")
      expect(page).to have_content("Issue 2")
    end


    expect(Issue.pluck(:title).sort).to eq([ "Issue 1", "Issue 2" ])
  end

  specify 'I can see issues details' do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO")
    issue = FactoryBot.create(:issue, title: "Issue testing title", description: "Issue description", project: project)
    FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)

    visit visualization_path(project.default_visualization)

    within dom_id(grouping) do
      expect(page).to have_content("Issue testing title")

      click_link "Issue testing title"
    end

    within '#issue_detail' do
      expect(page).to have_field(:issue_title, with: "Issue testing title")
      within markdown_editor_selector do
        expect(page).to have_content("Issue description")
      end
    end
  end


  specify 'I can edit an issue detail' do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO")
    issue = FactoryBot.create(:issue, title: "Issue testing title", description: "Issue description", project: project)
    FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)

    visit visualization_path(project.default_visualization)

    within dom_id(grouping) do
      expect(page).to have_content("Issue testing title")

      click_link "Issue testing title"
    end

    within '#issue_detail' do
      fill_in :issue_title, with: "Updated title"
      write_in_md_editor_field(" appending description")
    end

    click_button "Update"

    expect(page).to have_content("Issue was successfully updated.")

    issue = Issue.last
    expect(issue.title).to eq("Updated title")
    expect(issue.description).to eq("Issue description appending description")

    within dom_id(grouping) do
      expect(page).to have_content("Updated title")
    end
  end

  specify "I can update the title via auto saving" do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO")
    issue = FactoryBot.create(:issue, title: "Issue testing title", description: "Issue description", project: project)
    FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)

    visit visualization_path(project.default_visualization)

    within dom_id(grouping) do
      expect(page).to have_content("Issue testing title")

      click_link "Issue testing title"
    end

    within '#issue_detail' do
      fill_in :issue_title, with: "Updated title"
      find('#issue_title').send_keys :enter
    end

    expect(page).to have_content("Issue was successfully updated.")
    # Modal is still open
    expect(page).to have_selector('#issue_detail', visible: true)

    issue = Issue.last
    expect(issue.title).to eq("Updated title")
  end

  specify 'I can move issues within the same grouping' do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO")
    3.times do |n|
      issue = FactoryBot.create(:issue, project: project, title: "Issue #{n}")
      FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)
    end

    visit visualization_path(project.default_visualization)

    all_cards = all(".cpy-card")

    first_issue = all_cards[0]
    third_issue = all_cards[2]

    first_issue.drag_to(third_issue)

    # We need this to make capybara wait for the
    # turbo-stream response to finish
    expect(page).to have_content("Issue 1")

    # now that the turbo stream has finished we
    # can get the cards with the new HTML for the moved on
    all_cards = all(".cpy-card")

    expect(all_cards[0].text).to eq("Issue 1")
    expect(all_cards[1].text).to eq("Issue 2")
    expect(all_cards[2].text).to eq("Issue 0")

    expect(grouping.allocations.map(&:issue).map(&:title)).to eq([
      "Issue 1",
      "Issue 2",
      "Issue 0"
    ])
  end

  specify 'I can move issues between groupings' do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, position: 1, title: "TODO")
    FactoryBot.create(:grouping, visualization: project.default_visualization, position: 2, title: "Doing")
    FactoryBot.create(:grouping, visualization: project.default_visualization, position: 3, title: "Done")
    3.times do |n|
      issue = FactoryBot.create(:issue, project: project, title: "Issue #{n}")
      FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)
    end

    visit visualization_path(project.default_visualization)

    all_columns = all(".cpy-grouping .cpy-drop-zone")

    second_column_drop_zone = all_columns[1]
    third_column_drop_zone = all_columns[2]

    all_cards = all(".cpy-card")

    first_issue = all_cards[0]
    second_issue = all_cards[1]

    first_issue.drag_to(second_column_drop_zone)
    second_issue.drag_to(third_column_drop_zone)

    all_columns = all(".cpy-grouping")

    within all_columns[0] do
      expect(page).to have_content("TODO")
      expect(page).to have_content("Issue 2")
    end

    within all_columns[1] do
      expect(page).to have_content("Doing")
      expect(page).to have_content("Issue 0")
    end

    within all_columns[2] do
      expect(page).to have_content("Done")
      expect(page).to have_content("Issue 1")
    end

    expect(Grouping.count).to eq(3)
    expect(Grouping.all.map(&:allocations).map(&:count)).to eq([ 1, 1, 1 ])
    expect(Grouping.find_by(title: "TODO").allocations.first.issue.title).to eq("Issue 2")
    expect(Grouping.find_by(title: "Doing").allocations.first.issue.title).to eq("Issue 0")
    expect(Grouping.find_by(title: "Done").allocations.first.issue.title).to eq("Issue 1")
  end

  specify 'I can delete issues' do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization)
    issue = FactoryBot.create(:issue, project: project, title: "DELETE ME")
    FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)

    visit visualization_path(project.default_visualization)

    click_link "DELETE ME"

    within ".cpy-issue-detail" do
      accept_confirm do
        click_link "Remove"
      end
    end

    expect(page).to have_content("Issue was successfully removed.")

    expect(Issue.where(id: issue.id)).not_to be_present
  end

  specify 'I can change issue grouping on the issue detail modal' do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, title: "First grouping")
    issue = FactoryBot.create(:issue, project: project, title: "Change grouping")
    FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)

    FactoryBot.create(:grouping, visualization: project.default_visualization, title: "Second grouping")

    visit visualization_path(project.default_visualization)

    click_link "Change grouping"

    find(".cpy-grouping-picker-button").click

    within ".cpy-grouping-picker-container" do
      click_link "Second grouping"
    end

    expect(page).to have_content("Issue column was successfully updated.")

    issue.reload
    expect(issue.grouping_issue_allocations.first.grouping.title).to eq("Second grouping")
  end
end
