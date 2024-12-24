
FactoryBot.define do
  factory(:time_entry) do
    user
    project

    reference_date { Date.current }

    sequence :description do |i|
      "time entry description #{i}"
    end

    started_at { nil }
    total_logged_time_in_minutes { 0 }
  end
end
