class EigenfocusNotificationsFetcher
  attr_reader :client

  def self.call(*args)
    new(*args).call
  end

  def initialize(app_metadata)
    @client = SelfHostedApiClient.new(app_metadata)
  end

  def call
    begin
      client.get("/notifications?last_fetched_at=#{last_fetched_at.iso8601}")
    rescue
      []
    end
  end

  private
  def last_fetched_at
    lastest_notification = Notification.order(published_at: :desc).first

    return lastest_notification.published_at if lastest_notification.present?
    Date.today.beginning_of_day
  end
end
