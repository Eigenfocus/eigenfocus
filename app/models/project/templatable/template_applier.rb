class Project::Templatable::TemplateApplier
  def initialize(project, template_config)
    @project = project
    @template_config = template_config
  end

  def apply
    ActiveRecord::Base.transaction do
      create_board
      create_groupings
      create_labels
      create_sample_issues if template_config[:sample_issues].present?
    end
  end

  private

  attr_reader :project, :template_config

  def create_board
    @board = project.visualizations.create!(type: "board")
  end

  def create_groupings
    template_config[:groupings].each do |grouping_name|
      @board.groupings.create!(title: grouping_name)
    end
  end

  def create_labels
    template_config[:labels].each do |label_title|
      project.issue_labels.create!(title: label_title)
    end
  end

  def create_sample_issues
    first_grouping = @board.groupings.first

    template_config[:sample_issues].each do |issue_data|
      issue = project.issues.create!(
        title: issue_data[:title],
        description: issue_data[:description]
      )

      issue_data[:labels].each do |label_title|
        label = project.issue_labels.find_or_create_by(title: label_title)
        issue.labels << label
      end

      first_grouping.allocate_issue(issue)
    end
  end
end
