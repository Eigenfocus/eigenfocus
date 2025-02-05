class Issue < ApplicationRecord
  # Relations
  belongs_to :project
  has_many_attached :files
  has_many :time_entries, dependent: :nullify
  has_many :grouping_issue_allocations, dependent: :destroy
  ## Relations/Labels
  has_many :label_links, class_name: "IssueLabelLink", dependent: :destroy
  has_many :labels, through: :label_links, source: :issue_label

  # Validations
  validates :title, presence: true

  def to_param
    [ id, title.parameterize ].join("-")
  end
end
