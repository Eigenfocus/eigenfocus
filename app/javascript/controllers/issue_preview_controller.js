import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["typeBar"]

  onColorSelect(color) {
    this.typeBarTarget.style.background = color
  }
}
