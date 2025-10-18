require 'rails_helper'

describe 'Using the Focus Space' do
  specify "I can open and close the Focus Space" do
    visit root_path

    open_focus_space

    expect(page).to have_css(".focus-app.space-showing")

    close_focus_space

    expect(page).to_not have_css(".focus-app.space-showing")
  end
end
