require 'rails_helper'

describe AppMetadata do
  subject { AppMetadata.instance }

  describe '.instance' do
    it "is a singleton db entry" do
      expect(AppMetadata.count).to be(0)
      app_metadata1 = AppMetadata.instance
      expect(app_metadata1).to be_persisted

      expect(AppMetadata.count).to be(1)
      app_metadata2 = AppMetadata.instance
      expect(AppMetadata.count).to be(1)
      expect(app_metadata1).to eq(app_metadata2)
    end
  end

  describe 'singleton setup' do
    it "sets last_released_version to current_version when creating" do
      expect(subject.last_released_version).to eq(subject.current_version)
    end

    it 'sets a token' do
      expect(subject.token).to match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    end

    it "sets last_released_version_updated_at to now" do
      current_time = DateTime.current

      Timecop.freeze(current_time) do
        expect(subject.last_released_version_updated_at.utc.to_s).to eq(current_time.utc.to_s)
      end
    end
  end

  specify "#current_version" do
    expect(subject.current_version).to be_an_instance_of(Gem::Version)
  end

  specify '#last_released_version' do
    expect(subject.last_released_version).to be_an_instance_of(Gem::Version)
  end
end
