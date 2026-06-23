FactoryBot.define do
  factory :issue_todo_list, class: "Issue::TodoList" do
    association :issue
    sequence(:title) { |n| "Todo list #{n}" }
  end
end
