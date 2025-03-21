class TimeEntry < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :project
  belongs_to :issue, optional: true

  # Scopes
  scope :by_date, ->(date) { where(reference_date: date) }
  scope :running, -> { where.not(started_at: nil) }
  scope :by_issue_labels_title, ->(*label_titles) {
    # This scope is using splat operator because ransack has a buggy behavior
    # for array values with scopes.
    # See more: https://github.com/activerecord-hackery/ransack/issues/404

    # If we call without using ransack it need flatten the array
    # Issue.by_label_titles("dev", "test")
    label_titles.flatten!
    where(issue_id: Issue.by_label_titles(label_titles).select(:id))
  }

  # Validations
  validates :reference_date, presence: true
  validates :total_logged_time_in_minutes,
            presence: true,
            numericality: { greater_than_or_equal_to: 0 }

  # Broadcasts
  broadcasts_to ->(time_entry) { "time_entries" }, inserts_by: :prepend, target: "time-entries-tbody"

  # Ransack
  def self.ransackable_attributes(auth_object = nil)
    ["project_id", "reference_date", "by_issue_labels_title"]
  end

  def self.ransackable_scopes(auth_object = nil)
    [ "by_issue_labels_title" ]
  end

  def start!
    fail "You can only start stopped time entries" if started_at.present?
    self.started_at = DateTime.current
    save!
  end

  def stop!
    fail "You can only stop running time entries" if started_at.nil?
    self.total_logged_time_in_minutes ||= 0
    self.total_logged_time_in_minutes = ((Time.current - started_at) / 60.0) + total_logged_time_in_minutes
    self.started_at = nil
    save!
  end

  def total_time
    return total_logged_time_in_minutes unless running?
    total_logged_time_in_minutes + (Time.current - started_at.to_datetime)/60.0
  end

  def running?
    started_at.present?
  end
end
