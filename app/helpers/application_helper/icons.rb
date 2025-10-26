module ApplicationHelper
module Icons
  def icon_for(name)
    icon_classes = case name.to_sym
    when :time_entries
      "ti ti-clock"
    when :boards
      "ti ti-layout-kanban"
    when :issues
      "ti ti-list"
    when :comments
      "ti ti-message-circle"
    when :files
      "ti ti-file"
    when :projects
      "ti ti-folder"
    when :user
      "ti ti-user"
    when :report
      "ti ti-chart-bar-popular"
    when :issue_labels
      "ti ti-tags"
    when :theme
      "ti ti-palette"
    when :archived
      "ti ti-archive"
    when :finished
      "ti ti-check"
    when :close
      "ti ti-x"
    when :focus_space
      "ti ti-layout-dashboard"
    when :preview
      "ti ti-eye"
    when :edit
      "ti ti-pencil"
    when :remove
      "ti ti-trash"
    when :menu_arrow_down
      "ti ti-chevron-down"
    else
      raise "Icon class not defined for name #{name}"
    end

    %Q(
      <i class="#{icon_classes}"></i>
    ).html_safe
  end
end
end
