import { Popover } from "tailwindcss-stimulus-components"

export default class extends Popover {
  static targets = ['content']
  static values = {
    initialText: String,
    onCopyText: String
  }

  onCopy() {
    this.contentTarget.innerText = this.onCopyTextValue

    setTimeout(() => {
      this.contentTarget.innerText = this.initialTextValue
    }, 1000)
  }

  contentTargetConnected(element) {
    element.innerText = this.initialTextValue
  }
}
