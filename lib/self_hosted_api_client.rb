require "net/http"
require "uri"
require "json"

class SelfHostedApiClient
  BASE_URL = "https://self-hosted-api-free.eigenfocus.com/v1"

  def initialize(app_metadata)
    @app_metadata = app_metadata
  end

  def get(path)
    return {} if Rails.env.development?

    uri = URI(BASE_URL.delete_suffix("/") + "/" + path.delete_prefix("/"))
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.scheme == "https")

    request = Net::HTTP::Get.new(uri)
    request["App-Token"] = @app_metadata.token
    request["App-Version"] = @app_metadata.current_version.to_s

    response = http.request(request)
    JSON.parse(response.body)
  rescue
    {}
  end
end
