module ApplicationHelper
  module DueDate
    def due_date_for(issue)
      return unless issue.due_date?

      options = {
        class: due_date_color_class_for(issue) + " text-xs"
      }

      content_tag(:span, options) do
        I18n.l(issue.due_date, format: :short)
      end
    end

    private

    def due_date_color_class_for(issue)
      return unless issue.due_date?

      case issue.due_date
      when 1.day.from_now..3.days.from_now
        "text-alert-500"
      when Date.new..1.day.from_now
        "text-danger-500"
      end
    end
  end
end
