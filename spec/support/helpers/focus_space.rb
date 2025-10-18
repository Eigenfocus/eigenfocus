module EigenfocusHelpers
  def open_focus_space
    disable_welcome_screen!
    find(".cpy-open-space-button.open").click
  end

  def close_focus_space
    find(".cpy-open-space-button.close").click
  end

  def disable_welcome_screen!
    page.evaluate_script <<-JS
      document.querySelector(".cpy-welcome-screen").style.pointerEvents = "none";
    JS
  end
end

RSpec.configure do |config|
  config.include EigenfocusHelpers, type: :feature
end
