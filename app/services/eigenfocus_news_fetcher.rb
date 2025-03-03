class EigenfocusNewsFetcher
  attr_reader :app_metadata

  def self.call(*args)
    new(*args).call
  end

  def initialize(app_metadata)
    @app_metadata = app_metadata
  end

  def call
    begin
      uri = URI("https://eigenfocus.com/api/v1/news?last_fetched_at=#{last_fetched_at.iso8601}")

      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = (uri.scheme == "https")

      request = Net::HTTP::Get.new(uri)
      request["App-Token"] = app_metadata.token
      request["App-Version"] = app_metadata.current_version.to_s

      response = http.request(request)
      response = JSON.parse(response.body)
      response
    rescue
      []
    end
  end

  private
  def last_fetched_at
    lastest_notification = Notification.order(published_at: :desc).first

    return lastest_notification.published_at if lastest_notification.present?
    Date.current.beginning_of_day
  end
end
