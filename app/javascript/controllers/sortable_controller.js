import { Controller } from "@hotwired/stimulus"
import Sortable from 'sortablejs'
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static targets = ['container']
  static values = {
    movePath: String
  }

  connect() {
    this.sortable = new Sortable(this.containerTarget, {
      animation: 150,
      onEnd: this.onDragEnd.bind(this)
    })
  }

  onDragEnd(evt) {
    const request = new FetchRequest('post', this.movePathValue, {
      body: JSON.stringify({
        position: {
          from: evt.oldIndex,
          to: evt.newIndex
        }
      })
    })

    request.perform()
  }
}
