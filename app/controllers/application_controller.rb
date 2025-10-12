class ApplicationController < ActionController::Base
  include Pagy::Backend

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Helpers
  helper_method :current_user
  helper_method :skip_layout_content_wrapper?
  helper_method :t_flash_message

  # Hooks
  before_action :ensure_user_profile_is_complete
  before_action :update_app_metadata_daily_usage
  around_action :switch_locale
  around_action :switch_time_zone

  def switch_locale(&action)
    locale = current_user&.locale
    locale = I18n.default_locale if locale.blank?
    response.set_header "Content-Language", locale
    @pagy_locale = locale
    I18n.with_locale locale, &action
  end

  def switch_time_zone(&block)
    timezone_to_use = if current_user&.timezone.present?
      current_user.timezone
    else
      (I18n.locale == :"pt-BR") ? "Brasilia" : "Central Time (US & Canada)"
    end
    Time.use_zone(timezone_to_use, &block)
  end

  def ensure_user_profile_is_complete
    unless current_user.is_profile_complete?
      redirect_to edit_profile_path
    end
  end

  def update_app_metadata_daily_usage
    AppMetadata.instance.touch_usage!
  end

  def current_user
    @current_user ||= Current.user
  end

  def skip_layout_content_wrapper!
    @skip_layout_content_wrapper = true
  end

  def skip_layout_content_wrapper?
    @skip_layout_content_wrapper
  end

  def t_flash_message(resource, flash_type: nil)
    flash_type ||= :notice
    t("flash.actions.#{action_name}.#{flash_type}", resource_name: resource.model_name.human)
  end

  def turbo_frame_request?
    request.headers["Turbo-Frame"]
  end

  def render_turbo_alert_message(type, message)
    render turbo_stream: turbo_stream.append(
      "alert-messages",
      partial: "layouts/alert",
      locals: {
        type: type,
        message: message
      }
    )
  end
end
