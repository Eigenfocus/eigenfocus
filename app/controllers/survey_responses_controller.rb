class SurveyResponsesController < ApplicationController
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
