require 'rails_helper'

describe 'As a user, I want to collapse and expand columns on my kanban board' do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }
  let!(:visualization) { project.default_visualization }
  let!(:grouping_todo) { FactoryBot.create(:grouping, visualization: visualization, title: "TODO") }
  let!(:grouping_doing) { FactoryBot.create(:grouping, visualization: visualization, title: "DOING") }
  let!(:grouping_done) { FactoryBot.create(:grouping, visualization: visualization, title: "DONE") }
  let!(:issue) { FactoryBot.create(:issue, title: "Test issue", project: project) }

  before(:each) do
    FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping_todo)
  end

  specify 'I can collapse a column' do
    visit visualization_path(visualization)

    within dom_id(grouping_todo) do
      expect(page).to have_content("Test issue")

      find('.fa-down-left-and-up-right-to-center').click
    end

    within "#{dom_id(grouping_todo)}.collapsed" do
      expect(page).to_not have_content("Test issue")
      expect(page).to have_css('.fa-arrows-left-right-to-line')
    end

    expect(grouping_todo.reload.hidden).to be true
  end

  specify 'I can expand a previously collapsed column' do
    grouping_todo.update!(hidden: true)

    visit visualization_path(visualization)

    within "#{dom_id(grouping_todo)}.collapsed" do
      expect(page).to_not have_content("Test issue")

      find('.fa-arrows-left-right-to-line').click
    end

    within dom_id(grouping_todo) do
      expect(page).to have_content("Test issue")
      expect(page).to have_css('.fa-down-left-and-up-right-to-center')
    end

    expect(grouping_todo.reload.hidden).to be false
  end

  specify 'Multiple columns can be collapsed independently' do
    grouping_todo.update!(hidden: true)
    grouping_done.update!(hidden: true)

    visit visualization_path(visualization)

    expect(page).to have_selector("#{dom_id(grouping_todo)}.collapsed")

    expect(page).to_not have_selector("#{dom_id(grouping_doing)}.collapsed")

    expect(page).to have_selector("#{dom_id(grouping_done)}.collapsed")
  end
end
