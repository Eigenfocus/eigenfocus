require 'rails_helper'

describe 'As a user answering surveys' do
  specify "I can update my answers" do
    create(:user)

    app_metadata = AppMetadata.instance
    app_metadata.update!(onboarding_survey_response: {
      team_size: "1",
      utilization_context: "old_context"
    })

    visit edit_profile_path

    within "#survey_form" do
      choose "Up to 10 people"

      choose "Work: Software Development"

      check "For Project Management"

      choose "Search Engine"
      fill_in "how_did_you_found_us_details", with: "Google"

      click_button "Submit answer"
    end

    expect(page).to have_content("Thank you! Your answers have been submitted.")

    app_metadata = AppMetadata.instance

    expect(app_metadata.onboarding_survey_response).to include(
      "team_size" => "1-to-10",
      "utilization_context" => "work_software_development",
      "features_used" => include("project_management"),
      "how_did_you_found_us" => "search_engine",
      "how_did_you_found_us_details" => "Google"
    )

    expect(SubmitSurveyResponseJob).to have_been_enqueued
  end

  specify "I can fill out the onboarding survey even if my profile is not complete" do
    visit edit_profile_path

    within "#survey_form" do
      choose "Up to 10 people"

      choose "Work: Software Development"

      check "For Time Tracking"
      check "For Project Management"

      choose "Search Engine"
      fill_in "how_did_you_found_us_details", with: "Google"

      click_button "Submit answer"
    end

    expect(page).to have_content("Thank you! Your answers have been submitted.")

    app_metadata = AppMetadata.instance

    expect(app_metadata.onboarding_survey_response).to include(
      "team_size" => "1-to-10",
      "utilization_context" => "work_software_development",
      "features_used" => include("time_tracking", "project_management"),
      "how_did_you_found_us" => "search_engine",
      "how_did_you_found_us_details" => "Google"
    )

    expect(SubmitSurveyResponseJob).to have_been_enqueued
  end
end
