module ApplicationHelper
  module Issues
    def global_issue_link(issue)
      wrapper_options = {
        class: "popover cpy-global-issue-link",
        data: {
          controller: "copy animation issue--global-link",
          clipboard_text: project_item_url(issue.project, issue.id),
          action: "copy:success->issue--global-link#onCopy copy:success->animation#pulse mouseover->issue--global-link#mouseOver mouseout->issue--global-link#mouseOut",
          issue__global_link_initial_text_value: t("helpers.issues.global_issue_link.click_to_copy_url"),
          issue__global_link_on_copy_text_value: t("helpers.issues.global_issue_link.copied"),
          animation_speed_value: "fast"
        }
      }

      content_tag(:span, wrapper_options) do
        concat content_tag(:span, "##{issue.id}", class: "inline-block text-sm cursor-pointer link-primary js-animation-target-#{issue.id}", data: { animation_target: "animatable" })
        concat(
          content_tag(:div, nil, class: "popover__content opacity-0 top-1/2 left-full -translate-y-1/2 ml-2 text-nowrap", data: { issue__global_link_target: "content" })
        )
      end
    end
  end
end
