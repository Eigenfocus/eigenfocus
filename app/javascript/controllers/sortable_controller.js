import { Controller } from "@hotwired/stimulus"
import Sortable from 'sortablejs'
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static targets = ['container']
  static values = {
    movePath: String,
    sharedGroup: String,
    groupingId: String, // Not used by stimulus directly
    ignoreDragSelector: String
  }

  connect() {
    this.sortable = new Sortable(this.containerTarget, {
      animation: 150,
      group: this.sharedGroupValue,
      filter: this.ignoreDragSelectorValue,
      onEnd: this.onDragEnd.bind(this)
    })
  }

  onDragEnd(evt) {
    const request = new FetchRequest('post', this.movePathValue, {
      body: JSON.stringify({
        from: {
          group: evt.from.dataset.sortableGroupingId,
          position: evt.oldIndex + 1
        },
        to: {
          group: evt.to.dataset.sortableGroupingId,
          position: evt.newIndex + 1
        }
      })
    })

    request.perform()
  }
}
