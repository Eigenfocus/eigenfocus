import { Controller } from "@hotwired/stimulus"

const DEFAULT_ANIMATION_TIMEOUT = 1000

export default class extends Controller {
  static targets = ['heartBeat']

  heartBeat({ params: { target } }) {
    this.#animate(target, 'heartBeat')
  }

  #animate(target, animation) {
    document.querySelectorAll(target).forEach(element => {
      this.#animateElement(element, `animate__${animation}`)
    })
  }

  #animateElement(element, cssClass) {
    element.classList.add("animate__animated", cssClass)

    setTimeout(() => element.classList.remove("animate__animated", cssClass), DEFAULT_ANIMATION_TIMEOUT)
  }
}
