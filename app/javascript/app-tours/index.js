import { driver } from "driver.js"
import projectTours from "app-tours/projects_tours"
import issuesTour from "app-tours/issues_tour"

const TOUR_CONFIGS = {
  ...projectTours,
  ...issuesTour
}

class AppTour {
  constructor() {
    this.driverObj = driver({
      animate: true,
      showProgress: true,
      allowClose: true,
      disableActiveInteraction: true,
      onCloseClick: () => {
        this.driverObj.destroy()
      }
    })
  }

  start(tourKey) {
    if (!this.driverObj || !tourKey) return

    this.reset()

    if (TOUR_CONFIGS[tourKey]) {
      this.driverObj.setSteps(TOUR_CONFIGS[tourKey])
      this.driverObj.drive()
    }
  }

  reset() {
    if (this.driverObj) {
      this.driverObj.destroy()
    }
  }
}

export { AppTour }
