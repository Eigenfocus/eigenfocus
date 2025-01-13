class AppMetadata < ApplicationRecord
  before_create :assign_token

  def self.instance
    first_or_create
  end

  def current_version
    Gem::Version.new(File.read(Rails.root.join("VERSION")))
  end

  private def assign_token
    self.token = SecureRandom.uuid
  end
end
