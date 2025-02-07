module ApplicationHelper
  module CustomPagy
    def pagy_summary(pagy)
      content_tag(:div, class: "pagy-summary") do
        pagy_info(@pagy).html_safe + pagy_nav(@pagy).html_safe
      end
    end
  end
end
