class EigenfocusNewsFetcherJob < ApplicationJob
  def perform
    lastest_news = EigenfocusNewsFetcher.call(AppMetadata.instance)

    lastest_news.each do |news|
      next if Notification.exists?(external_id: news["id"])

      Notification.create!(
        title: news["title"],
        content: news["content"],
        announcement_modes: news["announcement_modes"],
        external_id: news["id"],
        published_at: news["published_at"]
      )
    end
  end
end
