class TailwindTheme
  attr_reader :key
  attr_reader :showcase_colors

  def initialize(key:, showcase_colors:)
    @key = key
    @showcase_colors = showcase_colors
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

  def self.default
    @default ||= TailwindTheme.new(**config.first)
  end

  def self.config
    @config ||= Rails.application.config_for(:tailwind_themes)
  end
end
