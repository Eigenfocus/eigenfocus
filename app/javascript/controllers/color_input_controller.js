import { Controller } from "@hotwired/stimulus"

import Coloris from "@melloware/coloris"

export default class extends Controller {
  static outlets = ["issue-preview"]
  static targets = ["input", "wrapper"]
  static values = {
    focus: { type: Boolean, default: false },
    themeMode: { type: String, default: "light" }, // "light" | "dark"
    suggestions: { type: Array, default: [] },
  }

  connect() {
    Coloris.init()
    const defaultColor = this.inputTarget.value || this.#randomSuggestion()

    this.inputTarget.classList.add("hidden")

    Coloris.coloris({
      parent: this.wrapperTarget,
      el: this.inputTarget,
      theme: "pill",
      themeMode: this.themeModeValue,
      format: 'hex',
      alpha: false,
      focusInput: this.focusValue,
      swatches: this.suggestionsValue,
      wrap: false,
      inline: true,
      defaultColor: defaultColor,
      onChange: this.#onColorPicked.bind(this)
    })

    this.#onColorPicked(defaultColor)
  }

  #onColorPicked(color) {
    this.inputTarget.value = color

    this.issuePreviewOutlets.forEach(listener => {
      listener.onColorSelect(color)
    })
  }

  #randomSuggestion() {
    return this.suggestionsValue[Math.floor(Math.random() * this.suggestionsValue.length)]
  }

  disconnect() {
    Coloris.close()
  }
}
