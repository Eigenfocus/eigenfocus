class Issue < ApplicationRecord
  # Relations
  belongs_to :project

  # Validations
  validates :title, presence: true
  validates :description, presence: true
end
