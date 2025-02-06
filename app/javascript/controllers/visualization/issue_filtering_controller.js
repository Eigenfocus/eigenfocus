import { Controller } from "@hotwired/stimulus";

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")  // Decompose characters to their basic form
    .replace(/[\u0300-\u036f]/g, "");  // Remove diacritical marks (accents)
}

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
    const title = normalizeText(issue.querySelector("[data-issue-title]").textContent.toLowerCase())
    return title.includes(this.searchTerm)
  }

  #matchesLabels(issue) {
    const labels = [...issue.querySelectorAll("[data-issue-label]")].map(label => normalizeText(label.textContent.toLowerCase()))
    return labels.some(label => label.includes(this.searchTerm))
  }

  get searchTerm() {
    return normalizeText(this.searchInputTarget.value.toLowerCase());
  }
}