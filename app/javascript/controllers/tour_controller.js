import { Controller } from "@hotwired/stimulus"
import { driver } from "driver.js"

import TOUR_CONFIGS from "app-tours"

export default class extends Controller {
  connect() {
    window.driverObj = driver({
      animate: true,
      showProgress: true,
      allowClose: true,
      disableActiveInteraction: true,
      onCloseClick: () => {
        window.driverObj.destroy()
      }
    })

    if (this.autoStartValue) {
      this.start()
    }
  }

  disconnect() {
    window.driverObj.destroy()
  }

  start(event) {
    const tourKey = event.params.tourKey

    if (TOUR_CONFIGS[tourKey]) {
      window.driverObj.setSteps(TOUR_CONFIGS[tourKey])
      window.driverObj.drive()
    }
  }
}