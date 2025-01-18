module ApplicationHelper
module Alerts  
  def new_turbo_stream_alert_message(type, message)
    turbo_stream.append "alert-messages", partial: "layouts/alert",
      locals: {
        type: type,
        message: message
      }
  end

  def t_flash_message(resource, flash_type: nil)
    flash_type ||= :notice
    t("flash.actions.#{action_name}.#{flash_type}", resource_name: resource.model_name.human)
  end
end
end