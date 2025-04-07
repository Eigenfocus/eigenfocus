class TailwindTheme
  attr_reader :key
  attr_reader :showcase_colors
  attr_reader :color_suggestions

  def initialize(key:, showcase_colors:, color_suggestions:)
    @key = key
    @showcase_colors = showcase_colors
    @color_suggestions = color_suggestions
  end

  def name
    I18n.t(:name, scope: [ :themes, key ])
  end

  def description
    I18n.t(:description, scope: [ :themes, key ])
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
