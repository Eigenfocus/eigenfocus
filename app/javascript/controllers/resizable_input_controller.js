import { Controller } from "@hotwired/stimulus";

// Based on https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
export default class extends Controller {
  static targets = [
    "replica",
    "input"
  ]

  connect() {
    this.replicaTarget.innerHTML = this.inputTarget.value

    if (this.inputTarget.value.trim() == '') {
      this.replicaTarget.innerHTML += '&nbsp;' // Avoid wrong height if input is empty
    }

    this.inputTarget.addEventListener('input', () => {
      this.replicaTarget.innerText = this.inputTarget.value + '&nbsp;' // the ' ' avoid ui jumps
    })
  }
}
