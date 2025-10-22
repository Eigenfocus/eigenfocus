module ApplicationHelper
module Icons
  def icon_for(name)
    icon_classes = case name.to_sym
    when :time_entries
      "ti ti-clock"
    when :groupings
      "fa-solid fa-table-columns"
    when :boards
      "fa-solid fa-chart-simple rotate-180"
    when :issues
      "fa-solid fa-list-ul"
    when :comments
      "fa-solid fa-comment"
    when :files
      "fa-solid fa-file"
    when :projects
      "ti ti-folder"
    when :user
      "fa-solid fa-user"
    when :report
      "ti ti-chart-bar-popular"
    when :issue_labels
      "ti ti-tags"
    when :theme
      "ti ti-palette"
    when :archived
      "fa-solid fa-box-archive"
    when :finished
      "fa-solid fa-check"
    when :close
      "ti ti-x"
    when :focus_space
      "ti ti-layout-dashboard"
    else
      raise "Icon class not defined for name #{name}"
    end

    %Q(
      <i class="#{icon_classes}"></i>
    ).html_safe
  end
end
end
