class Project < ApplicationRecord
  # Relations
  has_many :visualizations
  has_many :issues

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
