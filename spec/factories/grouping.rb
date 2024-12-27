FactoryBot.define do
  factory :grouping do
    sequence(:title) { |n| "Grouping #{n}" }
    position { :last }
    visualization
  end
end
