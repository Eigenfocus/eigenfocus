class User < ApplicationRecord
  # Relations
  has_many :time_entries
  has_many :running_time_entries, -> { running }, class_name: "TimeEntry"
  has_one :preferences, class_name: "User::Preferences"

  # Validations
  validates :locale,
    inclusion: { in:  I18n.available_locales.map(&:to_s) },
    if: -> { locale.present? }

  validates :timezone,
    inclusion: { in:  ActiveSupport::TimeZone.all.map(&:name) },
    if: -> { timezone.present? }


  def is_profile_complete?
    locale.present? and
    timezone.present?
  end

  def preferences
    super || build_preferences
  end
end
