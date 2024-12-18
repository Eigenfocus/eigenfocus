# Do not let propshaft compile tailwind files
Rails.application.config.assets.excluded_paths <<  Rails.root.join("app/assets/tailwind/*")

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
    Rails.application.config_for(:tailwind_themes).map do |theme|
      TailwindTheme.new(**theme)
    end
  end
end

module ThemedTailwindcssCommands
  class << self
    def compile_command(theme_key:, debug: false, **kwargs)
      command = [
        Tailwindcss::Ruby.executable(**kwargs),
        "-i", Rails.root.join("app/assets/tailwind/themes/#{theme_key}/application.css").to_s,
        "-o", Rails.root.join("app/assets/builds/#{theme_key}.theme.css").to_s,
        "-c", Rails.root.join("app/assets/tailwind/themes/#{theme_key}/tailwind.config.js").to_s
      ]

      command << "--minify" unless debug || rails_css_compressor?

      command
    end

    def watch_command(always: false, poll: false, **kwargs)
      compile_command(**kwargs).tap do |command|
        command << "-w"
        command << "always" if always
        command << "-p" if poll
      end
    end

    def rails_css_compressor?
      defined?(Rails) && Rails&.application&.config&.assets&.css_compressor.present?
    end
  end
end
