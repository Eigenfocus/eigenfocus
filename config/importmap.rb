# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"

# Use direct uploads for Active Storage (remember to import "@rails/activestorage" in your application.js)
pin "@rails/activestorage", to: "activestorage.esm.js"

pin "@fortawesome/fontawesome-free", to: "@fortawesome--fontawesome-free.js" # @6.5.2
pin_all_from "vendor/javascript/tailwindcss-stimulus-components", under: "tailwindcss-stimulus-components", preload: true
pin "moment" # @2.29.4
pin "flatpickr" # @4.6.13
pin "stimulus-flatpickr" # @3.0.0
pin "select2" # @4.1.0
pin "jquery" # @3.7.1
pin "sortablejs" # @1.15.6
pin "dropzone" # @6.0.0
pin "just-extend" # @5.1.1 required by dropzone

pin_all_from "app/javascript/controllers", under: "controllers"
pin "@rails/request.js", to: "@rails--request.js.js" # @0.0.11
pin "marked" # @15.0.4
