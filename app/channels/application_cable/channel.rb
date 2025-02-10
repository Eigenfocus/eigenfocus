module ApplicationCable
  class Channel < ActionCable::Channel::Base
    before_subscribe :verify_token

    def verify_token
      return unless params[:token].present?

      begin
        @signed_params = HashWithIndifferentAccess.new(StreamSigner.verify_token(params[:token]))
      rescue
        reject_unauthorized_connection
      end
    end

    def signed_params
      @signed_params || {}
    end
  end
end
