RSpec.configure do |config|
  config.around(:each, :mobile) do |example|
    page.driver.browser.manage.window.resize_to(390, 844)
    example.run
  ensure
    page.driver.browser.manage.window.resize_to(1400, 1200)
  end
end
