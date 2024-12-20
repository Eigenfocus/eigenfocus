require 'rails_helper'

describe User do
  describe '.theme' do
    it "returns the value from the database if there is any value" do
      user = FactoryBot.create :user
      user.favorite_theme_key = 'frost-crystal'
      user.save!
      user.reload
      expect(user.favorite_theme_key).to eq('frost-crystal')
    end

    it "returns the default theme key name if the attribute is empty" do
      user = User.new
      user.favorite_theme_key = nil
      expect(user.favorite_theme_key).to eq('amethyst-moon')


      user.favorite_theme_key = ""
      expect(user.favorite_theme_key).to eq('amethyst-moon')
    end
  end
end
