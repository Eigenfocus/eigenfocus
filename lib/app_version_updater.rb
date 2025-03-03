require "net/http"
require "uri"

class AppVersionUpdater
  attr_reader :app_metadata

  def initialize(app_metadata)
    @app_metadata = app_metadata
  end

  def update_newest_release_metadata!
    # Even if the fetch fails, we set this
    # in order to try again after the date period expires
    app_metadata.update(last_released_version_checked_at: DateTime.current)

    newest_version = fetch_newest_version

    unless newest_version.blank?
      app_metadata.update(last_released_version: newest_version)
    end
  end

  private def fetch_newest_version
    client = SelfHostedApiClient.new(app_metadata)
    response = client.get("/app_versions/latest")
    response&.fetch("latest_version", "")
  end
end
