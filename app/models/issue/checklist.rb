class Issue::Checklist < ApplicationRecord
  belongs_to :issue
  has_many :items, class_name: "Issue::ChecklistItem", foreign_key: :checklist_id, dependent: :destroy

  validates :title, presence: true

  # Broadcasts
  after_create_commit -> {
    broadcast_append_later_to(
      broadcast_stream,
      target: ActionView::RecordIdentifier.dom_id(issue, :checklists),
      partial: "issues/checklists/checklist",
      locals: {
        checklist: self
      }
    )
  }

  after_update_commit -> {
    broadcast_replace_later_to(
      broadcast_stream,
      partial: "issues/checklists/checklist",
      locals: {
        checklist: self
      }
    )
  }

  after_destroy_commit -> { broadcast_remove_to broadcast_stream }

  def broadcast_stream
    "issue_#{issue_id}/checklists"
  end
end
