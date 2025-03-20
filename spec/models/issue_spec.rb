require 'rails_helper'

describe Issue do
  let(:project) { create(:project) }
  let(:issue) { create(:issue, project: project) }

  describe "Removal is only possible if the project is archived" do
    it "can be removed if it is archived" do
      issue = create(:issue, :archived, project: project)
      expect(issue.destroy).to be_truthy
    end

    it "can't be removed if it is not archived" do
      expect(issue.destroy).to be_falsey
      expect(issue.errors.full_messages).to include("Issue must be archived before it can be removed.")
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
