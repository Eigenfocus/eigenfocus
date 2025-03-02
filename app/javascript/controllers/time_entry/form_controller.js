import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["allIssuesLink", "issueLink", "issuesSelect"]

  connect() {
    this.toggleIssueLinks()
  }

  toggleIssueLinks() {
    const hasIssue = this.selectedIssueId !== ''
    this.updateIssueLinks()
    this.allIssuesLinkTarget.classList.toggle('hidden', hasIssue)
    this.issueLinkTarget.classList.toggle('hidden', !hasIssue)
  }

  updateIssueLinks() {
    if (this.selectedIssueId) {
      const newUrl = this.issueLinkTarget.dataset.issueUrl.replace('REPLACE_WITH_ISSUE_ID', this.selectedIssueId)
      this.issueLinkTarget.href = newUrl
    }
  }

  get selectedIssueId() {
    return this.issuesSelectTarget.value
  }
}