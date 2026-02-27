module MultiSelectRspecHelper
  def select_from_multi_select(option_text:, label_for: nil, selector: nil)
    if selector
      within(selector) do
        find('.cpy-multi-select').click
        expect(page).to have_css('.cpy-multi-select-dropdown')
        find('.cpy-multi-select-option', text: option_text).click
      end
    else
      label = first("label[for=#{label_for}]")
      container = label.ancestor('fieldset, .fieldset, div')
      within(container) do
        find('.cpy-multi-select').click
        expect(page).to have_css('.cpy-multi-select-dropdown')
        find('.cpy-multi-select-option', text: option_text).click
      end
    end
  end
end

RSpec.configure do |config|
  config.include MultiSelectRspecHelper, type: :feature
end
