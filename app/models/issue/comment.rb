class Issue::Comment < ApplicationRecord
  # Associations
  belongs_to :issue

  # Validations
  validates :content, presence: true

  # Broadcasts
  after_create_commit -> {
    broadcast_append_later_to(
      "issue_#{issue.id}/comments",
      partial: "issues/comments/comment",
      locals: {
        comment: self
      },
      target: "issue-comments-list"
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

  after_destroy_commit -> { broadcast_remove_to "issue_#{issue.id}/comments" }
end
