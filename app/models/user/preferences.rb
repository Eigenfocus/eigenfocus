class User::Preferences < ApplicationRecord
  # Associations
  belongs_to :user

  # Validations
  VALID_THEME_KEYS = TailwindTheme.all.map { |t| t.key }

  validates :time_entry_time_format, inclusion: { in: %w[minutes hours] }
  validates :favorite_theme_key,
    inclusion: { in:  VALID_THEME_KEYS },
    if: -> { favorite_theme_key.present? }
end
