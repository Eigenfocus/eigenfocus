class Grouping < ApplicationRecord
  belongs_to :visualization
  has_many :allocations, -> { order(position: :asc) }, foreign_key: "grouping_id", class_name: "GroupingIssueAllocation"

  validates :title, presence: true
  validates :position, presence: true
end
