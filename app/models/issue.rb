class Issue < ApplicationRecord
  # Relations
  belongs_to :project
  has_many_attached :files
  has_many :time_entries, dependent: :nullify
  has_many :grouping_issue_allocations, dependent: :destroy

  # Validations
  validates :title, presence: true

  # Broadcasts
  after_update_commit -> {
    broadcast_replace_later_to(
      project.default_visualization,
      partial: "visualizations/card",
      locals: {
        issue: self,
        visualization: project.default_visualization
      }
    )
  }
  after_destroy_commit -> { broadcast_remove_to "visualization" }

  def to_param
    [ id, title.parameterize ].join("-")
  end
end
