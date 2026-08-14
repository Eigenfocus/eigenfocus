class Issue::ChecklistItem < ApplicationRecord
  belongs_to :checklist, class_name: "Issue::Checklist"
  belongs_to :finished_by, class_name: "User", optional: true

  positioned on: :checklist, column: :position

  # An item without a description is one somebody is still typing, only its
  # author sees it, through the form in the checklist's new item slot.
  scope :described, -> { where.not(description: [ nil, "" ]) }

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
    # The positioned gem shifts the siblings with a bulk update, so the dragged
    # item is the only one with callbacks. Re-render the list rather than trying
    # to move a single row.
    return broadcast_items_reorder if saved_change_to_position?
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

  def broadcast_items_reorder
    # Update, not replace, so the container holding the sortable controller
    # survives and only its rows are swapped.
    broadcast_update_later_to(
      checklist.broadcast_stream,
      target: ActionView::RecordIdentifier.dom_id(checklist, :items),
      partial: "issues/checklist_items/items",
      locals: {
        checklist: checklist
      }
    )
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
