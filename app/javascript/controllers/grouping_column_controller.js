import { Controller } from "@hotwired/stimulus";
import { marked } from "marked";

export default class extends Controller {
  static targets = [
    "card",
    "inlineCardForm"
  ]

  showInlineCardForm() {
    this.inlineCardFormTarget.classList.remove('hidden')
    this.inlineCardFormTarget.querySelector("input[name='issue[title]'").focus()
  }

  hideInlineCardForm() {
    this.inlineCardFormTarget.classList.add('hidden')
  }
}
