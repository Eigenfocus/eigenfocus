source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.0.2"

# Database
gem "sqlite3", ">= 2.1"

# Server
gem "puma", ">= 5.0"

# Assets
gem "propshaft"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "tailwindcss-ruby"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem "thruster", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem "image_processing", "~> 1.14"

gem "positioning", "~> 0.4"

# Real-time updates
gem "solid_cable", "~> 3.0"

# Background job processing
gem "solid_queue", "~> 1.1"

# Filter and pagination
gem "ransack", "~> 4.3"
gem "pagy", "~> 9.3"

# Frontend app
gem "shakapacker", "~> 8.2"
gem "react-rails", "~> 3.2"
gem "js-routes", "~> 2.3"
gem "i18n-js", "~> 4.2"

# For configuration files
gem "dry-struct", "~> 1.8"

group :development, :test do
  gem "dotenv"
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", require: false
  gem "i18n-debug"
  gem "rubocop-rails-omakase", require: false
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
end

group :test do
  gem "dry-validation", "~> 1.11"
  gem "capybara", "~> 3.40"
  gem "database_cleaner"
  gem "factory_bot_rails", "~> 6.4"
  gem "rspec-rails", "~> 7.1"
  gem "selenium-webdriver", "4.29.1"
  gem "timecop"
  gem "webmock"
end
