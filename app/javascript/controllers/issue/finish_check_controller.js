import { Controller } from "@hotwired/stimulus"
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static targets = ["checkbox"]
  static values = {
    finishPath: { type: String },
    unfinishPath: { type: String },
  }

  toogle() {
    if (this.checkboxTarget.checked) {
      this.markAsUnchecked()
    } else {
      this.markAsChecked()
    }
  }

  markAsChecked() {
    this.checkboxTarget.checked = true
    this.dispatch("checked")
    this.#request(this.finishPathValue)
  }

  markAsUnchecked() {
    this.checkboxTarget.checked = false
    this.dispatch("unchecked")
    this.#request(this.unfinishPathValue)
  }

  #request(path) {
    const request = new FetchRequest('put', path)

    return request.perform()
  }
}
