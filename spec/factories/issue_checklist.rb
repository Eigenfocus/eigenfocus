FactoryBot.define do
  factory :issue_checklist, class: "Issue::Checklist" do
    association :issue
    sequence(:title) { |n| "Checklist #{n}" }
  end
end
