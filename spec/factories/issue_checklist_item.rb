FactoryBot.define do
  factory :issue_checklist_item, class: "Issue::ChecklistItem" do
    association :checklist, factory: :issue_checklist
    sequence(:description) { |n| "Checklist item #{n}" }

    trait :finished do
      finished_at { Time.current }
    end
  end
end
