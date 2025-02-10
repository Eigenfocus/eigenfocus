# coding: utf-8

FactoryBot.define do
  factory :issue_label_link do
    association(:issue)
    association(:issue_label)
  end
end
