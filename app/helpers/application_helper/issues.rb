module ApplicationHelper
  module Issues
    def badge_for_issue_id(issue)
      wrapper_options = {
        class: "popover",
        data: {
          controller: "copy popover replace animation",
          clipboard_text: project_item_url(issue.project, issue.id),
          action: "copy:success->replace#innerText copy:success->animation#pulse mouseover->popover#mouseOver mouseout->popover#mouseOut",
          replace_value_param: t("helpers.issues.badge_for_issue_id.copied"),
          replace_reset_timeout_param: 1000,
          popover_translate_x: "0",
          popover_translate_y: "-50%",
          animation_target_param: ".js-animation-target-#{issue.id}",
          animation_speed_value: "fast"
        }
      }

      content_tag(:span, wrapper_options) do
        concat content_tag(:span, "##{issue.id}", class: "inline-block text-sm cursor-pointer link-primary js-animation-target-#{issue.id}")
        concat(
          content_tag(:div, class: "popover__content hidden top-1/2 left-full ml-2 text-nowrap", data: { popover_target: "content" }) do
            content_tag(:span, t("helpers.issues.badge_for_issue_id.click_to_copy_url"), data: { replace_target: "content" })
          end
        )
      end
    end
  end
end
