import { Controller } from "@hotwired/stimulus";
import { marked } from "marked";
import { FetchRequest } from '@rails/request.js'

export default class extends Controller {
  static targets = [
    "descriptionPreview",
    "descriptionInput",
    "showEditorButton",
    "showPreviewButton"
  ]

  static values = {
    attachPath: String
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
}
