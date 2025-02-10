module ApplicationHelper
module WebsocketsSecurity
  def signed_stream_token(object_to_sign)
    StreamSigner.generate_token(object_to_sign)
  end
end
end
