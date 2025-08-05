require 'rails_helper'

describe ProfilesController do
  describe 'PATCH #update_preferences' do
    specify 'Updating the time entry time format' do
      user = Current.user
      user.preferences.time_entry_time_format = 'minutes'
      user.save!

      patch :update_preferences, params: { time_entry_time_format: 'hours' }

      user.reload
      expect(user.preferences.time_entry_time_format).to eq('hours')
    end
  end
end
