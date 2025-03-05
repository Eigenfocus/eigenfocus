class EigenfocusNotificationsFetcherJob < ApplicationJob
  def perform
    lastest_news = EigenfocusNotificationsFetcher.call(AppMetadata.instance)

    lastest_news.each do |news|
      notification = Notification.find_or_initialize_by(external_id: news["id"])

      notification.update!(
        title: news["title"],
        content: news["content"],
        announcement_modes: news["announcement_modes"],
        external_id: news["id"],
        external_link: !!news["external_link"],
        published_at: news["published_at"]
      )
    end
  end
end
