class Grouping < ApplicationRecord
  belongs_to :visualization
  has_one :project, through: :visualization
  has_many :allocations, -> { order(position: :asc) },
            foreign_key: "grouping_id",
            class_name: "GroupingIssueAllocation",
            dependent: :destroy
  has_many :issues, through: :allocations

  positioned on: :visualization, column: :position

  validates :title, presence: true

  def allocate_issue(issue)
    allocations.create(issue: issue, position: :last)
  end
end
