class Capybara::Session
  class ConfirmModalNotFound < StandardError; end

  def accept_alert
    yield

    # We use document here to avoid problem with method been called inside
    # a `within` scope
    if document.has_selector?("#confirm-modal-background")
      document.click_button("confirm-accept")
    else
      throw ConfirmModalNotFound.new("Unable to find confirm modal")
    end
  end

  alias_method :accept_confirm, :accept_alert
end
