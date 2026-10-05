require 'rails_helper'

describe Issue do
  let(:project) { create(:project) }
  let(:issue) { create(:issue, project: project) }

  describe "Removal is only possible if the issue is archived" do
    it "can be removed if it is archived" do
      issue = create(:issue, :archived, project: project)
      expect(issue.destroy).to be_truthy
    end

    it "can't be removed if it is not archived" do
      expect(issue.destroy).to be_falsey
      expect(issue.errors.full_messages).to include("Issue must be archived before it can be removed.")
    end
  end


  describe "cover" do
    let(:image) { ActiveStorage::Blob.create_and_upload!(io: file_fixture("cover.png").open, filename: "cover.png") }

    it "uses an attached image as cover" do
      issue.files.attach(image)

      expect(issue.cover_with(issue.files.attachments.first)).to be_truthy
      expect(issue.reload.cover_attachment.blob).to eq(image)
      expect(issue.files.count).to eq(1)
    end

    it "attaches the image to the issue files when it is not attached yet" do
      expect(issue.cover_with_upload(image)).to be_truthy
      expect(issue.reload.files.blobs).to eq([ image ])
      expect(issue.cover_attachment.blob).to eq(image)
    end

    it "does not accept a file that is not an image" do
      text = ActiveStorage::Blob.create_and_upload!(io: StringIO.new("content"), filename: "notes.txt", content_type: "text/plain")

      expect(issue.cover_with_upload(text)).to be_falsey
      expect(issue.reload.files).to be_empty
      expect(issue.cover_attachment).to be_nil
    end

    it "does not accept a file from another issue" do
      other_issue = create(:issue, project:)
      other_issue.files.attach(image)

      expect(issue.cover_with(other_issue.files.attachments.first)).to be_falsey
      expect(issue.errors).to include(:cover_attachment)
      expect(issue.reload.cover_attachment).to be_nil
    end

    it "keeps the issue usable after a rejected cover" do
      issue.cover_with_upload(image)
      text = ActiveStorage::Blob.create_and_upload!(io: StringIO.new("content"), filename: "notes.txt", content_type: "text/plain")

      expect(issue.cover_with_upload(text)).to be_falsey
      expect(issue.cover_attachment.blob).to eq(image)

      issue.update!(title: "Renamed")
      issue.update!(title: "Renamed again", cover_attachment: nil)

      expect(issue.reload.files.blobs).to eq([ image ])
    end

    it "removes the cover and keeps the file" do
      issue.cover_with_upload(image)

      issue.remove_cover

      expect(issue.reload.cover_attachment).to be_nil
      expect(issue.files.count).to eq(1)
    end

    it "clears the cover when the cover file is removed" do
      issue.cover_with_upload(image)

      issue.remove_file(image)

      expect(issue.reload.cover_attachment_id).to be_nil
      expect(issue.files).to be_empty
    end
  end

  describe 'labels_list implementation' do
    context 'when given a comma-separated string' do
      it 'sets the labels_list but not the labels' do
        issue.labels_list = 'bug,feature,urgent'

        expect(issue.labels_list).to eq([ 'bug', 'feature', 'urgent' ])
        expect(issue.labels.count).to eq(0)
        expect(issue.labels).to be_empty
      end

      it 'handles whitespace in the input' do
        issue.labels_list = ' bug ,  feature , urgent '

        expect(issue.labels_list).to match_array([ 'bug', 'feature', 'urgent' ])
      end
    end

    context 'when given an array' do
      it 'creates and assigns label list from array' do
        issue.labels_list = [ 'bug', 'feature' ]

        expect(issue.labels_list).to match_array([ 'bug', 'feature' ])
      end
    end

    context 'when given blank input' do
      it 'handles nil input' do
        issue.labels_list = nil
        expect(issue.labels).to be_empty
      end

      it 'handles empty string input' do
        issue.labels_list = ''
        expect(issue.labels).to be_empty
        issue.labels_list = '    '
        expect(issue.labels).to be_empty
      end

      it 'handles empty array input' do
        issue.labels_list = []
        expect(issue.labels).to be_empty
      end
    end

    it "saves the @labels_list to the database creating or reusing labels" do
      project.issue_labels.create!(title: "Bug")
      expect(project.issue_labels.count).to eq(1)

      issue.reload
      issue.labels_list = 'bug,feature'
      issue.save!

      expect(project.issue_labels.count).to eq(2)
      expect(issue.labels.count).to eq(2)
      expect(issue.labels.pluck(:title)).to match_array([ 'Bug', 'feature' ])
    end
  end
end
