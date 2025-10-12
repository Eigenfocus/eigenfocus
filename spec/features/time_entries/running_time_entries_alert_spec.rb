require 'rails_helper'

context "Running time entries" do
  let!(:user) { FactoryBot.create(:user) }

  around(:example) do |ex|
    Timecop.freeze("2023-07-13 12:00".to_datetime) do
      ex.run
    end
  end

  let(:user) { FactoryBot.create(:user) }

  specify "I should se a list of running time entries in other dates" do
    day_before_yesterday_entry = FactoryBot.create(:time_entry, user:, description: 'day before yesterday entry', reference_date: 2.days.ago)
    day_before_yesterday_entry.start!
    yesterday_entry = FactoryBot.create(:time_entry, user:, description: 'yesterday entry', reference_date: 1.day.ago)
    yesterday_entry.start!
    today_entry1 = FactoryBot.create(:time_entry, user:, description: 'td entry', reference_date: Date.current)
    today_entry1.start!

    visit time_entries_path

    within '.alert' do
      expect(page).to have_content('You have time entries still running on other dates')
      expect(page).to have_content('11 jul')
      expect(page).to have_content('12 jul')
      expect(all('a').size).to eq(2)
    end
  end
end
