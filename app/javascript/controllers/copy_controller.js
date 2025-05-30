import { Controller } from "@hotwired/stimulus"
import ClipboardJS  from "clipboard"

export default class extends Controller {
  static values = {
    // As we are using ClipboardJS, we support their data attributes, example:
    //
    // data-clipboard-target="#trigger"
    // data-clipboard-action="copy|cut"
    // data-clipboard-text="Actual text copied"
    //
    // See more on their docs: https://clipboardjs.com/#usage
  }

  connect() {
    const options = {
      text: this.element.dataset.clipboardText ? null : () => this.element.innerText
    }

    this.clipboard = new ClipboardJS(this.element, options)

    this.clipboard
      .on('success', event => this.dispatch("success", { detail: { event } }))
      .on('error', event => this.dispatch("error", { detail: { event } }))
  }

  disconnect() {
    this.clipboard.destroy()
  }
}
