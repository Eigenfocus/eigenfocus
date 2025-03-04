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
  end

  specify "#current_version" do
    expect(subject.current_version).to be_an_instance_of(Gem::Version)
  end

  specify '#last_released_version' do
    expect(subject.last_released_version).to be_an_instance_of(Gem::Version)
  end

  describe '#touch_usage!' do
    it 'updates last_used_at to current time' do
      Timecop.freeze(reference_time = DateTime.current) do
        subject.last_used_at = nil
        subject.save!
        subject.touch_usage!
        expect(subject.last_used_at).to be_within(1.second).of(reference_time)
      end
    end

    it "doesn't update to an older date" do
      Timecop.freeze(tomorrow = DateTime.current + 1.day) do
        subject.last_used_at = DateTime.current
        subject.save!

        subject.touch_usage!
        expect(subject.last_used_at).to be_within(1.second).of(tomorrow)
      end
    end
  end

  describe '#is_app_outdated?' do
    specify do
      expect(subject).to receive(:current_version).and_return(Gem::Version.new("0.77.0"))
      subject.last_released_version = "0.112.0"
      expect(subject.is_app_outdated?).to be(true)
    end

    specify do
      expect(subject).to receive(:current_version).twice.and_return(Gem::Version.new("0.77.0-beta1"))
      subject.last_released_version = "0.77.0-alpha2"
      expect(subject.is_app_outdated?).to be(false)
      subject.last_released_version = "0.77.0-beta2"
      expect(subject.is_app_outdated?).to be(true)
    end
  end

  it "sets survey_token if it's not set" do
    expect(subject.survey_token).to be_present

    subject.update_column(:survey_token, nil)

    subject.reload

    expect(subject.survey_token).to be_nil
    subject.save!
    expect(subject.survey_token).to be_present
  end
end
