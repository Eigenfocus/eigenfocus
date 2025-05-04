import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["allIssuesLink", "issueLink", "issuesSelect"]

  connect() {
    this.toggleIssueLinks()
  }

  toggleIssueLinks() {
    const hasIssue = this.hasIssuesSelectTarget && (this.selectedIssueId !== '')

    if (hasIssue) {
      this.updateIssueLinks()
    }

    this.hasAllIssuesLinkTarget && this.allIssuesLinkTarget.classList.toggle('hidden', hasIssue)
    this.hasIssueLinkTarget && this.issueLinkTarget.classList.toggle('hidden', !hasIssue)
  }

  updateIssueLinks() {
    if (this.selectedIssueId) {
      const newUrl = this.issueLinkTarget.dataset.issueUrl.replace('REPLACE_WITH_ISSUE_ID', this.selectedIssueId)
      this.issueLinkTarget.href = newUrl
    }
  }

  disconnect() {
    this.continueTour()
  }

  continueTour() {
    if (window.appTour) {
      window.appTour.startIfPending("time_entries/index");
    }
  }

  get selectedIssueId() {
    return this.issuesSelectTarget.value
  }
}