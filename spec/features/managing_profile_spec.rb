require 'rails_helper'

describe 'When entering my workspace for the first time' do
  specify "I should be direct to edit a new profile", execute_js_timeouts: true do
    expect(User.count).to eq(0)
    expect(Project.count).to eq(0)

    visit projects_path

    expect(page).to have_current_path(edit_profile_path)

    expect(page).to have_content("Before starting, we need you to fill your preferred language and time zone.")
    expect(User.count).to eq(1)

    expect(page).to_not have_css(".cpy-welcome-screen")
    select_from_select2(label_for: 'profile_timezone', option_text: "Rome (GMT+01:00)")
    within '.edit-profile' do
      select "English", from: "profile_locale"
      click_button 'Update'
    end

    expect(page).to have_content("Profile succesfully updated.")

    expect(page).to have_current_path(projects_path(mark_app_tours_as_pending: true))

    project = Project.first
    expect(project.name).to eq("Eigenfocus - Tour Example Project")

    expect(page).to have_content("Eigenfocus - Tour Example Project")

    within ".driver-popover" do
      expect(page).to have_content("Quick tip:")
    end
  end

  specify "I can update my profile" do
    user = FactoryBot.create(:user, timezone: 'Cairo')

    visit projects_path

    within '.sidebar-bottom' do
      click_link 'Profile'
    end

    select_from_select2(label_for: 'profile_timezone', option_text: "Rome (GMT+01:00)")
    within '.edit-profile' do
      click_button 'Update'
    end

    user.reload
    expect(user.timezone).to eq('Rome')
    expect(page).to have_content("Profile succesfully updated.")

    # Verify no example project is created on subsequent updates
    expect(Project.count).to eq(0)
  end
end
