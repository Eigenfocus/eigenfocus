class Issue::ChecklistItem < ApplicationRecord
  belongs_to :checklist, class_name: "Issue::Checklist"
  belongs_to :finished_by, class_name: "User", optional: true

  positioned on: :checklist, column: :position

  # Broadcasts
  #
  # Clicking "Add item" persists a blank item right away and only its author
  # sees the form for it, so blank items stay out of the stream. An item joins
  # the list for everybody on the save that gives it a description.
  after_create_commit -> { broadcast_append_item if description.present? }

  after_update_commit -> { broadcast_item_update }

  after_destroy_commit -> { broadcast_remove_to checklist.broadcast_stream }

  def finished?
    finished_at.present?
  end

  def finish!(user)
    update!(finished_at: Time.current, finished_by: user)
  end

  def unfinish!
    update!(finished_at: nil, finished_by: nil)
  end

  private

  def broadcast_item_update
    return if description.blank?

    if saved_change_to_description? && description_previously_was.blank?
      broadcast_append_item
    else
      broadcast_replace_later_to(
        checklist.broadcast_stream,
        partial: "issues/checklist_items/checklist_item",
        locals: {
          item: self
        }
      )
    end
  end

  def broadcast_append_item
    broadcast_append_later_to(
      checklist.broadcast_stream,
      target: ActionView::RecordIdentifier.dom_id(checklist, :items),
      partial: "issues/checklist_items/checklist_item",
      locals: {
        item: self
      }
    )
  end
end
