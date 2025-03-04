require 'rails_helper'

describe AppVersionUpdater do
  let(:app_metadata) { AppMetadata.instance }

  before(:each) do
    app_metadata.last_released_version = Gem::Version.new("0.14.0")
    app_metadata.save!
  end

  subject { AppVersionUpdater.new(app_metadata) }

  specify '#update_newest_release_metadata!' do
    expect_any_instance_of(SelfHostedApiClient).to receive(:get).with("/app_versions/latest").and_return({
      "latest_version" => "0.15.0"
    })

    subject.update_newest_release_metadata!

    app_metadata.reload

    expect(app_metadata.last_released_version).to be(Gem::Version.new("0.15.0"))
  end
end
