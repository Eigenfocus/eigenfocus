class Issue::Comment < ApplicationRecord
  # Associations
  belongs_to :issue, counter_cache: true
  belongs_to :author, class_name: "User"

  # Validations
  validates :content, presence: true

  # Broadcasts
  after_create_commit -> {
    broadcast_prepend_later_to(
      "issue_#{issue.id}/comments",
      partial: "issues/comments/comment",
      locals: {
        comment: self
      },
      target: "issue-comments-list"
    )

    broadcast_replace_later_to(
      issue.project.default_visualization,
      partial: "visualizations/groupings/_card/icons",
      locals: {
        issue: issue
      },
      target: "card-icons_issue_#{issue.id}"
    )
  }

  after_update_commit -> {
    broadcast_replace_later_to(
      "issue_#{issue.id}/comments",
      partial: "issues/comments/comment",
      locals: {
        comment: self
      }
    )
  }

  after_destroy_commit -> {
    # The comment is removed so we can't call broadcast_replace_later_to
    Turbo::StreamsChannel.broadcast_replace_later_to(
      issue.project.default_visualization,
      partial: "visualizations/groupings/_card/icons",
      locals: {
        issue: issue
      },
      target: "card-icons_issue_#{issue.id}"
    ) unless suppressed_turbo_broadcasts?

    broadcast_remove_to "issue_#{issue.id}/comments"
  }
end
