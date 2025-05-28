import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['content']

  connect() {
    this.originalTextValue = this.contentTarget.innerText
  }

  innerText({ params: { value, resetTimeout } }) {
    this.contentTarget.innerText = value

    if (resetTimeout) {
      setTimeout(() => this.contentTarget.innerText = this.originalTextValue, resetTimeout)
    }
  }
}
