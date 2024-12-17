# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"

pin "@fortawesome/fontawesome-free", to: "@fortawesome--fontawesome-free.js" # @6.5.2
pin_all_from "vendor/javascript/tailwindcss-stimulus-components", under: "tailwindcss-stimulus-components", preload: true

pin_all_from "app/javascript/controllers", under: "controllers"
