import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "switchButton"
  ]

  switchTheme(e) {
    const theme = e.currentTarget.dataset.setTheme

    document.documentElement.dataset.theme = theme

    // this.switchButtonTargets.forEach(button => {
    //   button.querySelector("svg").classList.add("invisible")
    // })

    // e.currentTarget.querySelector("svg").classList.remove("invisible")
  }
}
