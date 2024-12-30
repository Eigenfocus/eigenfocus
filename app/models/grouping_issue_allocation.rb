class GroupingIssueAllocation < ApplicationRecord
  positioned on: :grouping, column: :position

  belongs_to :issue, dependent: :destroy
  belongs_to :grouping
end
