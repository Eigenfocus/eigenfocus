module WaitForAjaxResponsesRspecHelper
  def wait_for_turbo_frame_response
    # Using page.document because this method can be called from a nested within block
    expect(page.document).to_not have_selector("[busy]")
  end
end

RSpec.configure do |config|
  config.include WaitForAjaxResponsesRspecHelper, type: :feature
end
