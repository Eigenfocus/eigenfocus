class AppMetadata < ApplicationRecord
  # Hooks
  before_create :assign_fields

  def self.instance
    first_or_create
  end

  def current_version
    Gem::Version.new(File.read(Rails.root.join("VERSION")))
  end

  def last_released_version
    Gem::Version.new(super)
  end

  def is_app_outdated?
    last_released_version > current_version
  end

  private def assign_fields
    self.token = SecureRandom.uuid
    self.last_released_version = current_version
    self.last_released_version_updated_at = DateTime.current
  end
end
