module TimeEntriesHelper
  def turbo_stream_update_daily_time(reference_date, new_logged_time)
    turbo_stream_tag = <<-HTML
      <turbo-stream action="update" targets='[data-reference-date="#{reference_date.strftime("%Y-%m-%d")}"] .turbo-stream-logged-time-text'>
        <template>
          #{convert_minutes_to_human_readable_hour(@total_logged_time)}
        </template>
      </turbo-stream>
    HTML

    turbo_stream_tag.html_safe
  end

  def turbo_stream_update_running_time_entries_button
    running_count = current_user.time_entries.running.count
    turbo_stream.update(
      "running_time_entries_button",
      partial: "layouts/running_time_entries_button",
      locals: { count: running_count }
    )
  end

  def format_datetime_to_momentjs(datetime)
    datetime.strftime("%Y-%m-%dT%H:%M:%S%:z")
  end
end
