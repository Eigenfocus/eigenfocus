class Grouping < ApplicationRecord
  belongs_to :visualization

  validates :title, presence: true
end
