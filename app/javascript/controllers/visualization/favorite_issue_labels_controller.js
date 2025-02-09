import { Controller } from '@hotwired/stimulus'
import { FetchRequest } from '@rails/request.js'

const ISSUE_DATA_ATTRIBUTE = 'data-favorite-issue-labels-issue-id'

export default class extends Controller {
  static values = {
    addPath: String,
    removePath: String
  }

  static targets = ['favoriteLabelInput']

  onKeyPress(e) {
    const key = e.key

    if (key >= "1" && key <= "6") {
      const hoveredCard = document.querySelector(`[${ISSUE_DATA_ATTRIBUTE}]:hover`)

      if (hoveredCard) {
        e.preventDefault()
        const label = this.favoriteLabelInputTargets[parseInt(key) - 1].value

        this.#toogleLabel(hoveredCard, label)
      }
    }
  }

  #toogleLabel(hoveredCard, label) {
    if (label.trim() === "") {
      return;
    }

    const issueId = hoveredCard.getAttribute(ISSUE_DATA_ATTRIBUTE)

    const isLabelAlreadyApplyed = Array.from(hoveredCard.querySelectorAll("[data-issue-label]")).find(el =>
      el.textContent.toLowerCase().includes(label.toLowerCase())
    );

    if (isLabelAlreadyApplyed) {
      this.#removeLabel(issueId, label)
    } else {
      this.#applyLabel(issueId, label)
    }

  }

  #applyLabel(issueId, label) {
    const REQUEST_PATH = this.addPathValue.replace("ISSUE_ID_PLACEHOLDER", issueId)

    const request = new FetchRequest('post', REQUEST_PATH, {
      body: JSON.stringify({
        label: { title: label }
      })
    })

    return request.perform()
  }

  #removeLabel(issueId, label) {
    const REQUEST_PATH = this.removePathValue.replace("ISSUE_ID_PLACEHOLDER", issueId)

    const request = new FetchRequest('delete', REQUEST_PATH, {
      body: JSON.stringify({
        label: { title: label }
      })
    })

    return request.perform()
  }

}
