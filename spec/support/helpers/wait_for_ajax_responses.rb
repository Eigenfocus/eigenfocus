module WaitForAjaxResponsesRspecHelper
  def wait_for_turbo_frame_response
    # Using page.document because this method can be called from a nested within block
    expect(page.document).to_not have_selector("[busy]")
  end

  def retry_waiting_for_turbo_response(retries = 0)
    begin
      wait_for_turbo_frame_response
      yield
    rescue RSpec::Expectations::ExpectationNotMetError
      retries += 1
      retry if retries < 3
      raise
    end
  end
end

RSpec.configure do |config|
  config.include WaitForAjaxResponsesRspecHelper, type: :feature
end
