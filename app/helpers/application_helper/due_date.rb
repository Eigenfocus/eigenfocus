module ApplicationHelper
  module DueDate
    def due_date_for(issue)
      return unless issue.due_date?

      options = {
        class: due_date_color_class_for(issue).to_s + " text-xs issue--card-due-date #{issue.finished? ? 'finished' : ''}",
        data: {
          visualization__board__card_target: "dueDate"
        }
      }

      content_tag(:span, options) do
        I18n.l(issue.due_date, format: :short)
      end
    end

    private

    def due_date_color_class_for(issue)
      return unless issue.due_date?

      return "text-danger-500" if issue.due_date.before?(Date.tomorrow)
      return "text-warning-500" if issue.due_date.between?(Date.tomorrow, 3.days.from_now)
      ""
    end
  end
end
