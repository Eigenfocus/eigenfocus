import { Controller } from "@hotwired/stimulus"

import Coloris from "@melloware/coloris"

export default class extends Controller {
  static targets = ["input", "wrapper"]
  static values = {
    focus: { type: Boolean, default: false },
  }

  connect() {
    Coloris.init()

    this.inputTarget.classList.add("hidden")

    Coloris.coloris({
      parent: this.wrapperTarget,
      el: this.inputTarget,
      theme: "pill",
      format: 'hex',
      alpha: false,
      focusInput: this.focusValue,
      swatches: [],
      wrap: false,
      inline: true,
      defaultColor: this.inputTarget.value,
      onChange: this.#onColorPicked.bind(this)
    })
  }

  #onColorPicked(color) {
    this.inputTarget.value = color
  }

  disconnect() {
    Coloris.close()
  }
}
