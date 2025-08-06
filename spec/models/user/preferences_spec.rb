require 'rails_helper'

describe User::Preferences do
  describe '#time_entry_time_format' do
    it 'has a minutes format by default' do
      user = User.new
      expect(user.preferences.time_entry_time_format).to eq('minutes')
    end

    it 'can be set to hours' do
      user = create(:user)
      user.preferences.time_entry_time_format = 'hours'
      user.save!
      user.reload
      expect(user.preferences.time_entry_time_format).to eq('hours')
    end
  end
end
