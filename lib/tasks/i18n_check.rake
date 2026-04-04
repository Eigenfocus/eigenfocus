require_relative "../i18n_checker"

namespace :i18n do
  desc "Check for missing translations between en and pt-BR"
  task check: :environment do
    I18nChecker.new(%w[en pt-BR], Rails.root.to_s).run
  end
end
