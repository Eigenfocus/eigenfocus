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

  startIfPending(targetTourKey) {
    const pendingTours = this.getPendingTours()

    for (const tourKey of pendingTours) {
      if (targetTourKey == tourKey) {
        this.start(tourKey)
        return
      }
    }
  }

  start(tourKey) {
    if (!tourKey) {
      console.log("No tour key provided")
      return
    }

    this.reset()

    if (TOUR_CONFIGS[tourKey]) {
      this.markTourAsCompleted(tourKey)
      this.driverObj.setSteps(TOUR_CONFIGS[tourKey])
      this.driverObj.drive()
    } else {
      console.log("No tour config found for key:", tourKey)
    }
  }

  reset() {
    this.driverObj.destroy()
  }

  markAllToursAsPending() {
    sessionStorage.setItem('pendingTours', JSON.stringify(Object.keys(TOUR_CONFIGS)))
  }

  markTourAsCompleted(tourKey) {
    const pendingTours = this.getPendingTours()
    const updatedPendingTours = pendingTours.filter(tour => tour !== tourKey)
    sessionStorage.setItem('pendingTours', JSON.stringify(updatedPendingTours))
  }

  getPendingTours() {
    const storedPendingTours = sessionStorage.getItem('pendingTours')
    return storedPendingTours ? JSON.parse(storedPendingTours) : []
  }
}

export { AppTour }
