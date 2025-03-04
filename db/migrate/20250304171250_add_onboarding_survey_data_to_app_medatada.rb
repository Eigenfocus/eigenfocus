class AddOnboardingSurveyDataToAppMedatada < ActiveRecord::Migration[8.0]
  def change
    add_column :app_metadata, :onboarding_survey_response, :json, default: {}
    add_column :app_metadata, :survey_token, :string
  end
end
