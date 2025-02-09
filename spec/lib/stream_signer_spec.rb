require 'rails_helper'

describe StreamSigner do
  specify 'encryption/decryption proccess' do
    token = subject.generate_token(:users_channel, 'users:4')

    expect(token.size).to eq(54)

    verified_message = subject.verify_token(:users_channel, token)
    expect(verified_message).to eq('users:4')
  end

  it 'raises and error if the token signature is invalid' do
    token = subject.generate_token(:users_channel, 'users:4')

    expect {
      subject.verify_token(:other_chanel, token)
    }.to raise_error(StreamSigner::InvalidSignatureError, "Invalid token provided: InVzZXJzOjQi--53f575e803caa8e70b76de455cdc4bdda7fe1e68 for channel other_chanel")
  end
end
