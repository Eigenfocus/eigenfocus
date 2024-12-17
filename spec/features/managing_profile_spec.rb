require 'rails_helper'

describe 'When entering my workspace for the first time' do
  specify "I should be direct to edit a new profile" do
    expect(User.count).to eq(0)

    visit projects_path

    should_be_on edit_profile_path

    expect(page).to have_content("To start using the app, please setup your profile first.")
    expect(User.count).to eq(1)

    within '.edit-profile' do
      select "Rome", from: "profile_timezone"
      select "English", from: "profile_locale"
      click_button 'Update'
    end

    expect(page).to have_content("Profile succesfully updated.")
    should_be_on root_path
  end


  specify "I can update my profile" do
    user = FactoryBot.create(:user, timezone: 'Cairo')

    visit projects_path

    within '.sidebar-bottom' do
      click_link 'Profile'
    end

    within '.edit-profile' do
      select "Rome", from: "profile_timezone"
      click_button 'Update'
    end

    user.reload
    expect(user.timezone).to eq('Rome')
    expect(page).to have_content("Profile succesfully updated.")
  end
end
