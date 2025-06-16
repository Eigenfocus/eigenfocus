import { Controller } from "@hotwired/stimulus"
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static values = {
    finishPath: { type: String },
    unfinishPath: { type: String },
  }

  toogle(e) {
    e.preventDefault()
    if (this.element.classList.contains("finished")) {
      this.markAsUnchecked()
    } else {
      this.markAsChecked()
    }
  }

  markAsChecked() {
    this.element.classList.add("finished")
    this.dispatch("checked")
    this.#request(this.finishPathValue)
  }

  markAsUnchecked() {
    this.element.classList.remove("finished")
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
