class Project < ApplicationRecord
  # Validations
  validates :name, presence: true

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
