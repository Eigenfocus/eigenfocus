class ExampleProjectCreator
  def self.call
    new.()
  end

  def call
    ActiveRecord::Base.transaction do
      create_project!
      create_visualization!
      create_groupings!
      create_tutorial_issues!
    end

    @to_do.update(position: 1)
    @in_progress.update(position: 2)
    @done.update(position: 3)
  end

  private

  attr_reader :user

  def create_project!
    @project = Project.create!(
      name: t("project.name"),
      time_tracking_enabled: true
    )
  end

  def create_visualization!
    @visualization = @project.visualizations.create!(
      type: "board"
    )
  end

  def create_groupings!
    @to_do = @visualization.groupings.create!(
      title: t("groupings.to_do")
    )
    @in_progress = @visualization.groupings.create!(
      title: t("groupings.in_progress")
    )
    @done = @visualization.groupings.create!(
      title: t("groupings.done")
    )
  end

  def create_tutorial_issues!
    # Create completed issues
    create_issue!(
      "create_project",
      @done
    )

    create_issue!(
      "enter_board",
      @done
    )

    # Create in-progress issues
    create_issue!(
      "move_issue",
      @in_progress
    )

    # Create todo issues
    create_issue!(
      "create_issue",
      @to_do
    )

    create_issue!(
      "open_issue",
      @to_do
    )

    create_issue!(
      "track_time",
      @to_do
    )
  end

  def create_issue!(issue_key, grouping)
    issue = @project.issues.create!(
      title: t("issues.#{issue_key}.title"),
      description: t("issues.#{issue_key}.description")
    )

    grouping.allocate_issue(issue)
    issue
  end

  private def t(key)
    I18n.t(key, scope: "examples.project_template")
  end
end
