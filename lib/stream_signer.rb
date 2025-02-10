module StreamSigner
  GENERIC_CHANNEL = :generic_channel

  class InvalidSignatureError < StandardError
    def initialize(token)
      super("Invalid token provided: #{token}")
    end
  end

  def self.generate_token(stream)
    Rails.application.message_verifier(GENERIC_CHANNEL).generate(stream)
  end

  def self.verify_token(token)
    begin
      Rails.application.message_verifier(GENERIC_CHANNEL).verify(token)
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      raise InvalidSignatureError.new(token)
    end
  end
end
