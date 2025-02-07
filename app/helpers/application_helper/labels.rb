module ApplicationHelper
  module Labels
    def badge_for_label(label)
      options = {
        class: "inline-flex rounded-full border-readable-content-400 text-readable-content-400 border border py-1 px-2 text-xs font-medium",
        style: "",
        "data": {
          "issue-label": true
        }
      }

      content_tag(:span, options) do
        label.title
      end
    end
  end
end
