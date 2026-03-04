module SearchableSelectRspecHelper
  def select_from_searchable_select(option_text:, label_for: nil, selector: nil)
    scope = if selector
      selector
    else
      label = find("label[for=#{label_for}]", match: :first)
      label.ancestor('fieldset', match: :first)
    end

    # Click the trigger to open the dropdown
    within(scope) { find('.cpy-searchable-select').click }

    # Dropdown is portaled to document.body, so find from page root
    expect(page).to have_css('.cpy-searchable-select-dropdown')
    dropdown = page.find('.cpy-searchable-select-dropdown')
    dropdown.find('.cpy-searchable-select-option', text: option_text).click

    # Close the dropdown by clicking outside if it's still open (multi-select stays open)
    if page.has_css?('.cpy-searchable-select-dropdown', wait: 0.2)
      page.find('body').click
      expect(page).to have_no_css('.cpy-searchable-select-dropdown')
    end
  end
end

RSpec.configure do |config|
  config.include SearchableSelectRspecHelper, type: :feature
end
