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
      issue_counts { 0 }
      visualization_counts { 1 }
      with_issue_labels { [] }
    end

    after(:create) do |project, evaluator|
      create_list(:visualization, evaluator.visualization_counts, project: project)

      evaluator.with_issue_labels.each do |label|
        create(:issue_label, title: label, project:)
      end

      create_list(:issue, evaluator.issue_counts, project: project)
    end
  end
end
