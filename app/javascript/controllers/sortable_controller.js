import { Controller } from "@hotwired/stimulus"
import Sortable from 'sortablejs'
import { FetchRequest } from '@rails/request.js'
import consumer from "channels/consumer"

const SELECTED_CONTAINER_CSS_CLASS = 'sortable-selected-container'

export default class extends Controller {
  static targets = ['container']
  static values = {
    movePath: String,
    sharedGroup: String,
    groupingId: String,
    ignoreDragSelector: String,
    ancestorContainerSelector: String,
    liveUpdateChannel: String,
    liveUpdateChannelParams: { type: Object, default: {} }
  }

  connect() {
    this.tabId = this._getOrInitializeTabId()
    this.sortable = new Sortable(this.containerTarget, {
      scroll: true, // Enable the plugin. Can be HTMLElement
      animation: 150,
      emptyInsertThreshold: 30,
      group: this.sharedGroupValue,
      filter: this.ignoreDragSelectorValue,
      preventOnFilter: true,
      onEnd: this.onDragEnd.bind(this),
      onMove: this.onMove.bind(this)
    })

    if (this.liveUpdateChannelValue) {
      const subscriptionConfig = {
        channel: this.liveUpdateChannelValue,
        ...this.liveUpdateChannelParamsValue
      }
      this.subscription = consumer.subscriptions.create(subscriptionConfig, {
        received: this.onLiveUpdate.bind(this)
      })
    }
  }

  onDragEnd(evt) {
    this._clearSelectedContainer()

    let didGroupingChanged = evt.from.dataset.sortableGroupingIdValue !== evt.to.dataset.sortableGroupingIdValue
    let didPositionChanged = evt.oldIndex !== evt.newIndex

    let didItemReallyMove = didGroupingChanged || didPositionChanged

    if (didItemReallyMove) {
      this._performMoveRequest(evt)
    }
  }

  _performMoveRequest(evt) {
    const request = new FetchRequest('post', this.movePathValue, {
      headers: {
        "Accept": "text/vnd.turbo-stream.html", // Tell the server to respond with Turbo Stream
      },
      body: JSON.stringify({
        origin: this.tabId,
        from: {
          group: evt.from.dataset.sortableGroupingIdValue,
          position: evt.oldIndex + 1
        },
        to: {
          group: evt.to.dataset.sortableGroupingIdValue,
          position: evt.newIndex + 1
        }
      })
    })

    return request.perform()
  }

  onMove(evt) {
    const targetElement = evt.related; // Element that is the current drop target
    if (this.ignoreDragSelectorValue && targetElement.matches(this.ignoreDragSelectorValue)) {
      return false
    }

    if (this.ancestorContainerSelectorValue) {
      this._clearSelectedContainer()

      this.container = evt.to.closest(this.ancestorContainerSelectorValue)

      if (this.container) {
        this.container.classList.add(SELECTED_CONTAINER_CSS_CLASS)
      }
    }
  }

  onLiveUpdate(data) {
    const isEventFromThisTab = this.tabId === data.origin
    if (isEventFromThisTab) return

    const isMovementWithinSameGroup = data.from.group === data.to.group
    const doesCardNeedsToBePushed = this.groupingIdValue === data.from.group

    if (isMovementWithinSameGroup) {
      this._moveElementsWithinSameGroup(data)
    } else if (doesCardNeedsToBePushed) {
      this._pushElementAnotherContainer(data)
    }
  }

  _moveElementsWithinSameGroup(data) {
    // Reorder with default sortable sort method
    const list = this.sortable.toArray()
    const element = list[data.from.position - 1]
    list.splice(data.from.position - 1, 1)
    list.splice(data.to.position - 1, 0, element)
    this.sortable.sort(list, true)
  }

  _pushElementAnotherContainer(data) {
    // Needs to push element from this container to another one
    // As SortableJS doesn't offer a way to do it, we do it manually
    const elementToPush = this.containerTarget.children[data.from.position - 1]
    const targetContainer = this._getPushTargetContainer(data)

    const targetSiblings = targetContainer.children
    const isDesiredPositionAlreadyOccupied = targetSiblings.length >= data.to.position - 1

    if (isDesiredPositionAlreadyOccupied) {
      // Take that position
      const referenceElement = targetSiblings[data.to.position - 1]

      targetContainer.insertBefore(elementToPush, referenceElement)
    } else {
      // Just go to the end of the container
      targetContainer.appendChild(elementToPush)
    }
  }

  _getPushTargetContainer(data) {
    const containerDataSelector = '[data-sortable-target="container"]'
    const sortableGroupDataSelector = `[data-sortable-shared-group-value="${this.sharedGroupValue}"]`
    const groupingIdDataSelector = `[data-sortable-grouping-id-value="${data.to.group}"]`

    return document.querySelector(containerDataSelector + sortableGroupDataSelector + groupingIdDataSelector)
  }

  _clearSelectedContainer() {
    if (this.container) {
      this.container.classList.remove(SELECTED_CONTAINER_CSS_CLASS)
      this.container = null
    }
  }

  _getOrInitializeTabId() {
    return sessionStorage.tabID ? sessionStorage.tabID : sessionStorage.tabID = Math.random()
  }

  disconnect() {
    consumer.subscriptions.remove(this.subscription)
  }
}
