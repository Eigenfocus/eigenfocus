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

  # Scopes
  scope :by_label_titles, ->(*label_titles) do
    # This scope is using splat operator because ransack has a buggy behavior
    # for array values with scopes.
    # See more: https://github.com/activerecord-hackery/ransack/issues/404

    # If we call without using ransack it need flatten the array
    # Issue.by_label_titles("dev", "test")
    label_titles.flatten!
    from(
      joins(:labels)
        .where("LOWER(issue_labels.title) IN (?)", label_titles.map(&:downcase))
        .group("issues.id")
        .having("COUNT(DISTINCT issue_labels.id) = ?", label_titles.size),
      :issues
    )
  end

  def self.ransackable_attributes(auth_object = nil)
    [ "title", "created_at", "updated_at" ]
  end

  def self.ransackable_associations(auth_object = nil)
    [ "labels" ]
  end

  def self.ransackable_scopes(auth_object = nil)
    [ "by_label_titles" ]
  end

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
