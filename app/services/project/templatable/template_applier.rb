class Project::Templatable::TemplateApplier
  def initialize(project, template)
    @project = project
    @template = template
  end

  def apply
    ActiveRecord::Base.transaction do
      create_board
      create_groupings
      create_labels
      create_sample_issues if template[:sample_issues].present?
    end
  end

  private

  attr_reader :project, :template

  def create_board
    @board = project.visualizations.create!(type: "board")
  end

  def create_groupings
    template.groupings.each_with_index do |grouping_name, index|
      @board.groupings.create!(title: grouping_name, position: index + 1)
    end
  end

  def create_labels
    template.labels.each do |label_title|
      project.issue_labels.create!(title: label_title)
    end
  end

  def create_sample_issues
    first_grouping = @board.groupings.first

    template.sample_issues.each do |sample_issue|
      issue = project.issues.create!(
        title: sample_issue.title,
        description: sample_issue.description
      )

      sample_issue.labels.each do |label_title|
        label = project.issue_labels.find_or_create_by(title: label_title)
        issue.labels << label
      end

      first_grouping.allocate_issue(issue)
    end
  end
end
