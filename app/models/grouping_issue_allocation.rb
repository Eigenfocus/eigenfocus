class GroupingIssueAllocation < ApplicationRecord
  belongs_to :issue, dependent: :destroy
  belongs_to :grouping

  validates :position, presence: true
end
