module ModalHelpers
  def close_modal
    find(".cpy-close-modal").click
  end

  def wait_for_alert_modal_close
    expect(page).to_not have_css("#confirm-modal #confirm-accept")
  end
end

RSpec.configure do |config|
  config.include ModalHelpers, type: :feature
end
