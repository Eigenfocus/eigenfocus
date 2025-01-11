require 'rails_helper'

describe 'As a user, I want to manage my project kanban visualization' do
  def write_in_md_editor_field(text)
    within ".CodeMirror" do
      # Click makes CodeMirror element active:
      current_scope.click

      # Find the hidden textarea:
      field = current_scope.find("textarea", visible: false)

      # Mimic user typing the text:
      field.send_keys text
    end
  end

  def markdown_editor_selector
    ".CodeMirror-code"
  end

  let!(:user) { FactoryBot.create(:user) }

  specify 'When I have a recent created project, I can access its default visualization page' do
    project = FactoryBot.create(:project)

    visit projects_path

    within dom_id(project) do
      expect(page).to have_content("Go to Board")

      click_link "Go to Board"
    end

    expect(page).to have_content("Board")
  end

  specify 'I can create groupings on the kanban visualization page' do
    project = FactoryBot.create(:project)

    visit visualization_path(project.default_visualization)

    within ".cpy-columns-wrapper" do
      click_link "Create column"
    end

    fill_in :grouping_title, with: "TODO"
    click_button "Create"

    expect(page).to have_content("Column was successfully created.")

    grouping = Grouping.last
    expect(grouping.title).to eq("TODO")

    within dom_id(grouping) do
      expect(page).to have_content("TODO")
    end
  end

  specify 'I can update groupings on the kanban visualization page' do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, title: "CHANGEME")

    visit visualization_path(project.default_visualization)

    within dom_id(grouping) do
      click_link "CHANGEME"
    end

    fill_in :grouping_title, with: "TODO"
    click_button "Update"

    expect(page).to have_content("Column was successfully updated.")

    grouping.reload
    expect(grouping.title).to eq("TODO")

    within dom_id(grouping) do
      expect(page).to have_content("TODO")
    end
  end

  specify 'I can destroy groupings on the Kanban visualization page, with all dependents destroyed too' do
    project = FactoryBot.create(:project)
    FactoryBot.create(:grouping, visualization: project.default_visualization)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization)
    FactoryBot.create(:grouping, visualization: project.default_visualization)

    3.times do
      issue = FactoryBot.create(:issue, project: grouping.visualization.project)
      FactoryBot.create(:grouping_issue_allocation, grouping: grouping, issue: issue)
    end

    visit visualization_path(project.default_visualization)

    within dom_id(grouping) do
      find('.cpy-column-menu-button').click

      expect(page).to have_content("Actions")

      accept_confirm do
        click_link "Delete column"
      end
    end

    expect(page).to have_content("Column was successfully destroyed.")

    expect(Grouping.where(id: grouping.id)).not_to be_present

    expect(Grouping.count).to eq(2)
    expect(GroupingIssueAllocation.count).to eq(0)
    expect(Issue.count).to eq(0)
  end

  specify 'I can move groupings on the kanban visualization page' do
    project = FactoryBot.create(:project)
    FactoryBot.create(:grouping, visualization: project.default_visualization, position: 1, title: "TODO")
    FactoryBot.create(:grouping, visualization: project.default_visualization, position: 2, title: "Doing")
    FactoryBot.create(:grouping, visualization: project.default_visualization, position: 3, title: "Done")

    visit visualization_path(project.default_visualization)

    all_columns = all(".cpy-grouping")

    first_column = all_columns[0]
    second_column = all_columns[1]
    third_column = all_columns[2]

    first_column.drag_to(third_column)
    second_column.drag_to(first_column)

    changes_columns = all(".cpy-grouping")

    first_column = changes_columns[0]
    second_column = changes_columns[1]
    third_column = changes_columns[2]

    expect(first_column).to have_content("Done")
    expect(second_column).to have_content("TODO")
    expect(third_column).to have_content("Doing")

    project.reload

    expect(project.default_visualization.groupings.pluck(:title)).to eq([
      "Done",
      "TODO",
      "Doing"
    ])
  end

  specify 'I can create issues using top grouping meno' do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO")

    visit visualization_path(project.default_visualization)

    within dom_id(grouping) do
      find('.cpy-column-menu-button').click

      within '.cpy-column-menu' do
        expect(page).to have_content("Actions")

        click_button "Create issue"
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

    within '#issue_form' do
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

    within '#issue_form' do
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
    second_issue = all_cards[1]
    third_issue = all_cards[2]

    first_issue.drag_to(third_issue)
    second_issue.drag_to(first_issue)

    changes_issues = all(".cpy-card")

    first_issue = changes_issues[0]
    second_issue = changes_issues[1]
    third_issue = changes_issues[2]

    expect(first_issue).to have_content("Issue 2")
    expect(second_issue).to have_content("Issue 0")
    expect(third_issue).to have_content("Issue 1")

    expect(grouping.allocations.map(&:issue).map(&:title)).to eq([
      "Issue 2",
      "Issue 0",
      "Issue 1"
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

    within ".cpy-issue-form" do
      accept_confirm do
        click_link "Remove"
      end
    end

    expect(page).to have_content("Issue was successfully destroyed.")

    expect(Issue.where(id: issue.id)).not_to be_present
  end
end
