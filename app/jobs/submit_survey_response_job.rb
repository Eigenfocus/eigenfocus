class SubmitSurveyResponseJob < ApplicationJob
  def perform
    app_metadata = AppMetadata.instance
    survey_response = app_metadata.onboarding_survey_response

    return if survey_response.blank?

    client = SelfHostedApiClient.new(app_metadata)

    client.post("/survey_responses/submit", {
      responder_token: app_metadata.survey_token,
      survey_response: {
        team_size: survey_response["team_size"],
        utilization_context: survey_response["utilization_context"],
        features_used: survey_response["features_used"]
      }
    })
  end
end
