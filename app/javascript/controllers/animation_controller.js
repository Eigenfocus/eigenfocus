import { Controller } from "@hotwired/stimulus"

const DEFAULT_ANIMATION_TIMEOUT = 1000

export default class extends Controller {
  static values = {
    speed: { type: String, default: 'default' },
  }

  heartBeat({ params: { target } }) {
    this.#animate(target, 'heartBeat')
  }

  pulse({ params: { target } }) {
    this.#animate(target, 'pulse')
  }

  #animate(target, animation) {
    document.querySelectorAll(target).forEach(element => {
      this.#animateElement(element, `animate__${animation}`)
    })
  }

  #animateElement(element, cssClass) {
    const cssClassList = ["animate__animated", cssClass, this.speedCssClass]

    element.classList.add(...cssClassList)

    setTimeout(() => element.classList.remove(...cssClassList), this.timeout)
  }

  get speedCssClass() {
    return `animate__${this.speedValue}`
  }

  get timeout() {
    switch(this.speedValue) {
      case "slower":
        return 3000
      case "slow":
        return 2000
      case "fast":
        return 800
      case "faster":
        return 500
      default:
        return 1000
    }
  }
}
