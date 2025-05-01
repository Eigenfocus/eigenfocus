class Capybara::Session
  class ConfirmModalNotFound < StandardError; end

  def accept_alert
    yield

    if document.has_selector?("#confirm-modal-background")
      # Using pure JS to escape the scope `within` blocks
      document.evaluate_script('document.querySelector(".confirm-modal #confirm-accept").click()')
    else
      throw ConfirmModalNotFound.new("Unable to find confirm modal")
    end
  end

  alias_method :accept_confirm, :accept_alert
end
