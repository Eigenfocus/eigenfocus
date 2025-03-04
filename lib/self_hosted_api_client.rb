require "net/http"
require "uri"
require "json"

class SelfHostedApiClient
  BASE_URL = if Rails.env.production?
    "https://self-hosted-api-free.eigenfocus.com/v1"
  else
    ENV["DEV_MOCK_API"]
  end

  def initialize(app_metadata)
    @app_metadata = app_metadata
  end

  def get(path)
    uri = URI(BASE_URL.delete_suffix("/") + "/" + path.delete_prefix("/"))
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.scheme == "https")

    request = Net::HTTP::Get.new(uri)
    request["App-Token"] = @app_metadata.token
    request["App-Version"] = @app_metadata.current_version.to_s
    request["Last-Used-At"] = @app_metadata.last_used_at.iso8601 if @app_metadata.last_used_at.present?

    response = http.request(request)
    JSON.parse(response.body)
  rescue
    {}
  end

  def post(path, body = {})
    uri = URI(BASE_URL.delete_suffix("/") + "/" + path.delete_prefix("/"))
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.scheme == "https")

    request = Net::HTTP::Post.new(uri)
    request["App-Token"] = @app_metadata.token
    request["App-Version"] = @app_metadata.current_version.to_s
    request["Last-Used-At"] = @app_metadata.last_used_at.iso8601 if @app_metadata.last_used_at.present?
    request["Content-Type"] = "application/json"
    request.body = body.to_json

    response = http.request(request)
    JSON.parse(response.body)
  rescue
    {}
  end
end
