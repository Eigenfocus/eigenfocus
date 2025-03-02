module ApplicationHelper
  module AppTour
    def show_app_tour_for(tour_key = nil)
      javascript_tag <<~JS
        document.addEventListener("turbo:load", () => {
          if (window.appTour) {
            window.appTour.start("#{tour_key}");
          }
        }, { once: true });
      JS
    end
  end
end
