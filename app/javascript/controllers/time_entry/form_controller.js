import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["boardLink", "issueLink", "issuesSelect"]

  connect() {
    this.toggleLinks()
  }

  toggleLinks() {
    const hasIssue = this.issueIdValue !== ''
    this.updateLinks()
    console.log(this.issueIdValue)
    this.boardLinkTarget.classList.toggle('hidden', hasIssue)
    this.issueLinkTarget.classList.toggle('hidden', !hasIssue)
  }

  updateLinks() {
    if (this.issueIdValue) {
      const newUrl = this.issueLinkTarget.dataset.issueUrl.replace('REPLACE_WITH_ISSUE_ID', this.issueIdValue)
      this.issueLinkTarget.href = newUrl
    }
  }

  get issueIdValue() {
    return this.issuesSelectTarget.value
  }
}