module ApplicationHelper
  module Labels
    def badge_for_issue_label(label, label_tag_options = {})
      custom_styles = if label.hex_color.present?
        "--label-bg: #{label.hex_color}; --label-text-color: #{get_label_text_color(label)}"
      else
        ""
      end

      options = {
        class: "issue-label",
        style: custom_styles,
        data: {
          "issue-label": label.id
        }
      }.merge(label_tag_options)

      content_tag(:span, options) do
        concat content_tag(:span, label.title, class: "label-text")
      end
    end

    def labels_list_for(issue, list_tag_options = {}, label_tag_options = {})
      options = {
        class: "flex-wrap flex gap-1 hide-if-empty",
        data: {
          "issue-labels-list": true
        }
      }.merge(list_tag_options)

      content_tag(:div, options) do
        issue.labels.each { concat badge_for_issue_label(_1, label_tag_options) }
      end
    end

    def get_label_text_color(label)
      r = label.hex_color[1..2].to_i(16)
      g = label.hex_color[3..4].to_i(16)
      b = label.hex_color[5..6].to_i(16)
      luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      luminance > 0.5 ? "#000" : "#fff"
    end
  end
end
