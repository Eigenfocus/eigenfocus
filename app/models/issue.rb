class Issue < ApplicationRecord
  # Relations
  belongs_to :project
  has_many_attached :files
  has_many :time_entries, dependent: :nullify

  # Validations
  validates :title, presence: true
end
