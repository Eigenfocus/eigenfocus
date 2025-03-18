require 'rails_helper'

describe Project::Templatable::TemplateApplier do
  describe '#apply' do
    let(:project) { create(:project, visualization_counts: 0, with_issue_labels: []) }

    let(:template_config) do
      {
        key: 'template_1',
        name: "Template 1",
        description: "Template 1 description",
        groupings: [ "Group1", "Group2" ],
        labels: [ "Label1", "Label2" ],
        sample_issues: [
          {
            title: "Issue 1",
            description: "Description 1",
            labels: [ "Label1" ]
          },
          {
            title: "Issue 2",
            description: "Description 2",
            labels: []
          }
        ]
      }
    end

    let(:template) { Project::Templatable::Template.new(template_config) }

    subject(:applier) { described_class.new(project, template) }

    it 'creates all template components' do
      applier.apply

      expect(project.visualizations.count).to eq(1)

      board = project.visualizations.last
      expect(board.type).to eq("board")

      grouping_titles = board.groupings.pluck(:title)
      expect(grouping_titles).to match_array(template.groupings)

      label_titles = project.issue_labels.pluck(:title)
      expect(label_titles).to match_array(template.labels)

      expect(project.issues.count).to eq(2)

      expect(project.issues.first.title).to eq("Issue 1")
      expect(project.issues.first.description).to eq("Description 1")
      expect(project.issues.first.labels.count).to eq(1)
      expect(project.issues.first.labels.first.title).to eq("Label1")

      expect(project.issues.last.title).to eq("Issue 2")
      expect(project.issues.last.description).to eq("Description 2")
      expect(project.issues.last.labels.count).to eq(0)
    end

    it 'performs operations in a transaction' do
      allow(project.visualizations).to receive(:create!).and_raise(ActiveRecord::RecordInvalid)

      expect { applier.apply }.to raise_error(ActiveRecord::RecordInvalid)

      expect(project.visualizations.count).to eq(0)
      expect(project.issue_labels.count).to eq(0)
    end
  end
end
