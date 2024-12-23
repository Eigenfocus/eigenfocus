class Visualization < ApplicationRecord
  self.inheritance_column = "_type"

  VALID_TYPES = [ "board" ]

  belongs_to :project
  has_many :groupings, -> { order(position: :asc) }

  validates :type, inclusion: { in: VALID_TYPES }

  def create_grouping(params)
    available_position = groupings.count

    groupings.create(params.merge(position: available_position))
  end
end
