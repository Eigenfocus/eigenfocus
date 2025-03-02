import { Controller } from "@hotwired/stimulus"
import { driver } from "driver.js"
import TOUR_CONFIGS from "app-tours"

export default class extends Controller {
  connect() {
    this.driverObj = driver({
      animate: true,
      showProgress: true,
      allowClose: true,
      disableActiveInteraction: true,
      onCloseClick: () => {
        this.driverObj.destroy()
      }
    })

    window.appTour = this
  }

  disconnect() {
    if (this.driverObj) {
      this.driverObj.destroy()
    }

    window.appTour = null
  }

  start(tourKey) {
    if (!this.driverObj || !tourKey) return
    console.log(TOUR_CONFIGS[tourKey])
    if (TOUR_CONFIGS[tourKey]) {
      this.driverObj.setSteps(TOUR_CONFIGS[tourKey])
      this.driverObj.drive()
    }
  }

}