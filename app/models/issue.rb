class Issue < ApplicationRecord
  # Relations
  belongs_to :project
  has_many_attached :files do |attachable|
    attachable.variant :thumb, resize_to_limit: [100, 100]
  end

  # Validations
  validates :title, presence: true
end
