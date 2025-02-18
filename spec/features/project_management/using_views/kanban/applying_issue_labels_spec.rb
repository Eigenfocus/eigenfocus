require 'rails_helper'

describe 'As a project manager, I want to quickly use issue labels from kanban boards' do
  let!(:user) { FactoryBot.create(:user) }

  let!(:project) { FactoryBot.create(:project) }
  let!(:grouping) { FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO") }
  let!(:issue) { FactoryBot.create(:issue, title: "Issue testing title", description: "Issue description", project: project) }

  let!(:label_development) { project.issue_labels.create!(title: 'Development') }
  let!(:label_marketing) { project.issue_labels.create!(title: 'Marketing') }
  let!(:label_urgent) { project.issue_labels.create!(title: 'Urgent') }

  before(:each) do
    FactoryBot.create(:grouping_issue_allocation, issue: issue, grouping: grouping)
  end

  specify "I can see applied tags" do
    issue.labels << label_marketing

    visit show_visualization_issue_path(project.default_visualization, issue)


    within ".cpy-issue-labels .select2-selection__rendered" do
      expect(page).to have_content("Marketing")
    end
  end

  specify "I can add an existing tag" do
    issue.labels << label_marketing

    visit show_visualization_issue_path(project.default_visualization, issue)

    select_from_select2 selector: '.cpy-issue-labels .select2', option_text: 'Development'

    within ".cpy-issue-labels .select2-selection__rendered" do
      expect(page).to have_content("Marketing")
      expect(page).to have_content("Development")
    end

    issue.reload
    expect(issue.labels).to eq([ label_development, label_marketing ])
  end

  specify "I can add a new tag" do
    issue.labels << label_marketing

    visit show_visualization_issue_path(project.default_visualization, issue)

    add_to_select2 selector: '.cpy-issue-labels .select2', option_text: 'nice-to-have'

    within ".cpy-issue-labels .select2-selection__rendered" do
      expect(page).to have_content("Marketing")
      expect(page).to have_content("nice-to-have")
    end

    issue.reload
    expect(issue.labels.last.title).to eq('nice-to-have')
  end

  specify "I can remove a tag" do
    issue.labels << label_marketing
    issue.labels << label_development

    visit show_visualization_issue_path(project.default_visualization, issue)

    within ".cpy-issue-labels .select2-selection__rendered" do
      find(".select2-selection__choice[title='Development'] .select2-selection__choice__remove").click
      expect(page).to have_content("Marketing")
      expect(page).to_not have_content("Development")
    end

    issue.reload
    expect(issue.labels).to eq([ label_marketing ])
  end
end
