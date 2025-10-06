module ApplicationHelper
module Modal
  def render_modal(wrapper_options: {}, container_options: {}, inner_container_options: {}, &block)
    wrapper_options = {
      data: {
        controller: "modal",
        'modal-allow-background-close': true
      }
    }.deep_merge(wrapper_options)

    container_options = {
      data: {
        'modal-target': "container",
        'modal-allow-background-close': true,
        'action': "mousedown->modal#closeBackground keyup@window->modal#closeWithKeyboard"
      },
      class: "animate__animated animate__fadeIn fixed inset-0 overflow-y-auto flex items-center justify-center",
      style: "z-index: 9999; animation-duration: 300ms;"
    }.deep_merge(container_options)

    inner_container_options = {
      class: "max-h-screen w-full max-w-lg"
    }.deep_merge(inner_container_options).tap do |options|
      # The inner container must always be relative, no matter if we override the
      # default options. So we need to add it if it is not there yet.
      options[:class] += " relative" unless options[:class].include? "relative"
    end

    content_tag(:div, wrapper_options) do
      content_tag(:div, container_options) do
        content_tag(:div, inner_container_options) do
          output = <<-HTML
            <a class="cpy-close-modal absolute text-xl top-4 right-4 cursor-pointer text-md text-base-content" data-action="click->modal#close">
              <i class="fa fa-close"></i>
            </a>
            <div class="m-1 bg-base-200 rounded shadow-lg">
              <div class="p-5">
                #{capture(&block)}
              </div>
            </div>
          HTML
          output.html_safe
        end
      end
    end
  end
end
end
