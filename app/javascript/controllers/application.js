import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Import and register all TailwindCSS Components
import {
  Dropdown,
  Popover,
} from "tailwindcss-stimulus-components"

application.register('dropdown', Dropdown)
application.register('popover', Popover)

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
