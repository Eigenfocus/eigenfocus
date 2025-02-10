import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

export default class extends Controller {
  static targets = ['column']
  static values = {
    visualizationId: String,
    signedGroupingsStreamToken: String,
    signedAllocationsStreamToken: String
  }

  connect() {
    this.groupingsSubscription = this.#subscribeToGroupings()
    this.allocationsSubscription = this.#subscribeToAllocations()
  }

  #subscribeToGroupings() {
    return consumer.subscriptions.create({
      channel: "Visualizations::GroupingsChannel",
      visualization_id: this.visualizationIdValue,
      action: 'update',
      token: this.signedGroupingsStreamTokenValue
    }, {
      received: this.onGroupingUpdate.bind(this)
    })
  }

  #subscribeToAllocations() {
    return consumer.subscriptions.create({
      channel: "Visualizations::AllocationsChannel",
      visualization_id: this.visualizationIdValue,
      action: 'update',
      token: this.signedAllocationsStreamTokenValue
    }, {
      received: this.onCardMove.bind(this)
    })
  }

  onGroupingUpdate({ id, position }) {
    const movingColumn = this.#findColumnByGroupingId(id)
    const movingColumnCurrentPosition = this.columnTargets.indexOf(movingColumn)
    const movingColumnNewPosition = position - 1 // Positioning gem use indexes starting on 1

    const destinationColumn = this.columnTargets[movingColumnNewPosition]

    if (movingColumn == destinationColumn) return;

    if (movingColumnCurrentPosition > movingColumnNewPosition) {
      destinationColumn.insertAdjacentElement('beforebegin', movingColumn)
    } else {
      destinationColumn.insertAdjacentElement('afterend', movingColumn)
    }
  }

  #findColumnByGroupingId(id) {
    return this.columnTargets.find(columnTarget => {
      const controller = this.#getVisualizationBoardColumnController(columnTarget)
      return controller.groupingIdValue == id
    })
  }

  onCardMove({ issue_id, grouping_id, position }) {
    const destinationColumn = this.#findColumnByGroupingId(grouping_id)

    const movingCard = this.#findCardByIssueId(issue_id)
    const movingCardNewPosition = position - 1 // Positioning gem use indexes starting on 1

    const destinationController = this.#getVisualizationBoardColumnController(destinationColumn)

    destinationController.addCard(movingCard, movingCardNewPosition)
  }

  #findCardByIssueId(id) {
    for (let columnTarget of this.columnTargets) {
      const controller = this.#getVisualizationBoardColumnController(columnTarget)
      const card = controller.getCardById(id)
      if (card) return card
    }
  }

  #getVisualizationBoardColumnController(columnTarget) {
    return this.application.getControllerForElementAndIdentifier(
      columnTarget,
      'grouping-column'
    )
  }

  disconnect() {
    consumer.subscriptions.remove(this.groupingsSubscription)
    consumer.subscriptions.remove(this.allocationsSubscription)
  }
}
