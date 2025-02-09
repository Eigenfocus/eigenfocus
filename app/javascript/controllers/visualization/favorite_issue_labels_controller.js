import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

const ISSUE_DATA_ATTRIBUTE = 'data-favorite-issue-labels-issue-id'

export default class extends Controller {
  static values = {
    addPath: String,
  }

  onKeyPress(e) {
    const key = e.key

    if (key >= "1" && key <= "6") {
      const hoveredCard = document.querySelector(`[${ISSUE_DATA_ATTRIBUTE}]:hover`)

      if (hoveredCard) {
        e.preventDefault()
        const issueId = hoveredCard.getAttribute(ISSUE_DATA_ATTRIBUTE)
        console.log(`Label ${key} applied ${issueId}`)
        console.log(this.addPathValue)
      }
    }
  }

}
