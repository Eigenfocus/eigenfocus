class Visualization < ApplicationRecord
  self.inheritance_column = "_type"

  VALID_TYPES = [ "board" ]

  # Associations
  belongs_to :project
  has_many :groupings, -> { order(position: :asc) }

  # Validations
  validates :type, inclusion: { in: VALID_TYPES }
end
