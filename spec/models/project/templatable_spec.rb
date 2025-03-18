require 'rails_helper'

describe Project::Templatable do
  let(:project) { build(:project, visualization_counts: 0, with_issue_labels: []) }

  context 'when creating a project with a valid template, it applies the template' do
    specify 'using the basic_kanban template' do
      project.use_template = :basic_kanban
      project.save!

      expect(project.visualizations.count).to eq(1)

      board = project.visualizations.last

      grouping_titles = board.groupings.pluck(:title)
      expect(grouping_titles).to match_array([ "TODO", "DOING", "DONE" ])

      label_titles = project.issue_labels.pluck(:title)
      expect(label_titles).to match_array([ "priority:high", "priority:low" ])
    end
  end

  context 'when creating a project without a selected template' do
    it "doesn't create anything by default" do
      project.use_template = nil
      project.save!

      expect(project.visualizations.count).to eq(0)
      expect(project.issue_labels.count).to eq(0)
    end
  end
end
