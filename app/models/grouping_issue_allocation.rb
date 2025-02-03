class GroupingIssueAllocation < ApplicationRecord
  belongs_to :issue, dependent: :destroy
  belongs_to :grouping

  positioned on: :grouping, column: :position

  # Broadcasts
  after_create_commit -> {
    broadcast_append_later_to(
      "visualization",
      partial: "visualizations/card",
      locals: {
        issue: issue,
        grouping: grouping,
        visualization: grouping.visualization
      },
      target: "#{grouping.id}-cards-wrapper"
    )
  }
end
