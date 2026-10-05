import { Controller } from "@hotwired/stimulus";
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static targets = [
    "form",
    "titleField",
  ]

  static outlets = [ "dropzone" ]

  static values = {
    attachPath: String,
    coverPath: String,
    pathForModalClosed: String,
    submitOnTitleChange: { type: Boolean, default: true }
  }

  onTitleFieldEnter(e) {
    e.preventDefault() // Do not allow textarea to capture the new line
    e.stopPropagation()
    this.handleTitleUpdate(e.currentTarget);
  }

  onTitleFieldEsc() {
    this.skipAutoSave = true
  }

  onTitleFieldBlur(e) {
    this.handleTitleUpdate(e.currentTarget);
  }

  handleTitleUpdate(titleField) {
    if (!this.submitOnTitleChangeValue) return;

    if (this.skipAutoSave) {
      this.skipAutoSave = false
      return
    }

    const titleChanged = this.lastTitleWas != titleField.value
    const shouldUpdate = titleChanged && titleField.value.trim() != ""

    if (shouldUpdate) {
      this.lastTitleWas = titleField.value
      this.formTarget.requestSubmit()
    }

    titleField.blur()
  }

  titleFieldTargetConnected(element) {
    this.lastTitleWas = element.value
  }

  uploadCover(e) {
    e.currentTarget.closest("details")?.removeAttribute("open")
    this.dropzoneOutlet.pickFile({ accept: e.params.accept, purpose: "cover" })
  }

  fileUploadCompleted(e) {
    const [blob, file] = e.detail.args
    const fileSignedId = blob.signed_id
    if (!fileSignedId) return

    const path = file?.purpose == "cover" ? this.coverPathValue : this.attachPathValue
    const request = new FetchRequest('post', path, {
      body: JSON.stringify({
        blob_signed_id: fileSignedId
      }),
      responseKind: "turbo-stream"
    })

    return request.perform()
  }

  copyToClipboard(e) {
    const button = e.currentTarget
    navigator.clipboard.writeText(e.params.fileUrl)
    button.querySelector(".ti-check").classList.remove('hidden')
    button.querySelector(".ti-copy").classList.add('hidden')
    setTimeout(() => {
      button.querySelector(".ti-check").classList.add('hidden')
      button.querySelector(".ti-copy").classList.remove('hidden')
    }, 1500)
  }

  goBackHistory() {
    if (!this.pathForModalClosedValue) return;

    Turbo.visit(this.pathForModalClosedValue, {
      action: 'advance',
      // Rendering in a frame prevents the page reloading
      // This also keeps the restoration visits (back button)
      // working. But if the user goes back to a state showing
      // only the board the horizontal scroll is affected
      // https://turbo.hotwired.dev/handbook/drive#restoration-visits
      frame: 'issue_detail'
    })
  }

  onFormSubmit({detail: detail}) {
    if (detail.success && this.closeOnSubmit) {
      this.closeOnSubmit = false
      this.goBackHistory()
    }
  }

}
