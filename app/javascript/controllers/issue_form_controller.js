import { Controller } from "@hotwired/stimulus";
import { marked } from "marked";

export default class extends Controller {
  static targets = [ "descriptionPreview", "descriptionInput" ]

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
        return marked.parse(plainText);
      }
    });

    this._simplemde.codemirror.on("change", () => {
      this.descriptionInputTarget.value = this._simplemde.value();
      this.descriptionPreviewTarget.innerHTML = marked.parse(this._simplemde.value());
    });
  }
}
