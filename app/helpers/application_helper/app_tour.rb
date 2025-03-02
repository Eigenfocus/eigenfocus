module ApplicationHelper
  module AppTour
    def app_tour_tags
      capture do
        output = ""
        output += start_app_tour_tag(params[:activate_tour]) if params[:activate_tour].present?
        output += mark_all_app_tours_as_pending_tag if params[:mark_app_tours_as_pending] == "true"
        output.html_safe
      end
    end

    def start_pending_app_tour_tag(tour_key = nil)
      javascript_tag <<~JS
        document.addEventListener("turbo:load", () => {
          if (window.appTour) {
            window.appTour.startIfPending("#{tour_key}");
          }
        }, { once: true });
      JS
    end

    def start_app_tour_tag(tour_key)
      javascript_tag <<~JS
        document.addEventListener("turbo:load", () => {
          window.appTour.start("#{tour_key}");
        }, { once: true });
      JS
    end

    def mark_all_app_tours_as_pending_tag
      javascript_tag <<~JS
        document.addEventListener("turbo:load", () => {
          if (window.appTour) {
            window.appTour.markAllToursAsPending();
          }
        }, { once: true });
      JS
    end
  end
end
