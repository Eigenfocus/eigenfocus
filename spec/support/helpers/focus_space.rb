module DomIdRspecHelper
  def open_focus_space
    find(".open-space-button.open").click
  end

  def close_focus_space
    find(".open-space-button.close").click
  end
end

RSpec.configure do |config|
  config.include DomIdRspecHelper, type: :feature
end
