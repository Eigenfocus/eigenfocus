module ApplicationHelper
module Alerts
  def new_turbo_stream_alert_message(type, message)
    turbo_stream.append "alert-messages", partial: "layouts/alert",
      locals: {
        type: type,
        message: message
      }
  end
end
end
