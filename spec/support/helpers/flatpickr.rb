module FlatpicrHelpers
  def select_from_flatpickr(selector, date)
    page.execute_script "$('#{selector}').trigger('focus')"

    date_obj = date.is_a?(Date) ? date : Date.parse(date.to_s)

    find('.flatpickr-year-select-wrapper select').select(date_obj.year.to_s)

    find('select.flatpickr-monthDropdown-months').select(date_obj.strftime('%B'))

    find(".flatpickr-day", text: date_obj.day.to_s).click
  end
end

RSpec.configure do |config|
  config.include FlatpicrHelpers, type: :feature
end
