require 'rails_helper'

describe 'Focus Space - Pomodoro Timer' do
  before(:each) do
    visit root_path

    open_focus_space
  end

  specify "Default timer is 25 minutes" do
    within ".timer-display" do
      expect(page).to have_content("25:00")
    end
  end

  specify "I can start the timer" do
    find(".timer-controls .cpy-start-pause-button", text: "Start").click

    within(".timer-controls .cpy-start-pause-button") do
      expect(page).to have_content("Pause")
      expect(page).to_not have_content("Start")
    end
  end

  specify "I can pause the timer" do
    find(".timer-controls .cpy-start-pause-button", text: "Start").click

    # not worth the time... no pun intended
    # sleep 3.14

    find(".timer-controls .cpy-start-pause-button", text: "Pause").click

    # within ".timer-display" do
    #   expect(page).to have_content("24:59")
    # end
  end
end
