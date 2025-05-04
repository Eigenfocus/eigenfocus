class Issue < ApplicationRecord
  # Relations
  belongs_to :project
  has_many_attached :files
  has_many :time_entries, dependent: :nullify
  has_many :grouping_issue_allocations, dependent: :destroy
  has_many :groupings, through: :grouping_issue_allocations
  has_many :comments, class_name: "Issue::Comment", dependent: :destroy

  ## Relations/Labels
  has_many :label_links, class_name: "IssueLabelLink", dependent: :destroy
  has_many :labels, through: :label_links, source: :issue_label

  # Validations
  validates :title, presence: true

  # Scopes
  scope :archived, ->(archived = true) { archived ? where.not(archived_at: nil) : where(archived_at: nil) }
  scope :active, -> { archived(false) }
  scope :by_archiving_status, ->(status) {
    case status
    when "all"
      all
    when "active"
      active
    when "archived"
      archived(true)
    end
  }

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

  # Hooks
  before_destroy :ensure_is_archived, unless: -> { destroyed_by_association }

  def archived?
    archived_at.present?
  end

  def unarchive!
    self.archived_at = nil
    save!
  end

  def archive!
    self.archived_at = Time.current
    save!
  end

  def self.ransackable_attributes(auth_object = nil)
    [ "title", "due_date", "created_at", "updated_at" ]
  end

  def self.ransackable_associations(auth_object = nil)
    [ "labels", "grouping_issue_allocations", "groupings" ]
  end

  def self.ransackable_scopes(auth_object = nil)
    [ "by_label_titles", "by_archiving_status" ]
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

  def to_param
    if persisted?
      [ id, title.parameterize ].join("-")
    end
  end

  def labels_list=(labels_input)
    return if labels_input.blank?

    @labels_list = if labels_input.is_a?(Array)
      labels_input.reject(&:blank?).map(&:strip)
    else
      labels_input.split(",").reject(&:blank?).map(&:strip)
    end

    @labels_list
  end

  def labels_list
    @labels_list || labels.map(&:title)
  end

  before_commit :apply_labels_list, unless: -> { @labels_list.blank? }

  def apply_labels_list
    self.labels = @labels_list.map do |title|
      label = project.issue_labels.with_title(title).first
      label ||= project.issue_labels.create(title: title)
      label
    end
  end

  private def ensure_is_archived
    unless archived?
      errors.add(:base, :must_be_archived_to_destroy)
      throw(:abort)
    end
  end
end
