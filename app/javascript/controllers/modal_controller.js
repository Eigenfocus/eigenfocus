import { Controller } from "@hotwired/stimulus"

export default class Modal extends Controller {
  static values = {
    emitCloseEvent: { type: Boolean, default: true }
  }

  connect() {
    if (this.emitCloseEventValue) {
      this.element.addEventListener('close', (e) => {
        window.dispatchEvent(new CustomEvent('modal:closed'))
      })
    }

    this.element.focus()
  }

  close(e) {
    this.element.close()
  }
}
