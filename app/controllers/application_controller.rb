class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern


  # Helpers
  helper_method :skip_layout_content_wrapper?

  def skip_layout_content_wrapper!
    @skip_layout_content_wrapper = true
  end

  def skip_layout_content_wrapper?
    @skip_layout_content_wrapper
  end
end
