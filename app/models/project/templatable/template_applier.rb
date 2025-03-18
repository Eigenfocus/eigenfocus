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
end
