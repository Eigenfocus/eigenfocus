import { Controller } from "@hotwired/stimulus"

export default class Modal extends Controller {
  connect() {
    this.element.addEventListener('close', (e) => {
      window.dispatchEvent(new CustomEvent('modal:closed'))
    })
  }

  close(e) {
    this.element.close()
  }
}
