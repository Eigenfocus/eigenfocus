require 'rails_helper'

describe 'As a user, I want to manage my project kanban visualization' do
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

    within ".cpy-header-wrapper" do
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

  specify 'I can create issues inside a grouping' do
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

    fill_in :issue_title, with: "Make this test pass"
    fill_in :issue_description, with: "This is important to be happy"

    click_button "Create"

    expect(page).to have_content("Issue was successfully created.")

    issue = Issue.last
    expect(issue.title).to eq("Make this test pass")
    expect(issue.description).to eq("This is important to be happy")

    within dom_id(grouping) do
      expect(page).to have_content("Make this test pass")
    end
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

    expect(page).to have_content("Issue testing title")
    expect(page).to have_content("Issue description")
  end
end
