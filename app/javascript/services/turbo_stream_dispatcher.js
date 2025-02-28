import { StreamElements } from "@hotwired/turbo"
import dispatcher from "./dispatcher"

// Register a custom Turbo Stream element handler for dispatch_event
StreamElements.dispatch_event = class extends StreamElements.Actions {
  async performAction() {
    if (!this.hasAttribute("event")) {
      console.error("dispatch_event stream is missing 'event' attribute")
      return
    }

    const eventName = this.getAttribute("event")
    let data = {}

    // Try to parse the content as JSON if it exists
    if (this.templateContent) {
      try {
        data = JSON.parse(this.templateContent.textContent)
      } catch (error) {
        console.error("Failed to parse dispatch_event data as JSON:", error)
        return
      }
    }

    // Dispatch the event through our dispatcher
    dispatcher.dispatch(eventName, {
      type: "event",
      data: data
    })
  }
}