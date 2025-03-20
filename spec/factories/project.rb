# coding: utf-8

FactoryBot.define do
  factory :project do
    sequence :name do |i|
      "Project #{i}"
    end

    trait :archived do
      archived_at { Date.current }
    end

    time_tracking_enabled { true }

    transient do
      visualization_counts { 1 }
      with_issue_labels { [] }
    end

    after(:create) do |project, evaluator|
      create_list(:visualization, evaluator.visualization_counts, project: project)
      evaluator.with_issue_labels.each do |label|
        create(:issue_label, title: label, project:)
      end
    end
  end
end
