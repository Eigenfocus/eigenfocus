module FlatpicrHelpers
  def select_flatpickr_day(selector, day)
    page.execute_script "$('#{selector}').trigger('focus')"

    within '.flatpickr-days' do
      find(".flatpickr-day", text: day).click
    end
  end
end

RSpec.configure do |config|
  config.include FlatpicrHelpers, type: :feature
end
