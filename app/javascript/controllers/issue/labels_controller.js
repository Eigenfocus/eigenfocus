import { Controller } from "@hotwired/stimulus"
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static values = {
    addPath: String,
    removePath: String
  }

  connect() {
    $(this.element).on('select2:select', (e) => {
      this.addLabel(e.params.data.text)
    })

    $(this.element).on('select2:unselect', (e) => {
      this.removeLabel(e.params.data.text)
    })

  }

  addLabel(labelTitle) {
    const request = new FetchRequest('post', this.addPathValue, {
      body: JSON.stringify({
        label: { title: labelTitle }
      })
    })

    return request.perform()
  }

  removeLabel(labelTitle) {
    const request = new FetchRequest('delete', this.removePathValue, {
      body: JSON.stringify({
        label: { title: labelTitle }
      })
    })

    return request.perform()
  }
}
