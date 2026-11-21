import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dialog"]

  open() {
    this.previouslyFocused = document.activeElement
    this.dialogTarget.showModal()
  }

  close() {
    this.dialogTarget.close()
  }

  closeFromItem(e) {
    if (e.target.closest("a,button")) this.close()
  }

  restoreFocus() {
    this.previouslyFocused?.focus()
    this.previouslyFocused = null
  }
}
