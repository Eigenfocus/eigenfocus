FactoryBot.define do
  factory :grouping do
    sequence(:title) { |n| "Grouping #{n}" }
    sequence(:position)
    visualization
  end
end
