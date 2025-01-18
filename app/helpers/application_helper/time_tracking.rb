module ApplicationHelper
module TimeTracking
  def convert_minutes_to_human_readable_hour(number_of_minutes)
    minutes = number_of_minutes % 60
    hours = (number_of_minutes - minutes)/60

    "#{sprintf '%02d', hours}:#{sprintf '%02d', minutes}"
  end
end
end
