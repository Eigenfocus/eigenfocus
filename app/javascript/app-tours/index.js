import { driver } from "driver.js"
import projectTours from "app-tours/projects_tours"
import issuesTour from "app-tours/issues_tour"
import visualizationBoardTour from "app-tours/visualization_board_tour"
import timeEntriesTour from "app-tours/time_entries_tour"

const TOUR_CONFIGS = {
  ...projectTours,
  ...issuesTour,
  ...visualizationBoardTour,
  ...timeEntriesTour
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
