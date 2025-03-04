import { driver } from "driver.js"
import { getTourConfigs } from "app-tours/tour_config"

const translations = {
  en: {
    skipBtnText: 'Close tour',
    nextBtnText: '—›',
    prevBtnText: '‹—',
    doneBtnText: '✕',
  },
  'pt-BR': {
    skipBtnText: 'Fechar tour',
    nextBtnText: '—›',
    prevBtnText: '‹—',
    doneBtnText: '✕',
  }
}

class AppTour {
  constructor() {
    this.driverObj = driver({
      animate: true,
      showProgress: true,
      allowClose: true,
      overlayClickBehavior: 'nextStep',
      disableActiveInteraction: true,
      nextBtnText: translations[this.language].nextBtnText,
      prevBtnText: translations[this.language].prevBtnText,
      doneBtnText: translations[this.language].doneBtnText,
      onCloseClick: () => {
        this.stopTour()
      },
      onPopoverRender: (popover, { config, state }) => {
        const firstButton = document.createElement("button");
        firstButton.innerText = translations[this.language].skipBtnText;
        popover.footerButtons.appendChild(firstButton);

        firstButton.addEventListener("click", () => {
          this.stopTour()
        });
      },
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
    return getTourConfigs(this.language);
  }

  get language() {
    const metaTag = document.querySelector('meta[name="tour-language"]');
    return metaTag ? metaTag.getAttribute('content') : 'en';
  }
}

export { AppTour }
