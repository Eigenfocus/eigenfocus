class Project < ApplicationRecord
  include Project::Templatable

  # Relations
  has_many :visualizations
  has_many :issues
  has_many :issue_labels, dependent: :destroy

  # Validations
  validates :name, presence: true

  def default_visualization
    visualizations.first_or_create
  end

  def archived?
    archived_at.present?
  end

  def unarchive!
    self.archived_at = nil
    save!
  end

  def archive!
    self.archived_at = Date.current
    save!
  end
end
