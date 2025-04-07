# Do not let propshaft compile tailwind files
Rails.application.config.assets.excluded_paths <<  Rails.root.join("app/assets/tailwind/*")

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
