module ApplicationHelper
  module Labels
    def badge_for_issue_label(label, tag_options = {})
      options = {
        class: "inline-flex bg-background-100 border-background-400 text-readable-content-500 border border font-base",
        style: "font-size: 11px; border-radius: 4px; padding: 1px 4px;", # In the future we will have custom colors
        data: {
          "issue-label": label.id
        }
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
