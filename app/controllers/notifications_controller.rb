class NotificationsController < ApplicationController
  def mark_as_read
    @notification = Notification.find(params[:id])
    @notification.mark_as_read!
  end

  def mark_all_as_read
    Notification.unread.update_all(read_at: Time.current)
  end
end
