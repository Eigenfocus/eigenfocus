module ApplicationHelper
  module Labels
    def badge_for_label(label)
      options = {
        class: "inline-flex rounded-full border-#{color_for_label(label)} text-#{color_for_label(label)} border py-1 px-2 text-xs font-medium"
      }

      content_tag(:span, options) do
        label.title
      end
    end

    def color_for_label(label)
    end
  end
end
