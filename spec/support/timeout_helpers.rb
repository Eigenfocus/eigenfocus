module TimeoutHelpers
  def override_set_timeout
    page.execute_script <<-JS
      window.originalSetTimeout = window.setTimeout;
      window.setTimeout = function(callback, _timeout) {
        callback();
        return 1;
      };
    JS
  end

  def restore_set_timeout
    page.execute_script("window.setTimeout = window.originalSetTimeout;")
  end
end

RSpec.configure do |config|
  config.include TimeoutHelpers, type: :feature

  config.before(:each, override_js_timeouts: true) do
    override_set_timeout
  end

  config.after(:each, override_js_timeouts: true) do
    restore_set_timeout
  end
end
