# This file is used by Rack-based servers to start the application.

require_relative "config/environment"

require 'rack/auth/basic'

if ENV["HTTP_AUTH_USER"].present? && ENV["HTTP_AUTH_PASSWORD"].present?
  use Rack::Auth::Basic, "Restricted Area" do |username, password|
    username == ENV["HTTP_AUTH_USER"] && password == ENV["HTTP_AUTH_PASSWORD"]
  end
end

run Rails.application
Rails.application.load_server
