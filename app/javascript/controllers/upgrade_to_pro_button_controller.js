import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["icon"]

  connect() {
    this.checkAndManageShineAnimation()
  }

  checkAndManageShineAnimation() {
    const lastShineTimestamp = localStorage.getItem('lastProUpgradeShine')
    const currentTime = new Date().getTime()
    const fourDaysInMs = 4 * 24 * 60 * 60 * 1000

    if (!lastShineTimestamp || (currentTime - parseInt(lastShineTimestamp)) > fourDaysInMs) {
      this.element.classList.add('shine-animation')

      localStorage.setItem('lastProUpgradeShine', currentTime.toString())
    }
  }
}