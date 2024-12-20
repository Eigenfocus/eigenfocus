class GroupingIssueAllocation < ApplicationRecord
  belongs_to :issue
  belongs_to :grouping

  validates :position, presence: true
end
