require 'rails_helper'

RSpec.describe SubmitSurveyResponseJob, type: :job do
  describe '#perform' do
    let(:app_metadata) { AppMetadata.instance }

    let(:survey_response) do
      {
        "team_size" => "1-to-10",
        "utilization_context" => "work_software_development",
        "features_used" => [ "time_tracking", "project_management" ],
        "how_did_you_found_us" => "social_media",
        "how_did_you_found_us_details" => "Facebook"
      }
    end

    let(:client) { instance_double(SelfHostedApiClient) }

    before do
      app_metadata.update!(
        onboarding_survey_response: survey_response,
        survey_token: "test-survey-token"
      )

      allow(SelfHostedApiClient).to receive(:new).with(app_metadata).and_return(client)
    end

    it 'sends the survey response to the API' do
      expected_payload = {
        responder_token: app_metadata.survey_token,
        survey_response: {
          team_size: survey_response["team_size"],
          utilization_context: survey_response["utilization_context"],
          features_used: survey_response["features_used"],
          how_did_you_found_us: survey_response["how_did_you_found_us"],
          how_did_you_found_us_details: survey_response["how_did_you_found_us_details"]
        }
      }

      expect(client).to receive(:post).with("/survey_responses/submit", expected_payload)

      described_class.perform_now
    end

    it 'does nothing when survey response is blank' do
      app_metadata.update!(onboarding_survey_response: {})

      expect(client).not_to receive(:post)

      described_class.perform_now
    end

    it 'does nothing when survey response is nil' do
      app_metadata.update!(onboarding_survey_response: nil)

      expect(client).not_to receive(:post)

      described_class.perform_now
    end
  end
end
