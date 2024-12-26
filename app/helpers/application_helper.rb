module ApplicationHelper
  def current_theme_key
    Current.theme_key
  end

  def current_theme_stylesheet_link_tag(**kwargs)
    stylesheet_link_tag "#{current_theme_key}.theme", **kwargs
  end

  def new_turbo_stream_alert_message(type, message)
    turbo_stream.append "alert-messages", partial: "layouts/alert",
      locals: {
        type: type,
        message: message
      }
  end

  def render_modal(options = {}, container_options = {}, &block)
    options = {
      data: {
        controller: "modal",
        'modal-allow-background-close': true
      }
    }.deep_merge(options)

    container_options = {
      data: {
        'modal-target': "container",
        'modal-allow-background-close': true,
        'action': "click->modal#closeBackground keyup@window->modal#closeWithKeyboard"
      },
      class: "animate__animated animate__fadeIn fixed inset-0 overflow-y-auto flex items-center justify-center",
      style: "z-index: 9999; animation-duration: 200ms;"
    }.deep_merge(container_options)

    content_tag(:div, options) do
      content_tag(:div, container_options) do
        output = %Q(
          <!-- Modal Container -->
            <!-- Modal Inner Container -->
            <div class="max-h-screen w-full max-w-lg relative">
              <a class="absolute text-xl top-4 right-4 cursor-pointer text-md text-readable-content-500" data-action="click->modal#close">
                <i class="fa fa-close"></i>
              </a>
              <div class="m-1 bg-body-contrast rounded shadow">
                <div class="p-5">
            )
              output += capture(&block)
              output += %Q(
                </div>
              </div>
            </div>

        )
        output.html_safe
      end
    end
  end


  def icon_for(name)
    icon_classes = case name.to_sym
    when :time_entries
      "fa-solid fa-clock"
    when :project_issues
      "fa-solid fa-list-check"
    when :groupings
      "fa-solid fa-table-columns"
    when :issues
      "fa-solid fa-rectangle-list"
    when :projects
      "fa-solid fa-folder-closed"
    when :user
      "fa-solid fa-user"
    when :report
      "fa-solid fa-gauge"
    when :theme
      "fa-solid fa-palette"
    else
      raise "Icon class not defined for name #{name}"
    end

    %Q(
      <i class="#{icon_classes}"></i>
    ).html_safe
  end

  def t_flash_message(resource, flash_type: nil)
    flash_type ||= :notice
    t("flash.actions.#{action_name}.#{flash_type}", resource_name: resource.model_name.human)
  end

  def convert_minutes_to_human_readable_hour(number_of_minutes)
    minutes = number_of_minutes % 60
    hours = (number_of_minutes - minutes)/60

    "#{sprintf '%02d', hours}:#{sprintf '%02d', minutes}"
  end
end
