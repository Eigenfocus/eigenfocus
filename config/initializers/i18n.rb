I18n.load_path += Dir[Rails.root.join("config", "locales", "**", "*.yml")]

# Locales are supported by our app
I18n.available_locales = %i[en pt-BR]

# Our default locale
I18n.default_locale = :en
