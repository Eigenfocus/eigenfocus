import { Controller } from "@hotwired/stimulus"

// Inline edit for todo list titles and todos. Handles autogrow, save on
// blur/Enter, "keep adding" when editing a brand new todo, and cancel on Esc
// (reverting to the saved display without closing the issue modal).
export default class extends Controller {
  static targets = ["input", "continueField"]
  static values = {
    adding: { type: Boolean, default: false },
    showPath: String
  }

  connect() {
    this.submitting = false
    this.autogrow()
    this.focusEnd()
  }

  focusEnd() {
    const el = this.inputTarget
    el.focus()
    const length = el.value.length
    el.setSelectionRange(length, length)
  }

  autogrow() {
    const el = this.inputTarget
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }

  save() {
    this.#submit(false)
  }

  saveAndContinue(e) {
    e.preventDefault()
    this.#submit(this.addingValue)
  }

  cancel(e) {
    e.preventDefault()
    e.stopPropagation()
    if (this.submitting) return
    this.submitting = true

    if (this.addingValue) {
      this.inputTarget.value = ""
      this.element.requestSubmit()
    } else {
      this.frame.src = this.showPathValue
    }
  }

  #submit(keepAdding) {
    if (this.submitting) return
    this.submitting = true
    if (this.hasContinueFieldTarget) {
      this.continueFieldTarget.value = keepAdding ? "1" : "0"
    }
    this.element.requestSubmit()
  }

  get frame() {
    return this.element.closest("turbo-frame")
  }
}
