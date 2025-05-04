import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["formSection", "showFormButton"]

  showForm() {
    this.formSectionTarget.classList.remove('hidden')
    this.showFormButtonTarget.classList.add('hidden')
    this.formSectionTarget.querySelector('textarea').focus()
  }

  hideForm() {
    this.formSectionTarget.classList.add('hidden')
    this.showFormButtonTarget.classList.remove('hidden')
  }
}
