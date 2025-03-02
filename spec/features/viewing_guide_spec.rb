require 'rails_helper'

describe 'While accessing my workspace' do
  specify "I should be able to open the features guide" do
    visit root_path

    find(".cpy-open-guide").click

    expect(page).to have_content("Thanks for using Eigenfocus!")
  end
end
