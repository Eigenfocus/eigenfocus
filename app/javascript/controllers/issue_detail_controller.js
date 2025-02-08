import { Controller } from "@hotwired/stimulus";
import { marked } from "marked";
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static targets = [
    "form",
    "titleField",
    "descriptionPreview",
    "descriptionInput",
    "showEditorButton",
    "showPreviewButton"
  ]

  static values = {
    attachPath: String,
    pathForModalClosed: String,
    submitOnTitleChange: { type: Boolean, default: true }
  }

  connect() {
    this._simplemde = new SimpleMDE({
      element: this.descriptionInputTarget,
      spellChecker: false,
      showIcons: [
        "code",
        "table"

      ],
      hideIcons: [
        "preview",
        "fullscreen",
        "side-by-side",
        "guide"
      ],
      previewRender: (plainText, preview) => {
        window.test = marked.parse(plainText)
        return marked.parse(plainText);
      },
      status: []
    });

    this._simplemde.codemirror.on("change", () => {
      this.descriptionInputTarget.value = this._simplemde.value();
      this.descriptionPreviewTarget.innerHTML = marked.parse(this._simplemde.value());
    });
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

  enablePreview() {
    this._simplemde.togglePreview();
    this.showPreviewButtonTarget.classList.add("hidden")
    this.showEditorButtonTarget.classList.remove("hidden")
  }

  disablePreview() {
    this._simplemde.togglePreview();
    this.showPreviewButtonTarget.classList.remove("hidden")
    this.showEditorButtonTarget.classList.add("hidden")
  }

  fileUploadCompleted(e) {
    const fileSignedId = e.detail.args[0].signed_id

    const request = new FetchRequest('post', this.attachPathValue, {
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
    button.querySelector(".fa-check").classList.remove('hidden')
    button.querySelector(".fa-copy").classList.add('hidden')
    setTimeout(() => {
      button.querySelector(".fa-check").classList.add('hidden')
      button.querySelector(".fa-copy").classList.remove('hidden')
    }, 1500)
  }

  goBackHistory() {

    Turbo.visit(this.pathForModalClosedValue, {
      action: 'advance',
      // Rendering in a frame prevents the page reloading
      // This also keeps the restoration visits (back button)
      // working. But if the user goes back to a state showing
      // only the board the horizontal scroll is affected
      // https://turbo.hotwired.dev/handbook/drive#restoration-visits
      frame: 'issue'
    })
  }
}
