import { Controller } from "@hotwired/stimulus"

import Coloris from "@melloware/coloris"

const THEME_COLOR_VARIABLES = [
  "#00D2BC",
  "#00BBFF",
  "#412AD5",
  "#F52E99",
  "#09090B",
  "#FF637F"
]

export default class extends Controller {
  static outlets = ["issue-preview"]
  static targets = ["input", "wrapper"]
  static values = {
    focus: { type: Boolean, default: false }
  }

  connect() {
    Coloris.init()
    const defaultColor = this.inputTarget.value || THEME_COLOR_VARIABLES[0]

    this.inputTarget.classList.add("hidden")

    Coloris.coloris({
      parent: this.wrapperTarget,
      el: this.inputTarget,
      theme: "pill",
      format: 'auto',
      alpha: false,
      focusInput: this.focusValue,
      swatches: THEME_COLOR_VARIABLES,
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
    return THEME_COLOR_VARIABLES[Math.floor(Math.random() * THEME_COLOR_VARIABLES.length)]
  }

  disconnect() {
    Coloris.close()
  }
}
