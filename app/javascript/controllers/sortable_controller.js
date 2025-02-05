import { Controller } from "@hotwired/stimulus"
import Sortable from 'sortablejs'
import { FetchRequest } from '@rails/request.js'

const SELECTED_CONTAINER_CSS_CLASS = 'sortable-selected-container'

export default class extends Controller {
  static targets = ['container']
  static values = {
    movePath: String,
    sharedGroup: String,
    groupingId: String,
    ignoreDragSelector: String,
    ancestorContainerSelector: String,
  }

  connect() {
    this.tabId = this._getOrInitializeTabId()
    this.sortable = new Sortable(this.containerTarget, {
      scroll: true, // Enable the plugin. Can be HTMLElement
      animation: 150,
      emptyInsertThreshold: 30,
      group: this.sharedGroupValue,
      filter: this.ignoreDragSelectorValue,
      onEnd: this.onDragEnd.bind(this),
      onMove: this.onMove.bind(this)
    })
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
    if (this.ancestorContainerSelectorValue) {
      this._clearSelectedContainer()

      this.container = evt.to.closest(this.ancestorContainerSelectorValue)

      if (this.container) {
        this.container.classList.add(SELECTED_CONTAINER_CSS_CLASS)
      }
    }
  }

  _clearSelectedContainer() {
    if (this.container) {
      this.container.classList.remove(SELECTED_CONTAINER_CSS_CLASS)
      this.container = null
    }
  }
}
