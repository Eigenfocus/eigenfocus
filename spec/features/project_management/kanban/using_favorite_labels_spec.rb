require 'rails_helper'

describe 'As a project manager, I want to use favorite issue labels' do
  let!(:user) { FactoryBot.create(:user) }

  let!(:project) { FactoryBot.create(:project) }
  let(:visualization) { project.default_visualization }
  let!(:grouping) { FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO") }
  let!(:issue) { FactoryBot.create(:issue, title: "Issue testing title", description: "Issue description", project: project) }

  let!(:label_development) { project.issue_labels.create!(title: 'Development') }
  let!(:label_marketing) { project.issue_labels.create!(title: 'Marketing') }
  let!(:label_urgent) { project.issue_labels.create!(title: 'Urgent') }

  specify "I can add a favorite tag" do
    visit visualization_path(project.default_visualization)

    find(".cpy-keyboard-shortcuts button").click

    all(".cpy-keyboard-shortcuts form input")[2].set "Development"
    all(".cpy-keyboard-shortcuts form input")[3].set "New Tag"

    all(".cpy-keyboard-shortcuts form button")[0].click

    visualization.reload
    expect(visualization.favorite_issue_labels).to eq([ "", "", 'Development', 'New Tag', "", "" ])
  end

  specify "It shows existing tags" do
    visualization.favorite_issue_labels = [ "Development", "Urgent", nil, "Another" ]
    visualization.save!

    visit visualization_path(project.default_visualization)

    find(".cpy-keyboard-shortcuts button").click

    input_values = all(".cpy-keyboard-shortcuts form input").map { _1.value }
    expect(input_values[0]).to eq("Development")
    expect(input_values[1]).to eq("Urgent")
    expect(input_values[2]).to eq("")
    expect(input_values[3]).to eq("Another")
    expect(input_values[4]).to eq("")
    expect(input_values[5]).to eq("")
  end
end
