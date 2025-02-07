# coding: utf-8

FactoryBot.define do
  factory :issue_label do
    sequence(:title) { |i| "Label #{i}" }
  end
end
