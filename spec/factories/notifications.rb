FactoryBot.define do
  factory :notification do
    title { "New Notification" }
    content { "Something awesome happen!" }
    published_at { DateTime.current }
  end
end
