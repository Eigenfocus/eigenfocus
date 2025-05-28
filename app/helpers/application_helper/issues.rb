module ApplicationHelper
  module Issues
    def badge_for_issue_id(issue)
      wrapper_options = {
        class: "popover",
        data: {
          controller: "copy popover",
          clipboard_text: project_item_url(issue.project, issue.id),
          action: "mouseover->popover#mouseOver mouseout->popover#mouseOut",
          popover_translate_x: "0",
          popover_translate_y: "-25%"
        }
      }

      content_tag(:span, wrapper_options) do
        concat content_tag(:span, "##{issue.id}", class: "text-sm cursor-pointer link-primary")
        concat(
          content_tag(:div, class: "content hidden top-0 left-full ml-2 text-nowrap", data: { popover_target: "content" }) do
            content_tag(:span, t("helpers.issues.badge_for_issue_id.click_to_copy_url"))
          end
        )
      end
    end
  end
end
