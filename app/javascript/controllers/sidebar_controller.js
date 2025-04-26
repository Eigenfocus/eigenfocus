import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "backdrop",
    "sidebar",
    "pinSidebarButton",
    "unpinSidebarButton"
  ]

  connect() {
    const sidebarShouldBeExpanded = this.getSavedSidebarExpandedPreference()

    this.sidebarTarget.addEventListener("mouseenter", (e) => {
      if (this.savedPreferenceIsSidebarExpanded) {
        return;
      }
      this.expand()
    })

    this.sidebarTarget.addEventListener("mouseleave", (e) => {
      if (this.savedPreferenceIsSidebarExpanded) {
        return;
      }

      this.collapse()
    })

    this.renderPins()

    this.setSidebarExpanded(this.savedPreferenceIsSidebarExpanded)
  }

  expand() {
    if (this.openedAsMenu) {
      return;
    }
    this.setSidebarExpanded(true);
  }

  collapse() {
    if (this.openedAsMenu) {
      return;
    }
    this.setSidebarExpanded(false);
  }

  setSidebarExpanded(value) {
    if (value) {
        document.querySelector("body").classList.add("sidebar-expanded")
    } else {
        document.querySelector("body").classList.remove("sidebar-expanded")
    }
  }

  pinSidebar() {
    this.saveSidebarExpandedPreference(true)
    this.setSidebarExpanded(true)
    this.renderPins()
  }

  unpinSidebar() {
    this.saveSidebarExpandedPreference(false)
    this.setSidebarExpanded(false)
    this.renderPins()
  }

  renderPins() {
    if (this.savedPreferenceIsSidebarExpanded) {
      this.pinSidebarButtonTarget.classList.add("hidden")
      this.unpinSidebarButtonTarget.classList.remove("hidden")
    } else {
      this.pinSidebarButtonTarget.classList.remove("hidden")
      this.unpinSidebarButtonTarget.classList.add("hidden")
    }
  }

  toggleSidebarMenu(e) {
    if (this.openedAsMenu) {
      this.closeAsMenu(e)
    } else {
      this.openAsMenu(e)
    }
  }

  openAsMenu(e) {
    this.openedAsMenu = true

    this.sidebarCloseHandler = ({ target }) => {
      this.closeAsMenu(e);
    };

    e.stopPropagation();
    this.setSidebarExpanded(true);
    this.backdropTarget.classList.remove("hidden");
    this.sidebarTarget.classList.add("-translate-x-0");
    this.sidebarTarget.classList.remove("-translate-x-64");
    this.backdropTarget.addEventListener("click", this.sidebarCloseHandler);
  }

  closeAsMenu(e) {
    e.stopPropagation();
    this.openedAsMenu = false
    this.backdropTarget.classList.add("hidden");
    this.sidebarTarget.classList.remove("-translate-x-0");
    this.sidebarTarget.classList.add("-translate-x-64");
    this.backdropTarget.removeEventListener("click", this.sidebarCloseHandler);
  }

  getSavedSidebarExpandedPreference() {
    return localStorage.getItem("sidebar-expanded")
  }

  saveSidebarExpandedPreference(value) {
    localStorage.setItem("sidebar-expanded", value)
  }

  get savedPreferenceIsSidebarExpanded() {
    const preference = this.getSavedSidebarExpandedPreference()
    return preference === null ? true : preference === "true"
  }

}
