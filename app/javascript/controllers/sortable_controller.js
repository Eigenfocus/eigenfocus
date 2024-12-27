import { Controller } from "@hotwired/stimulus"
import Sortable from 'sortablejs'
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
	static targets = ['container']
	static values = {
		movePath: String,
		group: { type: String, default: null }
	}

	connect() {
		this.sortable = new Sortable(this.containerTarget, {
			animation: 150,
			group: this.groupValue,
			onEnd: this.onDragEnd.bind(this)
		})
	}

	onDragEnd(evt) {
		const request = new FetchRequest('post', this.movePathValue, {
			body: JSON.stringify({
				from_position: {
					group_id: evt.from.dataset.sortableGroupIdValue,
					index: evt.oldIndex
				},
				to_position: {
					group_id: evt.to.dataset.sortableGroupIdValue,
					index: evt.newIndex
				}
			})
		})

		request.perform()
	}
}
