import "@hotwired/turbo-rails"
import dispatcher from "services/dispatcher"

const { StreamActions } = window.Turbo

//  Handle custom turbo stream for tags like:
//   <turbo-stream action="dispatch_event" event="some_event" data="{}"></turbo-stream>
//
StreamActions.dispatch_event = function() {
  if (!this.hasAttribute("event")) {
    console.error("dispatch_event stream is missing 'event' attribute")
    return
  }

  const eventName = this.getAttribute("event")

  let data = {}

  if (this.templateContent && this.templateContent.querySelector("script")) {
    const rawData = this.templateContent.querySelector("script").innerText

    try {
      data = JSON.parse(rawData)
    } catch (error) {
      console.error("Failed to parse dispatch_event data as JSON:", error)
      return
    }
  }

  dispatcher.emit(eventName, {
    type: "event",
    data: data
  })
}
