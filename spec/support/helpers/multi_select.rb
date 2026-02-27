module MultiSelectRspecHelper
  def select_from_multi_select(option_text:, selector:)
    within(selector) do
      find('.cpy-multi-select').click
      expect(page).to have_css('.cpy-multi-select-dropdown')
      find('.cpy-multi-select-option', text: option_text).click
    end
  end
end

RSpec.configure do |config|
  config.include MultiSelectRspecHelper, type: :feature
end
