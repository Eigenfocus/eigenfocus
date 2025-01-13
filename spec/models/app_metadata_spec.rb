require 'rails_helper'

describe AppMetadata do
  subject { AppMetadata.instance }

  it "is a singleton db entry" do
    expect(AppMetadata.count).to be(0)
    app_metadata1 = AppMetadata.instance
    expect(AppMetadata.count).to be(1)
    app_metadata2 = AppMetadata.instance
    expect(AppMetadata.count).to be(1)
    expect(app_metadata1).to eq(app_metadata2)
  end

  specify "#current_version" do
    expect(subject.current_version).to be_an_instance_of(Gem::Version)
  end

  specify '#token' do
    expect(subject.token).to match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  end
end
