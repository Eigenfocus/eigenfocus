import { Controller } from "@hotwired/stimulus"
import { driver } from "driver.js"

export default class extends Controller {
  connect() {
    this.driverObj = driver()
    this.start()
  }

  disconnect() {
    if (this.driverObj) {
      // Destroy the driver instance to clean up event listeners and DOM elements
      this.driverObj.destroy()
      this.driverObj = null
    }
  }

  start() {
    if (this.driverObj) {
      this.driverObj.highlight({
        element: "#sidebar-bottom-menu",
        popover: {
          title: "Title",
          description: "Description"
        }
      })
    }
  }
}