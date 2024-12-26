require 'rails_helper'

describe TimeEntry do
  around(:example) do |ex|
    Timecop.freeze(2.hours.ago.round) do
      ex.run
    end
  end

  describe '#start!' do
    it "fills started at with current time" do
      entry = FactoryBot.create :time_entry
      expect(entry.started_at).to be_nil
      freeze_time = Time.current.round

      Timecop.freeze(freeze_time) do
        entry.start!

        entry.reload
        expect(entry.started_at).to eq(freeze_time)
      end
    end
  end

  specify '#running?' do
    entry = TimeEntry.new
    entry.started_at = nil
    expect(entry.running?).to be(false)
    entry.started_at = Time.current
    expect(entry.running?).to be(true)
  end

  describe '#stop!' do
    it 'sets started_at to nil' do
      started_at = 3.hours.ago.round
      entry = FactoryBot.create :time_entry, started_at: started_at
      expect(entry.started_at).to eq(started_at)

      entry.stop!

      entry.reload
      expect(entry.started_at).to be_nil
    end

    it "adds the time spent running to total_logged_time_in_minutes" do
      started_at = 3.hours.ago.round
      entry = FactoryBot.create :time_entry, started_at: started_at, total_logged_time_in_minutes: 4
      entry.stop!
      expect(entry.total_logged_time_in_minutes).to eq(4 + 3 * 60)
    end
  end
end
