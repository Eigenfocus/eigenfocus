module WaitForAjaxResponsesRspecHelper
  def wait_for_turbo_frame_response
    expect(page).to_not have_selector("[busy]")
  end
end

RSpec.configure do |config|
  config.include WaitForAjaxResponsesRspecHelper, type: :feature
end
