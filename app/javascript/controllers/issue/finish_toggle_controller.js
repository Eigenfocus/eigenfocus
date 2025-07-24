import { Controller } from "@hotwired/stimulus"
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static targets = [ "toggle" ]

  static values = {
    finishPath: { type: String },
    unfinishPath: { type: String },
  }

  toggle(e) {
    e.preventDefault()
    if (this.toggleTarget.classList.contains("finished")) {
      this.markAsUnchecked()
    } else {
      this.markAsChecked()
    }
  }

  markAsChecked() {
    this.toggleTarget.classList.add("finished")
    this.dispatch("checked")
    this.#request(this.finishPathValue)
  }

  markAsUnchecked() {
    this.toggleTarget.classList.remove("finished")
    this.dispatch("unchecked")
    this.#request(this.unfinishPathValue)
  }

  #request(path) {
    const request = new FetchRequest('put', path, {
      responseKind: "turbo-stream"
    })

    return request.perform()
  }
}
