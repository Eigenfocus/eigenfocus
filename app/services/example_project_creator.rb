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
      name: "Eigenfocus - Tour Project",
      time_tracking_enabled: true
    )
  end

  def create_visualization!
    @visualization = @project.visualizations.create!(
      type: "board"
    )
  end

  def create_groupings!
    @to_do = @visualization.groupings.create!(title: "To Do")
    @in_progress = @visualization.groupings.create!(title: "In Progress")
    @done = @visualization.groupings.create!(title: "Done")
  end

  def create_tutorial_issues!
    # Create completed issues
    create_issue!(
      "Create a new project",
      "You've already completed this step! The project was created automatically for you.",
      @done
    )

    create_issue!(
      "Enter the project board",
      "You're already here! This board view helps you organize your issues in columns.",
      @done
    )

    # Create in-progress issues
    create_issue!(
      "Move an issue from In Progress to Done",
      "Try dragging this card to the Done column. You can move any issue between columns to track its progress.",
      @in_progress
    )

    # Create todo issues
    create_issue!(
      "Create a new issue",
      "Click the + button at the bottom of any column to create a new issue.",
      @to_do
    )

    create_issue!(
      "Open the issue card",
      "Click on any issue card to see its details. You can:\n\n" \
      "- Add labels to categorize your issues\n" \
      "- Upload files and attachments\n" \
      "- Add detailed descriptions using markdown",
      @to_do
    )

    create_issue!(
      "Start tracking time",
      "Time tracking helps you monitor how long you spend on each task. Click the Track Time button to start tracking time.",
      @to_do
    )
  end

  def create_issue!(title, description, grouping)
    issue = @project.issues.create!(
      title: title,
      description: description
    )

    grouping.allocate_issue(issue)
    issue
  end
end
