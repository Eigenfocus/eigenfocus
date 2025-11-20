import { Controller } from "@hotwired/stimulus";

// Based on https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
export default class extends Controller {
  static targets = [
    "replica",
    "input"
  ]

  connect() {
    this.replicaTarget.textContent = this.inputTarget.value
    this.inputTarget.style.resize = 'none'

    if (this.inputTarget.value.trim() == '') {
      this.replicaTarget.textContent += ' '  // Prevents wrong height if input is empty
    }

    this.inputTarget.addEventListener('input', () => {
      this.replicaTarget.textContent = this.inputTarget.value + ' '  // the ' ' prevents ui jumps
    })
  }
}
