FactoryBot.define do
  factory :issue do
    sequence(:title) { |n| "My issue #{n}" }
    sequence(:description) { |n| "Issue #{n} description" }
  end
end
