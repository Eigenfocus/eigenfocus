module ApplicationHelper
  module AppTour
    def activate_tour_tag(tour_key)
      javascript_tag <<~JS
        document.addEventListener("turbo:load", () => {
          window.appTour.start("#{tour_key}");
        }, { once: true });
      JS
    end

    def show_app_tour_for(tour_key = nil)
      javascript_tag <<~JS
        document.addEventListener("turbo:load", () => {
          if (window.appTour) {
            window.appTour.startIfPending("#{tour_key}");
          }
        }, { once: true });
      JS
    end
  end

  def mark_app_tours_as_pending
    javascript_tag <<~JS
      document.addEventListener("turbo:load", () => {
        if (window.appTour) {
          window.appTour.markAllToursAsPending();
        }
      }, { once: true });
    JS
  end
end
