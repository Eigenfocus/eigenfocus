import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

export default class extends Controller {
  static targets = ['column']
  static values = {
    visualizationId: String,
  }

  connect() {
    this.groupingsSubscription = this._subscribeToGroupings()
    this.allocationsSubscription = this._subscribeToAllocations()
  }

  _subscribeToGroupings() {
    return consumer.subscriptions.create({
      channel: "Visualizations::GroupingsChannel",
      visualization_id: this.visualizationIdValue
    }, {
      received: this.onGroupingMove.bind(this)
    })
  }

  _subscribeToAllocations() {
    return consumer.subscriptions.create({
      channel: "Visualizations::AllocationsChannel",
      visualization_id: this.visualizationIdValue
    }, {
      received: this.onCardMove.bind(this)
    })
  }

  onGroupingMove({ id, position }) {
    const movingColumn = this._findColumnByGroupingId(id)
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

  _findColumnByGroupingId(id) {
    return this.columnTargets.find(columnTarget => {
      const controller = this._getVisualizationBoardColumnController(columnTarget)
      return controller.groupingIdValue == id
    })
  }

  onCardMove({ issue_id, grouping_id, position }) {
    const destinationColumn = this._findColumnByGroupingId(grouping_id)

    const movingCard = this._findCardByIssueId(issue_id)
    const movingCardNewPosition = position - 1 // Positioning gem use indexes starting on 1

    const destinationController = this._getVisualizationBoardColumnController(destinationColumn)

    destinationController.addCard(movingCard, movingCardNewPosition)
  }

  _findCardByIssueId(id) {
    for (let columnTarget of this.columnTargets) {
      const controller = this._getVisualizationBoardColumnController(columnTarget)
      const card = controller.getCardById(id)
      if (card) return card
    }
  }

  _getVisualizationBoardColumnController(columnTarget) {
    return this.application.getControllerForElementAndIdentifier(
      columnTarget,
      'visualization--board--column'
    )
  }

  disconnect() {
    consumer.subscriptions.remove(this.groupingsSubscription)
    consumer.subscriptions.remove(this.allocationsSubscription)
  }
}
