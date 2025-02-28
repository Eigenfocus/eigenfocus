class NewVersionCheckJob < ApplicationJob
  def perform
    AppVersionUpdater.new(AppMetadata.instance)
      .update_newest_release_metadata!
  end
end
