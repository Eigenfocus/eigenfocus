require 'rails_helper'

describe Project do
  describe "Removal is only possible if the project is archived" do
    it "can be removed if it is archived" do
      project = create(:project, :archived)
      expect(project.destroy).to be_truthy
    end

    it "can't be removed if it is not archived" do
      project = create(:project)
      expect(project.destroy).to be_falsey
      expect(project.errors.full_messages).to include("Project must be archived before it can be removed.")
    end
  end

  describe "Using templates" do
    let(:project) { build(:project, visualization_counts: 0, with_issue_labels: []) }
    describe '#use_template=' do
      it "allows nil" do
        project.use_template = nil
        expect(project.use_template).to be_blank
      end

      it "allows empty string" do
        project.use_template = ""
        expect(project.use_template).to be_blank

        project.use_template = "   "
        expect(project.use_template).to be_blank
      end

      it "allows only a valid template" do
        project.use_template = "basic_kanban"
        expect(project.use_template).to eq('basic_kanban')
      end

      it "rejects invalid templates" do
        project.use_template = "invalid_template"

        expect(project).to be_invalid
        expect(project.errors.full_messages).to include("Use template is not included in the list")
      end
    end

    context 'when creating a project with a valid template, it applies the template' do
      specify 'using the basic_kanban template' do
        project.use_template = 'basic_kanban'
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
        expect(project).not_to receive(:apply_template)
        project.use_template = ""
        project.save!

        expect(project.visualizations.count).to eq(0)
        expect(project.issue_labels.count).to eq(0)
      end
    end
  end
end
