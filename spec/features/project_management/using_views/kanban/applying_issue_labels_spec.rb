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

  def open_labels_dropdown
    within ".cpy-issue-labels" do
      click_button "Add label"
    end
  end

  def apply_label(label)
    open_labels_dropdown

    within ".cpy-issue-labels" do
      click_button label
    end
  end

  specify "I can see applied labels" do
    issue.labels << label_marketing

    visit show_visualization_issue_path(project.default_visualization, issue)

    within ".cpy-issue-labels" do
      expect(page).to have_content("Marketing")
    end
  end

  specify "I can add an existing label" do
    issue.labels << label_marketing

    visit show_visualization_issue_path(project.default_visualization, issue)

    apply_label 'Development'

    within ".cpy-issue-labels" do
      expect(page).to have_content("Marketing")
      expect(page).to have_content("Development")
    end

    issue.reload
    expect(issue.labels).to eq([ label_development, label_marketing ])
  end

  specify "I can add a new label" do
    issue.labels << label_marketing

    visit show_visualization_issue_path(project.default_visualization, issue)

    open_labels_dropdown

    within ".cpy-issue-labels" do
      click_button "Create label"
      find(".cpy-label-title").set "nice-to-have"
      click_button "Create"
    end

    within ".cpy-issue-labels" do
      expect(page).to have_content("Marketing")
      expect(page).to have_content("nice-to-have")
    end

    issue.reload
    expect(issue.labels.last.title).to eq('nice-to-have')
  end

  specify "I can remove a label" do
    issue.labels << label_marketing
    issue.labels << label_development

    visit show_visualization_issue_path(project.default_visualization, issue)

    find(".cpy-label-badge", text: "Development").find(".cpy-label-remove").click

    within ".cpy-issue-labels" do
      expect(page).to have_content("Marketing")
      expect(page).to_not have_content("Development")
    end

    issue.reload
    expect(issue.labels).to eq([ label_marketing ])
  end

  specify "I can search for labels" do
    visit show_visualization_issue_path(project.default_visualization, issue)

    open_labels_dropdown

    within ".cpy-labels-dropdown" do
      find(".cpy-label-search").set "Marketing"
    end

    within ".cpy-labels-dropdown " do
      expect(page).to have_content("Marketing")
      expect(page).to_not have_content("Development")
      expect(page).to_not have_content("Urgent")
      click_button "Marketing"
      expect(page).to_not have_content("Marketing")
    end
  end
end
