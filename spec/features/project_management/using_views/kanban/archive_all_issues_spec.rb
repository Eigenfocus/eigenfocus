require 'rails_helper'

describe 'Groupings - Archive all issues' do
  let!(:user) { FactoryBot.create(:user) }

  specify 'I can archive all issues from one column' do
    project = FactoryBot.create(:project)
    grouping = FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO")

    3.times do |n|
      issue = FactoryBot.create(:issue, project: project, title: "Issue #{n}")
      FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)
    end

    visit visualization_path(project.default_visualization)

    within dom_id(grouping) do
      project.issues.each do |issue|
        expect(page).to have_content(issue.title)
      end

      find('.cpy-column-menu-button').click
      accept_confirm do
        click_link "Archive all issues"
      end
    end

    expect(page).to have_content("All issues were successfully archived")

    expect(project.issues.count).to eq(3)

    within dom_id(grouping) do
      project.issues.each do |issue|
        expect(page).not_to have_content(issue.title)
      end
    end

    grouping.reload
    expect(grouping.issues.count).to eq(3)
    expect(grouping.issues.all(&:archived?)).to be_truthy
  end
end
