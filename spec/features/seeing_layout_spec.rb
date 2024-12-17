require 'rails_helper'

describe 'As a visitor' do
  specify "I can see the layout" do
    visit '/'

    expect(page).to have_content('Modal content')
    expect(page).to have_content('Testing flash message')
  end
end
