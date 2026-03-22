module CallyHelpers
  def select_from_cally(selector, date)
    date_obj = date.is_a?(Date) ? date : Date.parse(date.to_s)
    iso_date = date_obj.strftime("%Y-%m-%d")

    # Click input to open popover
    find(selector).click

    # Set the value on the calendar-date web component and dispatch change event.
    # Cally uses shadow DOM so we interact via JS instead of Capybara selectors.
    page.execute_script <<~JS
      const el = document.querySelector('#{selector}');
      const wrapper = el.closest('[data-controller="cally-datepicker"]') || el.closest('.relative');
      const calendar = wrapper ? wrapper.querySelector('calendar-date') : document.querySelector('calendar-date');
      if (calendar) {
        calendar.value = '#{iso_date}';
        calendar.dispatchEvent(new Event('change', { bubbles: true }));
      }
    JS
  end
end

RSpec.configure do |config|
  config.include CallyHelpers, type: :feature
end
