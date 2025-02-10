require 'rails_helper'

describe StreamSigner do
  specify 'encryption/decryption using a string' do
    token = subject.generate_token('users:4')

    expect(token.size).to eq(54)

    verified_message = subject.verify_token(token)
    expect(verified_message).to eq('users:4')
  end


  specify 'encryption/decryption using a hash' do
    token = subject.generate_token({ symbol_key: "symbol", "string_key": "string" })

    verified_message = subject.verify_token(token)
    expect(verified_message["symbol_key"]).to eq("symbol")
    expect(verified_message["string_key"]).to eq("string")
  end

  it 'raises and error if the token signature is invalid' do
    token = subject.generate_token('users:4')

    expect {
      subject.verify_token('InVzZXJzOjQi--53f575e803caa8e70b76de455cdc4bdda7fe1e68')
    }.to raise_error(StreamSigner::InvalidSignatureError, "Invalid token provided: InVzZXJzOjQi--53f575e803caa8e70b76de455cdc4bdda7fe1e68")
  end
end
