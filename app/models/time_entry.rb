class TimeEntry < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :project
  belongs_to :issue, optional: true

  # Scopes
  scope :by_date, ->(date) { where(reference_date: date) }
  scope :running, -> { where.not(started_at: nil) }

  # Validations
  validates :reference_date, presence: true
  validates :total_logged_time_in_minutes,
            presence: true,
            numericality: { greater_than_or_equal_to: 0 }

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
