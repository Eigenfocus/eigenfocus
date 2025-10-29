import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.listener = (e) => {
      if (!this.element.contains(e.target)) {
        this.element.removeAttribute('open')
      }
    }

    window.addEventListener('mousedown', this.listener)
  }

  disconnect() {
    window.removeEventListener('mousedown', this.listener)
  }
}
