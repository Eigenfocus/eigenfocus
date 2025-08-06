class User < ApplicationRecord
  # Relations
  has_many :time_entries
  has_one :preferences, class_name: "User::Preferences"

  # Validations
  VALID_THEME_KEYS = TailwindTheme.all.map { |t| t.key }

  validates :favorite_theme_key,
    inclusion: { in:  VALID_THEME_KEYS },
    if: -> { favorite_theme_key.present? }

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

  def favorite_theme_key
    # Default theme is a business rule that can
    # change depending on future user conditions
    # so we keep it here on the user model
    saved_theme_key = super
    saved_theme_key.blank? ? "amethyst-moon" : saved_theme_key
  end

  def preferences
    super || build_preferences
  end
end
