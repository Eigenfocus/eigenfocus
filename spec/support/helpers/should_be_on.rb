
module RSpec::Helpers
  module Features
    def should_be_on(path)
      expect(URI.parse(current_url).path).to eq(path)
    end

    def should_not_be_on(path)
      expect(URI.parse(current_url).path).to_not eq(path)
    end
  end
end

RSpec.configure do |config|
  config.include(RSpec::Helpers::Features, :type => :feature)
end
