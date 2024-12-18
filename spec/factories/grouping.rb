FactoryBot.define do
  factory :grouping do
    sequence(:title) { |n| "Grouping #{n}" }
  end
end
