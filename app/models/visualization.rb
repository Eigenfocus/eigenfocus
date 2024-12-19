class Visualization < ApplicationRecord
  self.inheritance_column = "_type"

  VALID_TYPES = [ "board" ]

  belongs_to :project

  validates :type, inclusion: { in: VALID_TYPES }
end
