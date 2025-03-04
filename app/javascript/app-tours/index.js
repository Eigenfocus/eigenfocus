import { driver } from "driver.js"
import { getTourConfigs } from "app-tours/tour_config"

class AppTour {
  constructor() {
    this.driverObj = driver({
      animate: true,
      showProgress: true,
      allowClose: true,
      overlayClickBehavior: 'nextStep',
      disableActiveInteraction: true,
      onCloseClick: () => {
        this.stopTour()
      }
    })

    window.addEventListener('click', (event) => {
      if (this.driverObj.isActive()) {
        this.driverObj.moveNext()
      }
    })
  }

  startIfPending(targetTourKey) {
    const pendingTours = this.getPendingTours()

    if (pendingTours.includes(targetTourKey)) {
      this.start(targetTourKey)
    }
  }

  start(tourKey) {
    if (!tourKey) {
      console.log("No tour key provided")
      return
    }

    this.stopTour()

    if (this.tourConfigs[tourKey]) {
      this.markTourAsCompleted(tourKey)
      this.driverObj.setSteps(this.tourConfigs[tourKey])
      this.driverObj.drive()
    } else {
      console.log("No tour config found for key:", tourKey)
    }
  }

  stopTour() {
    this.driverObj.destroy()
  }

  markAllToursAsPending() {
    sessionStorage.setItem('pendingTours', JSON.stringify(Object.keys(this.tourConfigs)))
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

  get tourConfigs() {
    const metaTag = document.querySelector('meta[name="tour-language"]');
    const language = metaTag ? metaTag.getAttribute('content') : 'en';
    return getTourConfigs(language);
  }
}

export { AppTour }
