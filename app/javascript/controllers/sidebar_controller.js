import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["backdrop", "sidebar"]

  connect() {
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded")

    const isSidebarExpanded = (storedSidebarExpanded === null) ?
        true :
        (storedSidebarExpanded === "true")

    this.setSidebarExpanded(isSidebarExpanded)
  }

  expand() {
    this.setSidebarExpanded(true);
  }

  setSidebarExpanded(value) {
    localStorage.setItem("sidebar-expanded", value)
    if (value) {
        document.querySelector("body").classList.add("sidebar-expanded")
    } else {
        document.querySelector("body").classList.remove("sidebar-expanded")
    }
  }

  toogleSidebarExpanded() {
    const isSidebarExpanded = document.querySelector("body").classList.contains("sidebar-expanded")
    this.setSidebarExpanded(!isSidebarExpanded)
  }

  open(e) {
    this.sidebarCloseHandler = ({ target }) => {
      if (this.sidebarTarget.contains(target)) {
        return;
      }
      this.close(e);
    };

    e.stopPropagation();
    this.setSidebarExpanded(true);
    this.backdropTarget.classList.remove("hidden");
    this.sidebarTarget.classList.add("-translate-x-0");
    this.sidebarTarget.classList.remove("-translate-x-64");
    document.addEventListener("click", this.sidebarCloseHandler);
  }

  close(e) {
    e.stopPropagation();
    this.backdropTarget.classList.add("hidden");
    this.sidebarTarget.classList.remove("-translate-x-0");
    this.sidebarTarget.classList.add("-translate-x-64");
    document.removeEventListener("click", this.sidebarCloseHandler);
  }

}
