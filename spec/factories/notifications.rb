FactoryBot.define do
  factory :notification do
    title { "New Notification" }
    content { "Something awesome happen!" }
    published_at { DateTime.current }
    external_link { false }

    trait(:with_external_link) do
      external_link { true }
      external_id { "token" }
    end
  end
end
