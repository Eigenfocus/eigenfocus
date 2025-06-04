import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['dueDate']
  static values = {
    scrollOnConnect: Boolean
  }

  connect() {
    if (this.scrollOnConnectValue) {
      this.element.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }

  onFinished() {
    this.dueDateTarget.classList.add("finished")
  }

  onUnfinished() {
    this.dueDateTarget.classList.remove("finished")
  }
}
