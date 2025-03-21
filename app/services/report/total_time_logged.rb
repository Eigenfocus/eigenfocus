require "csv"

class Report::TotalTimeLogged
  attr_reader :time_entries
  attr_reader :total_time_hours

  def initialize(time_entries, total_time_hours)
    @time_entries = time_entries
    @total_time_hours = total_time_hours
  end

  def generate_csv
    @total_minutes = 0
    CSV.generate(col_sep: "\t") do |csv|
      csv << [
        "Total: ",
        "#{total_time_hours} #{t("hours")}",
        nil,
        nil,
        nil,
        nil
      ]
      csv << csv_header
      time_entries.each do |time_entry|
        csv << csv_row_for(time_entry)
      end
    end
  end

  private

  def csv_header
    [
      TimeEntry.human_attribute_name(:reference_date),
      Project.model_name.human,
      Issue.model_name.human,
      TimeEntry.human_attribute_name(:description),
      Issue.human_attribute_name(:labels),
      TimeEntry.human_attribute_name(:total_logged_time_in_minutes)
    ]
  end

  def csv_row_for(time_entry)
    [
      time_entry.reference_date.strftime("%Y-%m-%d"),
      time_entry.project.name,
      time_entry.issue&.title,
      time_entry.description.blank? ? "" : time_entry.description.gsub("\n", ";"),
      time_entry.issue&.labels&.map(&:title)&.join(" | "),
      time_entry.total_logged_time_in_minutes
    ]
  end

  def t(*args, &block)
    I18n.t(*args, &block)
  end
end
