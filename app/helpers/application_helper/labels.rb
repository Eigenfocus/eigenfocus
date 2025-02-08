module ApplicationHelper
  module Labels
    def badge_for_issue_label(label, tag_options = {})
      options = {
        class: "inline-flex rounded-full border-readable-content-400 text-readable-content-400 border border py-1 px-2 text-xs font-medium",
        style: "" # In the future we will have custom colors
      }.merge(tag_options)

      content_tag(:span, options) do
        label.title
      end
    end

    def labels_list_for(issue, tag_options = {})
      options = {
        class: "flex-wrap flex gap-1",
        data: {
          "issue-labels-list": true
        }
      }.merge(tag_options)

      content_tag(:div, options) do
        issue.labels.each { concat badge_for_issue_label(_1) }
      end
    end
  end
end
