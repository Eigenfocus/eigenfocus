class Issue < ApplicationRecord
  acts_as_taggable_on :labels

  # Relations
  belongs_to :project
  has_many_attached :files
  has_many :time_entries, dependent: :nullify
  has_many :grouping_issue_allocations, dependent: :destroy

  # Validations
  validates :title, presence: true

  def to_param
    [ id, title.parameterize ].join("-")
  end
end
