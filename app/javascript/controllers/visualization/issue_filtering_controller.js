import { Controller } from "@hotwired/stimulus"
import  Fuse  from 'fuse.js'

const fuseOptions = {
  isCaseSensitive: false,
  // includeScore: false,
  // ignoreDiacritics: false,
  // shouldSort: true,
  // includeMatches: false,
  findAllMatches: true, //show all matches
  // minMatchCharLength: 1,
  // location: 0,
  threshold: 0.42,
  // distance: 100,
  // useExtendedSearch: false,
  ignoreLocation: true, // matches anywhere
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    "title",
    "labels"
  ]
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
      this.issueTargets.forEach(issue => (issue.style.display = "block"));
      return;
    }

    const issuesMatches = this.fuse.search(this.searchTerm).map(result => result.item.issue)

    this.issueTargets.forEach(issue => {
      issue.style.display = issuesMatches.includes(issue) ? "block" : "none"
    });
  }

  issueTargetConnected(issue) {
    this.#addIssueToFuse(issue);
  }

  get searchTerm() {
    return this.searchInputTarget.value.trim()
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
      labels: [...issue.querySelectorAll("[data-issue-label]")].map(label => label.textContent.toLowerCase()),
      issue
    }

    this.fuse.add(issueData);
  }

}