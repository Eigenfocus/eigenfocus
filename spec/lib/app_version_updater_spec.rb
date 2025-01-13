require 'rails_helper'

describe AppVersionUpdater do
  let(:app_metadata) { AppMetadata.instance }

  before(:each) do
    app_metadata.last_released_version = Gem::Version.new("0.14.0")
    app_metadata.save!
  end

  subject { AppVersionUpdater.new(app_metadata) }

  specify '#should_fetch_newest_release?' do
    Timecop.freeze do
      app_metadata.last_released_version_checked_at = DateTime.current
      expect(subject.should_fetch_newest_release?).to be(false)

      app_metadata.last_released_version_checked_at = 25.hours.ago
      expect(subject.should_fetch_newest_release?).to be(true)

      app_metadata.last_released_version_checked_at = 2.days.ago
      expect(subject.should_fetch_newest_release?).to be(true)

      app_metadata.last_released_version_checked_at = 10.days.ago
      expect(subject.should_fetch_newest_release?).to be(true)
    end
  end

  specify '#update_newest_release_metadata!' do
    stub_request(:get, /eigenfocus.com/).to_return(
      status: 200,
      body: { latest_version: "0.15.0" }.to_json,
      headers: { "Content-Type"=> "application/json" }
    )

    subject.update_newest_release_metadata!

    app_metadata.reload

    expect(app_metadata.last_released_version).to be(Gem::Version.new("0.15.0"))
  end
end
