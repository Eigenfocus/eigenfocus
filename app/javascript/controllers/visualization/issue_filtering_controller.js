import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "searchInput",
    "issue"
  ];

  filterIssues() {
    this.issueTargets.forEach((issue) => {
      const hasMatch = this.#matchesTitle(issue) || this.#matchesLabels(issue)

      if (hasMatch) {
        issue.style.display = "block";
      } else {
        issue.style.display = "none";
      }
    })
  }

  #matchesTitle(issue) {
    const title = issue.querySelector("[data-issue-title]").textContent.toLowerCase()
    return title.includes(this.searchTerm)
  }
  #matchesLabels(issue) {
    const labels = [...issue.querySelectorAll("[data-issue-label]")].map(label => label.textContent.toLowerCase())
    return labels.some(label => label.includes(this.searchTerm))
  }

  get searchTerm() {
    return this.searchInputTarget.value.toLowerCase();
  }
}