class TailwindTheme
  attr_reader :key, :name

  def initialize(key:, name:)
    @key = key
    @name = name
  end

  def self.all
    config.map do |theme|
      TailwindTheme.new(**theme)
    end
  end

  def self.find_by_key(key)
    all.find do |theme|
      theme.key == key
    end
  end

  def self.default
    @default ||= TailwindTheme.new(**config.first)
  end

  def self.config
    @config ||= Rails.application.config_for(:tailwind_themes)
  end
end
