module CallyHelpers
  def select_from_cally(selector, date)
    date_obj = date.is_a?(Date) ? date : Date.parse(date.to_s)
    iso_date = date_obj.strftime("%Y-%m-%d")

    # Click input to open the calendar dropdown
    find(selector).click

    # Navigate the calendar to the correct month/year and click the day.
    # Cally renders inside shadow DOM so we use JS to interact with it.
    page.execute_script <<~JS
      const input = document.querySelector('#{selector}');
      const wrapper = input.closest('[data-controller="cally-datepicker"]') || input.closest('.relative');
      const calendar = wrapper ? wrapper.querySelector('calendar-date') : document.querySelector('calendar-date');

      if (calendar) {
        // Navigate to the correct month by setting focusedDate
        calendar.focusedDate = '#{iso_date}';

        // Wait a tick for re-render then click the day button
        requestAnimationFrame(() => {
          const month = calendar.querySelector('calendar-month');
          if (month && month.shadowRoot) {
            const dayButton = month.shadowRoot.querySelector('button[part~="day"][value="#{iso_date}"]');
            if (dayButton) {
              dayButton.click();
              return;
            }
          }

          // Fallback: set value directly and dispatch change
          calendar.value = '#{iso_date}';
          calendar.dispatchEvent(new Event('change', { bubbles: true }));
        });
      }
    JS

    # Wait for the calendar to close and any requests to complete
    sleep 0.3
  end
end

RSpec.configure do |config|
  config.include CallyHelpers, type: :feature
end
