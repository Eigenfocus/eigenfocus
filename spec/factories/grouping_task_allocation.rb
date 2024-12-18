FactoryBot.define do
  factory :grouping_task_allocation do
    task
    grouping
    sequence(:position)
  end
end
