FactoryBot.define do
  factory :task do
    sequence(:title) { |n| "My task #{n}" }
    sequence(:description) { |n| "Task #{n} description" }
  end
end
