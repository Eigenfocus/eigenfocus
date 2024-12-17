# coding: utf-8

FactoryBot.define do
  factory :project do
    sequence :name do |i|
      "Project #{i}"
    end

    time_tracking_enabled { true }
  end
end
