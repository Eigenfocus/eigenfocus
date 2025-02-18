require 'rails_helper'

describe 'As a project manager, I want to filter my issues from kanban boards' do
  let!(:user) { FactoryBot.create(:user) }

  let!(:project) { FactoryBot.create(:project) }
  let!(:grouping_todo) { FactoryBot.create(:grouping, visualization: project.default_visualization, title: "TODO") }
  let!(:grouping_doing) { FactoryBot.create(:grouping, visualization: project.default_visualization, title: "DOING") }
  let!(:grouping_done) { FactoryBot.create(:grouping, visualization: project.default_visualization, title: "DONE") }
  let!(:issue_setup) { FactoryBot.create(:issue, title: "Setup", project: project) }

  let!(:issue_development1) { FactoryBot.create(:issue, title: "Bigtask 1", project: project) }
  let!(:issue_development2) { FactoryBot.create(:issue, title: "Bigtask 2", project: project) }
  let!(:issue_development3) { FactoryBot.create(:issue, title: "Bigtask 3", project: project) }
  let!(:issue_deploy) { FactoryBot.create(:issue, title: "Deploy", project: project) }

  let!(:label_development) { project.issue_labels.create!(title: 'DeveloPment') }
  let!(:label_urgent) { project.issue_labels.create!(title: 'URgent') }

  before(:each) do
    issue_setup.labels << label_urgent

    issue_development1.labels << label_development
    issue_development2.labels << label_development
    issue_development3.labels << label_development

    issue_deploy.labels << label_urgent

    grouping_todo.issues << issue_deploy
    grouping_todo.issues << issue_development1
    grouping_todo.issues << issue_development2

    grouping_doing.issues << issue_development3

    grouping_done.issues << issue_deploy
  end

  specify "I can filter by issue title" do
    visit visualization_path(project.default_visualization)

    find(".cpy-issues-search").send_keys 'Bigtask'

    within '.cpy-columns-wrapper' do
      expect(page).to_not have_content("Setup")
      expect(page).to_not have_content("Deploy")

      expect(page).to have_content("Bigtask 1")
      expect(page).to have_content("Bigtask 2")
      expect(page).to have_content("Bigtask 3")
    end
  end


  specify "I can filter by issue labels" do
    visit visualization_path(project.default_visualization)

    find(".cpy-issues-search").send_keys 'urgent'

    within '.cpy-columns-wrapper' do
      expect(page).to_not have_content("Setup")
      expect(page).to_not have_content("Bigtask 1")
      expect(page).to_not have_content("Bigtask 2")
      expect(page).to_not have_content("Bigtask 3")

      expect(page).to have_content("Deploy")
    end
  end
end
