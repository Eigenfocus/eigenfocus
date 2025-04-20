require 'rails_helper'

describe "layouts/_sidebar/_projects_menu.html.erb" do
  let!(:project1) { create(:project, name: 'Project 1') }
  let!(:project2) { create(:project, name: 'Project 2') }
  let!(:project3) { create(:project, :archived, name: 'Project 3') }

  it "displays all active projects" do
    render

    expect(rendered).to have_link('Project 1', href: visualization_path(project1.default_visualization))
    expect(rendered).to have_link('Project 2', href: visualization_path(project2.default_visualization))

    expect(rendered).not_to have_text('Project 3')
  end
end
