module SearchableSelectRspecHelper
  def select_from_searchable_select(option_text:, label_for: nil, selector: nil)
    scope = if selector
      selector
    else
      label = find("label[for=#{label_for}]", match: :first)
      label.ancestor('fieldset, .fieldset', match: :first)
    end

    # Click the trigger to open the dropdown
    within(scope) { find('.cpy-searchable-select').click }

    # Dropdown is portaled to document.body, so find from page root (escape any `within` scope)
    root = page.document
    expect(root).to have_css('.cpy-searchable-select-dropdown')
    dropdown = root.find('.cpy-searchable-select-dropdown')
    dropdown.find('.cpy-searchable-select-option', text: option_text).click

    # Close the dropdown if it's still open (multi-select stays open after selection)
    # Dispatch a synthetic mousedown event on body so the click-outside handler closes the dropdown
    # without physically clicking the drawer overlay (which would close the sidebar)
    if root.has_css?('.cpy-searchable-select-dropdown', wait: 0.2)
      page.execute_script("document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))")
      expect(root).to have_no_css('.cpy-searchable-select-dropdown')
    end
  end
end

RSpec.configure do |config|
  config.include SearchableSelectRspecHelper, type: :feature
end
