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

  specify 'I can move groupings on the kanban visualization page' do
    project = FactoryBot.create(:project)
    first_grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, position: 0, title: "TODO")
    second_grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, position: 1, title: "Doing")
    third_grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, position: 2, title: "Done")

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
end
