import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["backgroundColor"]

  onColorSelect(color) {
    if (this.hasBackgroundColorTarget) {
      this.backgroundColorTargets.forEach(target => {
        target.style.background = color
      })
    }
  }
}
