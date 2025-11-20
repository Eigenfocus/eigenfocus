ruby file: ".ruby-version"
source "https://rubygems.org"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 8.1.1"

# Database
gem "sqlite3", ">= 2.1"

# Server
gem "puma", ">= 5.0"

# Assets
gem "propshaft"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "tailwindcss-rails", "~> 4.4"

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
gem "solid_queue", "~> 1.2"

# Filter and pagination
gem "ransack", "~> 4.4"
gem "pagy", "~> 43.1"

# Frontend app
gem "shakapacker", "~> 8.4"
gem "react-rails", "~> 3.2"
gem "js-routes", "~> 2.3"
gem "i18n-js", "~> 4.2"
gem "view_component", "4.1.1"

# For configuration files
gem "dry-struct", "~> 1.8"

# Reports
# CSV will be removed from ruby 3.4
gem "csv"

group :development, :test do
  gem "dotenv"
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", require: false
  gem "i18n-debug"
  gem "rubocop-rails-omakase", require: false
  gem "rubocop-performance", "~> 1.24"
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"
end

group :test do
  gem "dry-validation", "~> 1.11"
  gem "capybara", "~> 3.40"
  gem "database_cleaner"
  gem "factory_bot_rails", "~> 6.5"
  gem "rspec-rails", "~> 8.0"
  gem "selenium-webdriver", "4.38.0"
  gem "timecop"
  gem "webmock"
end
