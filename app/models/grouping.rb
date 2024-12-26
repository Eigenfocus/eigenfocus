class Grouping < ApplicationRecord
  belongs_to :visualization
  has_one :project, through: :visualization
  has_many :allocations, -> { order(position: :asc) }, foreign_key: "grouping_id", class_name: "GroupingIssueAllocation"
  has_many :issues, through: :allocations

  validates :title, presence: true
  validates :position, presence: true

  def allocate_issue(issue)
    available_position = allocations.count

    allocations.create(position: available_position, issue: issue)
  end
end
