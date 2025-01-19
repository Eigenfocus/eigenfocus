import { Controller } from "@hotwired/stimulus";
import { marked } from "marked";

export default class extends Controller {
  static targets = [
    "card",
    "showFormButton",
    "inlineCardForm",
    "inlineCardFormTitle"
  ]

  showInlineCardForm() {
    this.inlineCardFormTarget.classList.remove('hidden')
    this.showFormButtonTarget.classList.add('hidden')
    this.inlineCardFormTitleTarget.focus()
  }

  hideInlineCardForm() {
    this.showFormButtonTarget.classList.remove('hidden')
    this.inlineCardFormTarget.classList.add('hidden')
  }

  cardTargetConnected(cardElement) {
    if (this.isCardBeingCreated()) {
      cardElement.scrollIntoView({ behavior: "instant", block: "end" })
      this.inlineCardFormTitleTarget.value = ''
    }
  }

  isCardBeingCreated() {
    return !this.inlineCardFormTarget.classList.contains('hidden')
  }

  closeForm() {
    this.hideInlineCardForm();
  }

  nWasPressed(e) {
    if (document.activeElement == document.body && this.element.matches(':hover')) {
      e.preventDefault()
      this.showInlineCardForm()
    }
  }
}
