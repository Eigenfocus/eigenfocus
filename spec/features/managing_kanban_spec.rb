require 'rails_helper'

describe 'As a user, I want to manage my project kanban visualization' do
  let!(:user) { FactoryBot.create(:user) }

  specify 'When I have a recent created project, I can access its default visualization page' do
    project = FactoryBot.create(:project)

    visit projects_path

    within dom_id(project) do
      expect(page).to have_content("Go to Board")

      click_link("Go to Board")
    end

    expect(page).to have_content("Board")
  end
end
