# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"

pin "@fortawesome/fontawesome-free", to: "@fortawesome--fontawesome-free.js" # @6.5.2
pin_all_from "vendor/javascript/tailwindcss-stimulus-components", under: "tailwindcss-stimulus-components", preload: true
pin "moment" # @2.29.4
pin "flatpickr" # @4.6.13
pin "stimulus-flatpickr" # @3.0.0
pin "select2" # @4.1.0
pin "jquery" # @3.7.1
pin "sortablejs" # @1.15.6

pin_all_from "app/javascript/controllers", under: "controllers"
