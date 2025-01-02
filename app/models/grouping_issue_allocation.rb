class GroupingIssueAllocation < ApplicationRecord
  belongs_to :issue, dependent: :destroy
  belongs_to :grouping

  positioned on: :grouping, column: :position
end
