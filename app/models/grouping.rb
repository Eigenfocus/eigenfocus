class Grouping < ApplicationRecord
  # Associations
  belongs_to :visualization
  has_one :project, through: :visualization
  has_many :allocations, -> { order(position: :asc) },
            foreign_key: "grouping_id",
            class_name: "GroupingIssueAllocation",
            dependent: :destroy
  has_many :issues, through: :allocations

  positioned on: :visualization, column: :position

  # Validations
  validates :title, presence: true

  # Broadcasts
  after_create_commit -> {
    broadcast_append_later_to(
      "visualization",
      partial: "visualizations/column",
      locals: {
        grouping: self,
        visualization: visualization
      },
      target: "kanban-board"
    )
  }
  after_update_commit -> { broadcast_replace_later_to "visualization", partial: "visualizations/column",
      locals: {
        grouping: self,
        visualization: visualization
      }
  }
  after_destroy_commit -> { broadcast_remove_to "visualization" }

  def allocate_issue(issue)
    allocations.create(issue: issue, position: :last)
  end
end
