require 'rails_helper'

describe 'As a user, I can follow the tours' do
  let!(:user) { FactoryBot.create(:user) }

  before(:each) do
    ExampleProjectCreator.(user)
  end

  def should_have_tour_popover(title, description = nil)
    within ".driver-popover" do
      expect(page).to have_content(title)
      expect(page).to have_content(description) if description
    end
  end

  def next_tour_step
    find(".driver-popover-next-btn").click
  end

  def start_tour(tour)
    visit root_path
    find(".cpy-header-tour-button").click
    find(".cpy-header-tour-dropdown a", text: tour).click
  end

  specify "I can list the available tours" do
    visit root_path

    find(".cpy-header-tour-button").click

    expect(page).to have_content("Guided Tours")
    expect(page).to have_content("Managing projects")
    expect(page).to have_content("Managing issues")
    expect(page).to have_content("Using boards")
    expect(page).to have_content("Tracking time")
  end

  specify "I can start a project tour" do
    visit root_path

    start_tour "Managing projects"

    should_have_tour_popover("Guided Tour", "Quick tip:")
    next_tour_step
    should_have_tour_popover("Focus Space")
  end

  specify "I can start the issues list tour" do
    visit root_path

    start_tour "Managing issues"

    should_have_tour_popover("Create New Issue")
    next_tour_step
    should_have_tour_popover("Issues List")
  end

  specify "I can start the workflow board tour" do
    visit root_path

    start_tour "Using boards"

    should_have_tour_popover("Workflow Board")
    next_tour_step
    should_have_tour_popover("Board Column")
  end

  specify "I can start the tracking time tour" do
    visit root_path

    start_tour "Tracking time"

    should_have_tour_popover("Create Time Entry")
    next_tour_step
    should_have_tour_popover("Date Navigation")
  end
end
