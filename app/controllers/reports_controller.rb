class ReportsController < ApplicationController
  def total_time
    if params[:report]
      @time_entries = TimeEntry.includes(:project, :issue)
                      .order(reference_date: :asc)

      if params[:report][:start_at].present?
        @time_entries = @time_entries.where("reference_date >= ?", params[:report][:start_at].to_date)
      end

      if params[:report][:end_at].present?
        @time_entries = @time_entries.where("reference_date <= ?", params[:report][:end_at].to_date)
      end

      if params[:report][:issue_labels].present?
        @time_entries = @time_entries.by_issue_labels_title(params[:report][:issue_labels])
      end

      project_ids = (params[:report][:project_ids] || []).reject(&:blank?)

      if project_ids.any?
        @time_entries = @time_entries.where(project_id: project_ids)
      end

      @total_in_hours = (@time_entries.sum(:total_logged_time_in_minutes)/60.0).round(2)
    else
      params[:report] = {}
    end
  end
end
