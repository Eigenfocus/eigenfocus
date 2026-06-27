import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["checkbox", "count", "title"]

  checkboxTargetConnected() {
    this.refresh()
  }

  checkboxTargetDisconnected() {
    this.refresh()
  }

  refresh() {
    const total = this.checkboxTargets.length
    const checked = this.checkboxTargets.filter((c) => c.checked).length

    if (this.hasCountTarget) {
      this.countTarget.textContent = total > 0 ? `${checked}/${total}` : ""
    }

    this.checkboxTargets.forEach((checkbox) => {
      const item = checkbox.closest(".cpy-checklist-item")
      const text = item && item.querySelector("[data-checklist-item-text]")
      if (text) text.classList.toggle("line-through", checkbox.checked)
    })

    if (this.hasTitleTarget) {
      this.titleTarget.classList.toggle("line-through", total > 0 && checked === total)
    }
  }
}
