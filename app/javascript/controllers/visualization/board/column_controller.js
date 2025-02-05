import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['cardContainer', 'card']
  static values = {
    groupingId: String
  }

  getCardById(id) {
    return this.cardTargets.find(cardTarget => {
      return cardTarget.getAttribute("data-visualization--board--column-issue-id-value") == id
    })
  }

  addCard(card, position) {
    const isCardFromThisColumn = this.cardTargets.includes(card)

    if (isCardFromThisColumn) {
      this._moveCardWithinColumn(card, position)
    } else {
      this._addCardFromAnotherColumn(card, position)
    }
  }

  _moveCardWithinColumn(card, position) {
    const cardCurrentPosition = this.cardTargets.indexOf(card)
    const destinationCard = this.cardTargets[position]

    if (card == destinationCard) return;

    if (cardCurrentPosition > position) {
      destinationCard.insertAdjacentElement('beforebegin', card)
    } else {
      destinationCard.insertAdjacentElement('afterend', card)
    }
  }

  _addCardFromAnotherColumn(card, position) {
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
