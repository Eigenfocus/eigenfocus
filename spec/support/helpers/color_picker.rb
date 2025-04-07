module ColorPickerRspecHelper
  def fill_color_in(selector, with:)
    color_picker_component = get_color_picker_component(selector)
    color_picker_input = color_picker_component.find("input#clr-color-value")

    # Clear input
    color_picker_input.fill_in(with: "")
    color_picker_input.fill_in(with:)

    # Click on component, to force unfocus
    color_picker_component.click
  end

  private
  def get_color_picker_component(selector)
    if selector.is_a? Symbol
      find("##{selector}", visible: false).sibling("#clr-picker")
    else
      find(selector).sibling("#clr-picker")
    end
  end
end

RSpec.configure do |config|
  config.include ColorPickerRspecHelper, type: :feature
end
