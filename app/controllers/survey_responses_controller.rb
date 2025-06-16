class SurveyResponsesController < ApplicationController
  skip_before_action :ensure_user_profile_is_complete

  def create
    survey_data = {
      contact_email: params[:contact_email],
      team_size: params[:team_size],
      utilization_context: params[:utilization_context],
      features_used: params[:usage_purposes],
      how_did_you_found_us: params[:how_did_you_found_us],
      how_did_you_found_us_details: params[:how_did_you_found_us_details]
    }

    app_metadata = AppMetadata.instance
    app_metadata.update!(onboarding_survey_response: survey_data)

    SubmitSurveyResponseJob.perform_later
  end
end
