module ApplicationHelper
  module AppTour
    def start_app_tour_command(tour_key = nil)
      javascript_tag(<<~JS)
        if (window.appTour) {
          window.appTour.start("#{tour_key}");
        }
      JS
    end
  end
end
