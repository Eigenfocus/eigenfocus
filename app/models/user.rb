class User < ApplicationRecord
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
end
