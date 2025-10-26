require 'rails_helper'

describe 'Focus Space - Pomodoro Timer Settings' do
  before(:each) do
    visit root_path

    open_focus_space

    find(".timer-presets .cpy-settings").click
  end

  specify "I can change settings for a timer" do
    within(".cpy-timer-modal") do
      all("input[type=text]")[1].set("Custom timer name")
      all("input[type=number]")[1].set("8")
      click_button "Save"
    end

    within(".timer-presets") do
      click_button "Custom timer name"
    end

    within(".timer-display") do
      expect(page).to have_content("08:00")
    end
  end


  specify "I can change settings for the sound" do
    within(".cpy-timer-modal") do
      select "Magic", from: "alarm_key"
      click_button "Save"
    end

    find(".timer-presets .cpy-settings").click

    within(".cpy-timer-modal") do
      expect(page).to have_select("alarm_key", selected: "Magic")
    end
  end
end
