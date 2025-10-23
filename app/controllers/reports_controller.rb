class ReportsController < ApplicationController
  include CsvDownloadable

  def total_time
    @q = TimeEntry.ransack(params[:q])

    if params[:q].present?
      @time_entries = @q.result
                      .includes(:project, :issue)
                    .order(reference_date: :asc)
      @total_in_hours = (@time_entries.sum(:total_logged_time_in_minutes)/60.0).round(2)
    else
      @time_entries = TimeEntry.none
      @total_in_hours = 0
    end

    set_layout_with_header_width!

    respond_to do |format|
      format.html
      format.csv do
        report = TotalTimeLoggedCsvReport.new(@time_entries, @total_in_hours)
        send_csv_response(report.generate_csv, "total-time")
      end
    end
  end
end
