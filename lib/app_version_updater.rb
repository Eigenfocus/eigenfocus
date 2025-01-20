require "net/http"
require "uri"

class AppVersionUpdater
  attr_reader :app_metadata

  def initialize(app_metadata)
    @app_metadata = app_metadata
  end

  def should_fetch_newest_release?
    return false if Rails.env.development?
    return false if Rails.env.test?
    last_release_check_expired?
  end

  def last_release_check_expired?
    app_metadata.last_released_version_checked_at.nil? ||
    app_metadata.last_released_version_checked_at.before?(1.day.ago)
  end

  def update_newest_release_metadata!
    newest_version = fetch_newest_version
    unless newest_version.blank?
      app_metadata.last_released_version = newest_version
      app_metadata.last_released_version_checked_at = DateTime.current
      app_metadata.save
    end
  end

  private def fetch_newest_version
    return if Rails.env.development?
    begin
      uri = URI("https://eigenfocus.com/api/v1/app_versions/latest")

      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = (uri.scheme == "https")

      request = Net::HTTP::Get.new(uri)
      request["App-Token"] = app_metadata.token
      request["App-Version"] = app_metadata.current_version.to_s

      response = http.request(request)
      response = JSON.parse(response.body)
      response["latest_version"]
    rescue
      ""
    end
  end
end
