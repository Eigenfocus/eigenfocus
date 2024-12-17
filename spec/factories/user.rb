# coding: utf-8

FactoryBot.define do
  factory :user do
    timezone { 'Lisbon' }
    locale { 'en' }
  end
end
