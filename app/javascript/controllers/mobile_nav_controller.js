import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["toggle", "panel"]

  connect() {
    this.desktopQuery = window.matchMedia("(min-width: 64rem)")
    this.closeOnDesktop = (e) => {
      if (e.matches) this.close()
    }
    this.desktopQuery.addEventListener("change", this.closeOnDesktop)
  }

  disconnect() {
    this.desktopQuery.removeEventListener("change", this.closeOnDesktop)
  }

  toggled() {
    if (this.toggleTarget.checked) {
      this.returnFocusTo = this.focusOrigin()
      this.focusFirstLink()
    } else {
      this.returnFocusTo?.focus({ preventScroll: true })
      this.returnFocusTo = null
    }
  }

  close() {
    if (!this.toggleTarget.checked) return

    this.toggleTarget.checked = false
    this.toggled()
  }

  closeFromLink(e) {
    if (e.target.closest("a")) this.close()
  }

  activateTrigger(e) {
    const trigger = e.target.closest?.(`label[for="${this.toggleTarget.id}"]`)
    if (!trigger) return

    e.preventDefault()
    trigger.click()
  }

  focusOrigin() {
    const active = document.activeElement
    if (active && active !== document.body && !this.element.contains(active)) return active

    return this.externalTrigger()
  }

  externalTrigger() {
    return [...document.querySelectorAll(`label[for="${this.toggleTarget.id}"]`)]
      .find((label) => !this.element.contains(label))
  }

  trapFocus(e) {
    if (e.key !== "Tab" || !this.toggleTarget.checked) return

    const focusable = this.focusableElements()
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement

    if (!this.panelTarget.contains(active)) {
      e.preventDefault()
      first.focus()
    } else if (e.shiftKey && active === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  focusableElements() {
    return [...this.panelTarget.querySelectorAll("a[href], button:not([disabled]), summary, [tabindex]:not([tabindex='-1'])")]
      .filter((element) => element.getClientRects().length > 0)
  }

  focusFirstLink() {
    const link = this.panelTarget.querySelector("a")
    if (!link) return

    link.focus({ preventScroll: true })
    if (document.activeElement === link) return

    setTimeout(() => {
      if (this.toggleTarget.checked) link.focus({ preventScroll: true })
    }, 150)
  }
}
