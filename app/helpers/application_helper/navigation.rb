module ApplicationHelper
  module Navigation
    def main_nav_items
      [
        {
          text: t("menu_items.timesheet"),
          icon: icon_for(:time_entries),
          url: time_entries_path
        },
        {
          text: t("menu_items.total_time_report"),
          icon: icon_for(:report),
          url: total_time_reports_path
        }
      ]
    end

    def recent_nav_projects
      Project.active.order(name: :asc).limit(10)
    end
  end
end
