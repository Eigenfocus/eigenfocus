import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    scrollOnConnect: Boolean
  }

  connect() {
    if (this.scrollOnConnectValue) {
      this.element.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }
}
