FactoryBot.define do
  factory :issue_label do
    sequence(:title) { |n| "Label #{n}" }
  end
end
