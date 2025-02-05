import { Controller } from "@hotwired/stimulus"
import consumer from "channels/consumer"

export default class extends Controller {
  static targets = ['column']
  static values = {
    visualizationId: String,
  }

  connect() {
    this.tabId = this._getOrInitializeTabId()

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

  onGroupingMove(data) {
    if (this._isEventFromThisTab(data)) return

    const { from, to } = data
    const originColumn = this.columnTargets[from.position - 1]
    const destinationColumn = this.columnTargets[to.position - 1]

    this._moveWithinSameGrouping({
      from,
      to,
      originEl: originColumn,
      destinationEl: destinationColumn
    })
  }

  onCardMove(data) {
    if (this._isEventFromThisTab(data)) return

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

  _isEventFromThisTab(data) {
    return this.tabId === data.origin
  }

  _getOrInitializeTabId() {
    return sessionStorage.tabID ? sessionStorage.tabID : sessionStorage.tabID = Math.random()
  }

  disconnect() {
    consumer.subscriptions.remove(this.groupingsSubscription)
    consumer.subscriptions.remove(this.allocationsSubscription)
  }
}
