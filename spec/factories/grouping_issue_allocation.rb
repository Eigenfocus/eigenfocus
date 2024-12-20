FactoryBot.define do
  factory :grouping_issue_allocation do
    issue
    grouping
    sequence(:position)
  end
end
