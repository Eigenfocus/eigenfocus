import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['cardContainer', 'card']
  static values = {
    groupingId: String
  }

  getCardOn(position) {
    return this.cardTargets[position]
  }

  putCardOn(card, position) {
    const isColumnEmpty = this.cardTargets.length === 0
    const shouldCardGoToLastPosition = this.cardTargets.length === position

    if (isColumnEmpty || shouldCardGoToLastPosition) {
      this.cardContainerTarget.append(card)
    } else {
      // Card should take the position of another card
      const destinationCard = this.cardTargets[position]

      destinationCard.insertAdjacentElement('beforebegin', card)
    }
  }
}
