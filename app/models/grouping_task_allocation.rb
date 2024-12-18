class GroupingTaskAllocation < ApplicationRecord
  belongs_to :task
  belongs_to :grouping

  validates :position, presence: true
end
