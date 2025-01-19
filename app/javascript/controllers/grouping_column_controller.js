import { Controller } from "@hotwired/stimulus"
import { marked } from "marked"

export default class extends Controller {
  static targets = [
    "card",
    "showFormButton",
    "inlineCardForm",
    "inlineCardFormTitle"
  ]

  static values = {
    scrollToOnConnect: Boolean
  }

  connect() {
    if (this.scrollToOnConnectValue) {
      let board = this.element.parentNode
      const maxScrollX = board.scrollWidth - board.clientWidth;

      board.scrollTo({
        top: 0,
        left: maxScrollX,
        behavior: "instant"
      });

      // Without this, if we create and move the column after
      // it will cause buggy scroll with sortablejs
      this.scrollToOnConnectValue = false
    }
  }

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
    // Only scrolls to card when adding via inline form
    // and not when page is loaded (it would trigger for all cards)
    if (this.isCardBeingCreated()) {
      cardElement.scrollIntoView({ behavior: "instant", block: "end" })
      this.inlineCardFormTitleTarget.value = ''
      // Needed because of resizable input
      this.inlineCardFormTitleTarget.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  isCardBeingCreated() {
    return !this.inlineCardFormTarget.classList.contains('hidden')
  }

  submitInlineForm(e) {
    e.preventDefault()
    e.stopPropagation()
    this.inlineCardFormTarget.requestSubmit()
  }
  closeForm() {
    this.hideInlineCardForm()
  }

  nWasPressed(e) {
    if (document.activeElement == document.body && this.element.matches(':hover')) {
      e.preventDefault()
      this.showInlineCardForm()
    }
  }
}
