import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.timeout = setTimeout(() => { this.closeMessage() }, 3000);
    this.element.classList.add("showing");
  }

  closeMessage() {
    clearTimeout(this.timeout);

    this.element.classList.add("closed");

    this.element.addEventListener('transitionend', () => {
      this.element.remove();
    });

  }
}
