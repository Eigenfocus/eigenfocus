import { Controller } from "@hotwired/stimulus"
import  Fuse  from 'fuse.js'

const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // ignoreDiacritics: false,
  // shouldSort: true,
  // includeMatches: false,
  findAllMatches: true, //show all matches
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  ignoreLocation: true, // matches anywhere
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    "title"
  ]
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")        // Decompose characters to their base form
    .replace(/[\u0300-\u036f]/g, "");  // Remove diacritical marks (accents)
}

export default class extends Controller {
  static targets = [
    "searchInput",
    "issue"
  ]

  initialize() {
    this.fuse = new Fuse([], fuseOptions)
  }

  filterIssues() {
    if (this.searchTerm === "") {
      this.issueTargets.forEach(issue => (issue.dataset.isIssueSearchMatch = true));
      return;
    }

    const titleMatches = this.fuse.search(this.searchTerm).map(result => result.item.issue)

    const labelMatches = this.fuse._docs.filter(fuseItem =>
      this.searchTerms.some((term) => fuseItem.labels.some((label) => label.includes(term)))
    ).map(fuseItem => fuseItem.issue)

    this.issueTargets.forEach(issue => {
      issue.dataset.isIssueSearchMatch = titleMatches.includes(issue) || labelMatches.includes(issue)
    });
  }

  issueTargetConnected(issue) {
    this.#addIssueToFuse(issue);
  }

  get searchTerm() {
    return normalizeText(this.searchInputTarget.value.trim())
  }

  get searchTerms() {
    return this.searchTerm.split(/\s+/)
  }

  issueTargetConnected(issue) {
    this.#addIssueToFuse(issue);
  }

  issueTargetDisconnected(issue) {
    this.fuse.remove(fuseItem => fuseItem.issue === issue);
  }

  #addIssueToFuse(issue) {
    const issueData = {
      title: issue.querySelector("[data-issue-title]").textContent.toLowerCase(),
      labels: [...issue.querySelectorAll("[data-issue-label]")].map(label => normalizeText(label.textContent.toLowerCase())),
      issue
    }

    this.fuse.add(issueData);
  }

}