class GroupingIssueAllocation < ApplicationRecord
  belongs_to :issue, dependent: :destroy
  belongs_to :grouping

  positioned on: :grouping, column: :position

  # Broadcasts
  after_create_commit -> {
    broadcast_append_later_to(
      grouping.visualization,
      partial: "visualizations/card",
      locals: {
        issue: issue,
        visualization: grouping.visualization
      },
      target: "#{grouping.id}-cards-wrapper"
    )
  }
  after_update_commit -> {
    Visualizations::AllocationsChannel.broadcast_update(self)
  }
end
