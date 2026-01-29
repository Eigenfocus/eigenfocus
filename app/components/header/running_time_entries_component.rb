class Header::RunningTimeEntriesComponent < ViewComponent::Base
  attr_reader :count

  def initialize(count:)
    @count = count
  end

  def show_button?
    count > 0
  end

  def oldest_active_timesheet_day_path
    reference_date = helpers.current_user.running_time_entries.order(reference_date: :asc).pick(:reference_date)
    time_entries_path(reference_date: reference_date.strftime("%Y-%m-%d"))
  end
end
