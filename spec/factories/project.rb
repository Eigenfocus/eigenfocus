# coding: utf-8

FactoryBot.define do
  factory :project do
    sequence :name do |i|
      "Project #{i}"
    end

    time_tracking_enabled { true }

    transient do
      visualization_counts { 1 }
    end

    after(:create) do |project, evaluator|
      create_list(:visualization, evaluator.visualization_counts, project: project)
    end
  end
end
