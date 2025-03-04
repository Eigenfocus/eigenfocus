class SurveyResponsesController < ApplicationController
  skip_before_action :ensure_user_profile_is_complete

  def create
    survey_data = {
      team_size: params[:team_size],
      utilization_context: params[:utilization_context],
      features_used: params[:usage_purposes]
    }

    app_metadata = AppMetadata.instance
    app_metadata.update!(onboarding_survey_response: survey_data)

    SubmitSurveyResponseJob.perform_later
  end
end
