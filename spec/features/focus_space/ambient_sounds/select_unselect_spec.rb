require 'rails_helper'

describe 'Focus Space - Ambient Sounds' do
  before(:each) do
    visit root_path

    open_focus_space
  end

  specify "I can play ambient sounds" do
    find(".ambient-sounds-list .sound", text: "Rain").click
    find(".ambient-sounds-list .sound", text: "Walk").click

    within(".control-bar .cpy-play-stop") do
      expect(page).to have_content("Stop")
    end

    within find(".ambient-sounds-list .sound", text: "Rain") do
      expect(page).to have_css(".wave-wrapper")
    end

    within find(".ambient-sounds-list .sound", text: "Walk") do
      expect(page).to have_css(".wave-wrapper")
    end
  end
end
