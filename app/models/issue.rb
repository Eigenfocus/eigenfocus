class Issue < ApplicationRecord
  # Relations
  belongs_to :project
  has_many_attached :files
  has_many :time_entries, dependent: :nullify
  has_many :grouping_issue_allocations, dependent: :destroy
  has_and_belongs_to_many :labels,
    join_table: :issue_labels_links,
    class_name: "IssueLabel"

  # Validations
  validates :title, presence: true

  def to_param
    [ id, title.parameterize ].join("-")
  end
end
