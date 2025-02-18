
describe 'As a user, I want to manage my kanban view columns' do
  let!(:user) { FactoryBot.create(:user) }

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

  specify 'I can destroy groupings on the Kanban visualization page, with all issues going to the "No column" state' do
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
    expect(Issue.count).to eq(3)
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
end
