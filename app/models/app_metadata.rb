class AppMetadata < ApplicationRecord
  # Hooks
  before_create :assign_fields
  before_save :set_survey_token

  def self.instance
    first_or_create
  end

  def current_version
    Gem::Version.new(File.read(Rails.root.join("VERSION")))
  end

  def last_released_version
    begin
      Gem::Version.new(super)
    rescue
      current_version
    end
  end

  def is_app_outdated?
    last_released_version > current_version
  end

  def touch_usage!
    self.last_used_at = DateTime.current
    save
  end

  private def assign_fields
    self.token = SecureRandom.uuid
    self.last_released_version = current_version
  end

  private def set_survey_token
    self.survey_token ||= SecureRandom.uuid
  end
end
