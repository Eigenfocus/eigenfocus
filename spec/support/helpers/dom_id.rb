module DomIdRspecHelper
  def dom_id(*args)
    "#" + ActionView::RecordIdentifier.dom_id(*args)
  end
end

RSpec.configure do |config|
  config.include DomIdRspecHelper, type: :feature
end
