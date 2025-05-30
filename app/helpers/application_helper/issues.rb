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

    def issue_finish_check(issue, wrapper_class: "", checkbox_class: "", icon_class: "", insert_after: false, &block)
      wrapper_options = {
        class: wrapper_class,
        data: {
          controller: "issue--finish-check",
          issue__finish_check_finish_path_value: finish_issue_path(issue),
          issue__finish_check_unfinish_path_value: unfinish_issue_path(issue)
        }
      }

      checkbox_options = {
        class: "issue--finish-check group/check cpy-finish-check-toogle #{checkbox_class}",
        data: {
          controller: "animation",
          action: "click->issue--finish-check#toogle:prevent issue--finish-check:checked->animation#zoomIn issue--finish-check:unchecked->animation#zoomOut",
          animation_speed_value: "faster"
        }
      }

      content_tag(:div, wrapper_options) do
        concat(capture(&block)) if insert_after

        concat(
          content_tag(:input, nil, type: "checkbox", class: "peer sr-only hidden", checked: issue.finished?, data: { issue__finish_check_target: "checkbox" })
        )
        concat(
          content_tag(:div, checkbox_options) do
            content_tag(:i, nil, class: "fa fa-check opacity-0 peer-checked:group-[]/check:opacity-100 #{icon_class}", data: { animation_target: "animatable" })
          end
        )

        concat(capture(&block)) unless insert_after
      end
    end
  end
end
