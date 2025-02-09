module StreamSigner
  class InvalidSignatureError < StandardError
    def initialize(channel, token)
      super("Invalid token provided: #{token} for channel #{channel}")
    end
  end

  def self.generate_token(channel, stream)
    Rails.application.message_verifier(channel).generate(stream)
  end

  def self.verify_token(channel, token)
    begin
      Rails.application.message_verifier(channel).verify(token)
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      raise InvalidSignatureError.new(channel, token)
    end
  end
end
