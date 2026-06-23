FactoryBot.define do
  factory :issue_todo, class: "Issue::Todo" do
    association :todo_list, factory: :issue_todo_list
    sequence(:description) { |n| "Todo item #{n}" }

    trait :finished do
      finished_at { Time.current }
    end
  end
end
