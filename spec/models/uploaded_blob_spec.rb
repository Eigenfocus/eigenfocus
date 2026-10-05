require 'rails_helper'

describe UploadedBlob do
  let(:blob) { ActiveStorage::Blob.create_and_upload!(io: StringIO.new("content"), filename: "notes.txt") }

  it "finds a blob from its upload signed id" do
    expect(described_class.find(described_class.signed_id_for(blob))).to eq(blob)
  end

  it "does not accept the regular blob signed id" do
    expect { described_class.find(blob.signed_id) }.to raise_error(ActiveRecord::RecordNotFound)
  end

  it "does not accept an expired upload signed id" do
    signed_id = described_class.signed_id_for(blob)

    Timecop.travel(61.minutes.from_now) do
      expect { described_class.find(signed_id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
