import { Controller } from "@hotwired/stimulus";
import { marked } from "marked";

export default class extends Controller {
  static targets = [
    "card",
    "showFormButton",
    "inlineCardForm"
  ]

  showInlineCardForm() {
    this.inlineCardFormTarget.classList.remove('hidden')
    this.showFormButtonTarget.classList.add('hidden')
    this.inlineCardFormTarget.querySelector("input[name='issue[title]'").focus()
  }

  hideInlineCardForm() {
    this.showFormButtonTarget.classList.remove('hidden')
    this.inlineCardFormTarget.classList.add('hidden')
  }
}
