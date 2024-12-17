import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Import and register all TailwindCSS Components
import {
  Dropdown,
  Modal
} from "tailwindcss-stimulus-components"

class CustomModal extends Modal {
  static targets = [ "content" ]
  connect() {
    super.connect()
    if (!this.containerTarget.classList.contains("hidden")) {
      this.insertBackdrop();
    }
  }

  insertBackdrop() {
    // Insert the background
    if (!this.data.get("disable-backdrop")) {
      document.body.insertAdjacentHTML('beforeend', this.backgroundHtml);
      this.background = document.querySelector(`#${this.backgroundId}`);
    }
  }

}

application.register('modal', CustomModal)
application.register('dropdown', Dropdown)

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
