module ApplicationHelper
  module Labels
    def badge_for_issue_label(label, label_tag_options = {})
      options = {
        class: "issue-label",
        style: "", # In the future we will have custom colors
        data: {
          "issue-label": label.id
        }
      }.merge(label_tag_options)

      content_tag(:span, options) do
        label.title
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
  end
end
