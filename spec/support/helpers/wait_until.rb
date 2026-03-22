module WaitUntilRspecHelper
  def wait_until(timeout: 4, interval: 0.1)
    deadline = Time.now + timeout

    loop do
      return if yield

      raise "wait_until timed out after #{timeout}s" if Time.now > deadline

      sleep interval
    end
  end
end

RSpec.configure do |config|
  config.include WaitUntilRspecHelper, type: :feature
end
