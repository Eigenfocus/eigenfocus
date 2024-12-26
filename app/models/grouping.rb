class Grouping < ApplicationRecord
  belongs_to :visualization
  has_many :allocations, foreign_key: "grouping_id", class_name: "GroupingIssueAllocation"

  validates :title, presence: true
  validates :position, presence: true

  def ordered_allocations
    allocations.sort(&:position)
  end
end