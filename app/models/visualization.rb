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

  def move_grouping!(from:, to:)
    range = [ from, to ]
    starting_position = range.min
    ending_position = range.max
    number_of_elements_to_update = ending_position - starting_position + 1

    groupings_to_update = groupings.to_a[starting_position, number_of_elements_to_update]

    if from < to # First issue needs to go to the far right
      groupings_to_update.rotate!(1) # Shift left
    elsif to < from # Last issue needs to go to the far left
      groupings_to_update.rotate!(-1) # Shift right
    end

    ActiveRecord::Base.transaction do
      groupings_to_update.each_with_index do |grouping, index|
        new_position = index + starting_position
        grouping.update(position: new_position)
      end
    end
  end
end
