module ApplicationHelper
  module Issues
    def badge_for_issue_id(issue)
      wrapper_options = {
        class: "text-sm cursor-pointer link-primary",
        data: {
          controller: "copy",
          clipboard_text: project_item_url(issue.project, issue)
        }
      }

      content_tag(:span, wrapper_options) do
        concat content_tag(:span, "##{issue.id}")
      end
    end
  end
end
