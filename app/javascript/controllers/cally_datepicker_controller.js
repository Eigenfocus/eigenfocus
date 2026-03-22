import { Controller } from "@hotwired/stimulus"
import "cally"

export default class extends Controller {
  static targets = ["input", "calendar", "popover", "clearButton"]
  static values = {
    min: { type: String, default: "" },
    max: { type: String, default: "" },
  }

  connect() {
    if (this.hasCalendarTarget) {
      this.calendarTarget.addEventListener("change", this.handleDateChange)
    }

    this.syncClearButtonVisibility()
  }

  disconnect() {
    if (this.hasCalendarTarget) {
      this.calendarTarget.removeEventListener("change", this.handleDateChange)
    }
  }

  handleDateChange = (event) => {
    const dateValue = event.target.value
    this.inputTarget.value = dateValue

    this.inputTarget.dispatchEvent(new Event("input", { bubbles: true }))
    this.inputTarget.dispatchEvent(new Event("change", { bubbles: true }))

    if (this.hasPopoverTarget) {
      this.popoverTarget.hidePopover()
    }

    this.syncClearButtonVisibility()
  }

  clear() {
    this.inputTarget.value = ""
    this.calendarTarget.value = ""

    this.inputTarget.dispatchEvent(new Event("input", { bubbles: true }))
    this.inputTarget.dispatchEvent(new Event("change", { bubbles: true }))

    if (this.hasPopoverTarget) {
      this.popoverTarget.hidePopover()
    }

    this.syncClearButtonVisibility()
  }

  syncClearButtonVisibility() {
    if (!this.hasClearButtonTarget) return

    this.clearButtonTarget.style.display = this.inputTarget.value ? "block" : "none"
  }
}
