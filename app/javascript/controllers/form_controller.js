import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
  }

  submit() {
    // Should use the polyfill
    // https://github.com/hotwired/turbo/pull/439
    this.element.requestSubmit()
  }
}
