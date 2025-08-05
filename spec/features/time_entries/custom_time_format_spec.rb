require 'rails_helper'

describe 'Time entry - custom time format input' do
  let!(:user) { FactoryBot.create(:user) }
  let!(:project) { FactoryBot.create(:project) }

  around(:example) do |ex|
    Timecop.freeze("2023-07-13 12:00".to_datetime) do
      ex.run
    end
  end

  specify "I can switch between different time formats" do
    user.preferences.time_entry_time_format = 'minutes'
    user.save!

    time_entry = FactoryBot.create(:time_entry, user:, total_logged_time_in_minutes: 110, description: 'td entry2', reference_date: Date.current)

    visit time_entries_path

    within "#time_entry_#{time_entry.id}" do
      click_link "Edit"
    end

    within '#time_entry_form' do
      expect(first('.cpy-input-placeholder').value).to eq('110')

      click_link('Hours')
      expect(first('.cpy-input-placeholder').value).to eq('1.83')
      user.reload
      expect(user.preferences.time_entry_time_format).to eq('hours')

      click_link('Minutes')
      expect(first('.cpy-input-placeholder').value).to eq('110')
      user.reload
      expect(user.preferences.time_entry_time_format).to eq('minutes')
    end
  end
end
