import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "formSection",
    "showFormButton",
    "comment"
  ]

  showForm() {
    this.formSectionTarget.classList.remove('hidden')
    this.showFormButtonTarget.classList.add('hidden')
  }

  hideForm() {
    this.formSectionTarget.classList.add('hidden')
    this.showFormButtonTarget.classList.remove('hidden')
  }

  commentTargetConnected(element) {
    const authorId = element.dataset.authorId
    const currentUserId = this.element.dataset.currentUserId

    if (authorId == currentUserId) {
      element.querySelector('.js-comment-actions').classList.remove('hidden')
    }
  }
}
