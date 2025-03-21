import { Controller } from "@hotwired/stimulus"
import { marked } from "marked"

export default class extends Controller {
  static targets = [
    "card",
    "cardContainer",
    "showFormButton",
    "inlineCardForm",
    "inlineCardFormTitle"
  ]

  static values = {
    scrollToOnConnect: Boolean,
    groupingId: String
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
    this.element.classList.add('card-form-showing')
    this.inlineCardFormTitleTarget.focus()
  }

  hideInlineCardForm() {
    this.element.classList.remove('card-form-showing')
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

  getCardById(id) {
    return this.cardTargets.find(cardTarget => {
      return cardTarget.getAttribute("data-grouping-column-issue-id-value") == id
    })
  }

  addCard(card, position) {
    const isCardFromThisColumn = this.cardTargets.includes(card)

    if (isCardFromThisColumn) {
      this.#moveCardWithinColumn(card, position)
    } else {
      this.#addCardFromAnotherColumn(card, position)
    }
  }

  #moveCardWithinColumn(card, position) {
    const cardCurrentPosition = this.cardTargets.indexOf(card)
    const destinationCard = this.cardTargets[position]

    if (card == destinationCard) return;

    if (cardCurrentPosition > position) {
      destinationCard.insertAdjacentElement('beforebegin', card)
    } else {
      destinationCard.insertAdjacentElement('afterend', card)
    }
  }

  #addCardFromAnotherColumn(card, position) {
    const isColumnEmpty = this.cardTargets.length === 0
    const shouldCardGoToLastPosition = this.cardTargets.length === position

    if (isColumnEmpty || shouldCardGoToLastPosition) {
      this.cardContainerTarget.append(card)
    } else {
      // Card should take the position of another card
      const destinationCard = this.cardTargets[position]

      if (card == destinationCard) return;

      destinationCard.insertAdjacentElement('beforebegin', card)
    }
  }
}
