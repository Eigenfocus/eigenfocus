class Issue < ApplicationRecord
  # Relations
  belongs_to :project
  has_many_attached :files

  # Validations
  validates :title, presence: true
end
