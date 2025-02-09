module ApplicationCable
  class Channel < ActionCable::Channel::Base
    before_subscribe :verify_token
    attribute_reader :signed_params

    def verify_token
      return unless params[:token].present?

      begin
        @signed_params = HashWithIndifferentAccess.new(StreamSigner.verify_token(params[:token]))
        puts signed_params
      rescue
        reject_unauthorized_connection
      end
    end
  end
end
