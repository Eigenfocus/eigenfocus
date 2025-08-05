class User::Preferences < ApplicationRecord
  belongs_to :user

  validates :time_entry_time_format, inclusion: { in: %w[minutes hours] }
end
