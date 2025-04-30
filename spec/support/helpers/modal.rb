module ModalHelpers
  def close_modal
    find(".cpy-close-modal").click
  end
end

RSpec.configure do |config|
  config.include ModalHelpers, type: :feature
end
