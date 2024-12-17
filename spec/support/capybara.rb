
require "capybara/rspec"
require 'selenium-webdriver'

Capybara.server_host = '0.0.0.0'
Capybara.server_port = '3001'

if ENV.has_key?("SELENIUM_REMOTE_HOST")
  Capybara.register_driver :remote_selenium do |app|
    options   = Selenium::WebDriver::Chrome::Options.new
    options.add_argument("--window-size=1320,830")
    # options.add_argument('--start-maximized')
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    selenium_url = "http://#{ENV['SELENIUM_REMOTE_HOST']}:4444/wd/hub"

    if ENV["HEADLESS"] != 'false'
      options.add_argument("--headless")
    end

    Capybara::Selenium::Driver.new(
      app,
      browser: :remote,
      url: selenium_url,
      options: options,
    )
  end


  Capybara.configure do |config|
    config.default_driver = :remote_selenium
    config.javascript_driver = :remote_selenium
    config.always_include_port = true

    config.app_host = "http://#{IPSocket.getaddress(Socket.gethostname)}"
  end

else

  Capybara.register_driver :chrome do |app|
    options   = Selenium::WebDriver::Chrome::Options.new
    options.add_argument("--window-size=1400,800")
    options.add_argument("--no-sandbox")

    if ENV["CHROME_BINARY_PATH"].present?
      options.binary = ENV["CHROME_BINARY_PATH"]
    end

    if ENV["HEADLESS"] != 'false'
      options.add_argument("--headless")
    end
    options.add_argument("--disable-dev-shm-usage")

    Capybara::Selenium::Driver.new(
      app,
      browser: :chrome,
      options: options
    )
  end

  Capybara.configure do |config|
    config.default_driver = :chrome
    config.javascript_driver = :chrome
    config.always_include_port = true
    # config.app_host = "http://dev.local"
  end
end

Capybara.disable_animation = true
