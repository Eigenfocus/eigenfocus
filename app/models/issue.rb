class Issue < ApplicationRecord
  # Relations
  belongs_to :project
  has_many_attached :files
  has_many :time_entries, dependent: :nullify
  has_many :grouping_issue_allocations, dependent: :destroy

  # Labels
  acts_as_taggable_on :labels
  acts_as_taggable_tenant :project_id

  # Validations
  validates :title, presence: true

  def to_param
    [ id, title.parameterize ].join("-")
  end
end
