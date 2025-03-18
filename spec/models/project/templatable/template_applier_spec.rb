require 'rails_helper'

describe Project::Templatable::TemplateApplier do
  describe '#apply' do
    let(:project) { create(:project, visualization_counts: 0, with_issue_labels: []) }

    let(:template_config) do
      {
        groupings: [ "Group1", "Group2" ],
        labels: [ "Label1", "Label2" ]
      }
    end

    subject(:applier) { described_class.new(project, template_config) }

    it 'creates all template components' do
      applier.apply

      expect(project.visualizations.count).to eq(1)

      board = project.visualizations.last
      expect(board.type).to eq("board")

      grouping_titles = board.groupings.pluck(:title)
      expect(grouping_titles).to match_array(template_config[:groupings])

      label_titles = project.issue_labels.pluck(:title)
      expect(label_titles).to match_array(template_config[:labels])
    end

    it 'performs operations in a transaction' do
      allow(project.visualizations).to receive(:create!).and_raise(ActiveRecord::RecordInvalid)

      expect { applier.apply }.to raise_error(ActiveRecord::RecordInvalid)

      expect(project.visualizations.count).to eq(0)
      expect(project.issue_labels.count).to eq(0)
    end
  end
end
