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

  onGroupingMove(grouping) {
    const { id, position } = grouping

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

  onCardMove(data) {
    const { from, to } = data
    const isMoveWithinSameGrouping = from.group === to.group

    const columnControllers = this.columnTargets.map(this._getVisualizationBoardColumnController.bind(this))
    const originController = columnControllers.find(controller => controller.groupingIdValue === from.group)
    const destinationController = columnControllers.find(controller => controller.groupingIdValue === to.group)

    const originCard = originController.getCardOn(from.position - 1)

    if (isMoveWithinSameGrouping) {
      const destinationCard = originController.getCardOn(to.position - 1)

      this._moveWithinSameGrouping({ from, to, originEl: originCard, destinationEl: destinationCard })
    } else {
      destinationController.putCardOn(originCard, to.position - 1)
    }
  }

  _moveWithinSameGrouping({ from, to, originEl, destinationEl }) {
    if (from.position > to.position) {
      destinationEl.insertAdjacentElement('beforebegin', originEl)
    } else {
      destinationEl.insertAdjacentElement('afterend', originEl)
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
