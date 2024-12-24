class TimeEntriesController < ApplicationController
  def index
    @reference_date = params.fetch(:reference_date, Date.current).to_date

    time_entries_scoped = current_user.time_entries.scope

    @time_entries = time_entries_scoped.includes(:issue, :project)
      .order(reference_date: :desc)
      .by_date(@reference_date)
      .order("time_entries.created_at DESC").all

    @calendar_dates = (@reference_date.beginning_of_week)..(@reference_date.end_of_week)

    @total_logged_time_per_day = time_entries_scoped.by_date(@calendar_dates).
      group(:reference_date).sum(:total_logged_time_in_minutes)
  end

  def new
    @time_entry = current_user.time_entries.new(reference_date: params[:reference_date])
    render partial: "form", locals: { time_entry: @time_entry }
  end

  def form_projects_dependent_fields
    @time_entry = TimeEntry.new
    @time_entry.project = Project.find(params[:project_id]) if params[:project_id].present?
  end

  def create
    @time_entry = current_user.time_entries.new(time_entry_params)

    if @time_entry.save
      @time_entry.total_logged_time_in_minutes.zero? and @time_entry.start!
    end
  end

  def edit
    @time_entry = current_user.time_entries.find(params[:id])

    render partial: "form", locals: { time_entry: @time_entry }
  end

  def update
    @time_entry = current_user.time_entries.find(params[:id])

    if @updated = @time_entry.update(time_entry_params)
      @total_logged_time = current_user.time_entries.by_date(@time_entry.reference_date).sum(:total_logged_time_in_minutes)
    end
  end

  def start
    @time_entry = current_user.time_entries.find(params[:id])

    @time_entry.start!
  end

  def stop
    @time_entry = current_user.time_entries.find(params[:id])

    @time_entry.stop!
    @total_logged_time = current_user.time_entries.by_date(@time_entry.reference_date).sum(:total_logged_time_in_minutes)
  end

  def destroy
    @time_entry = current_user.time_entries.find(params[:id])
    if @time_entry.destroy
      @total_logged_time = current_user.time_entries.by_date(@time_entry.reference_date).sum(:total_logged_time_in_minutes)
    end
  end

  private

  def time_entry_params
    params.require(:time_entry).permit(:description, :total_logged_time_in_minutes, :reference_date, :project_id, :issue_id)
  end
end
