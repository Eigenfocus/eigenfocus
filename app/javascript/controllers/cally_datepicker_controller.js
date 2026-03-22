import { Controller } from "@hotwired/stimulus"
import "cally"

export default class extends Controller {
  static targets = ["input", "calendar", "popover", "clearButton"]

  connect() {
    if (this.hasCalendarTarget) {
      this.calendarTarget.addEventListener("change", this.handleDateChange)
    }

    this.syncClearButtonVisibility()
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  disconnect() {
    if (this.hasCalendarTarget) {
      this.calendarTarget.removeEventListener("change", this.handleDateChange)
    }
    document.removeEventListener("click", this.handleOutsideClick)
  }

  toggle() {
    if (!this.hasPopoverTarget) return

    const isHidden = this.popoverTarget.classList.contains("hidden")
    if (isHidden) {
      this.open()
    } else {
      this.close()
    }
  }

  open() {
    this.popoverTarget.classList.remove("hidden")
    document.addEventListener("click", this.handleOutsideClick)
  }

  close() {
    this.popoverTarget.classList.add("hidden")
    document.removeEventListener("click", this.handleOutsideClick)
  }

  handleOutsideClick(event) {
    if (!this.element.contains(event.target)) {
      this.close()
    }
  }

  handleDateChange = (event) => {
    const dateValue = event.target.value
    this.inputTarget.value = dateValue

    this.inputTarget.dispatchEvent(new Event("input", { bubbles: true }))
    this.inputTarget.dispatchEvent(new Event("change", { bubbles: true }))

    this.close()
    this.syncClearButtonVisibility()
  }

  clear() {
    this.inputTarget.value = ""
    this.calendarTarget.value = ""

    this.inputTarget.dispatchEvent(new Event("input", { bubbles: true }))
    this.inputTarget.dispatchEvent(new Event("change", { bubbles: true }))

    this.close()
    this.syncClearButtonVisibility()
  }

  syncClearButtonVisibility() {
    if (!this.hasClearButtonTarget) return

    this.clearButtonTarget.classList.toggle("hidden", !this.inputTarget.value)
  }
}
