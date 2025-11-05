module ApplicationHelper
  module CustomPagy
    def pagy_summary(pagy)
      content_tag(:div, class: "pagy-summary") do
        pagy.info_tag.html_safe + pagy.series_nav.html_safe
      end
    end
  end
end
