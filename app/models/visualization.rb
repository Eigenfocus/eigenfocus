class Visualization < ApplicationRecord
  self.inheritance_column = "_type"

  VALID_TYPES = [ "board" ]

  # Associations
  belongs_to :project
  has_many :groupings, -> { order(position: :asc) }

  # Validations
  validates :type, inclusion: { in: VALID_TYPES }

  # Broadcasts
  after_update_commit :broadcast_favorite_issue_labels, if: -> { saved_change_to_favorite_issue_labels? }
  def broadcast_favorite_issue_labels
    broadcast_replace_later_to(
      self,
      targets: "[data-visualization-favorite-labels-list='#{id}']".html_safe,
      partial: "visualizations/favorite_labels_dropdown_list",
      locals: { visualization: self }
    )
  end
end
