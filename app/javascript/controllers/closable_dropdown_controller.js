import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.listener = (e) => {
      if (!this.element.contains(e.target)) {
        this.element.removeAttribute('open')
      }
    }

    window.addEventListener('pointerdown', this.listener)
  }

  disconnect() {
    window.removeEventListener('pointerdown', this.listener)
  }
}
