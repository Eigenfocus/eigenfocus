FactoryBot.define do
  factory :issue_comment, class: "Issue::Comment" do
    association :issue
    content { "Test comment content" }
    association :author, factory: :user
  end
end
