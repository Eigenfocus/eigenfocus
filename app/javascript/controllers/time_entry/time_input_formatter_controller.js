import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "placeholder", "tab"]
  static values = { format: String }

  connect() {
    this.updatePlaceholderValue()
    this.updatePlaceholderSettings()
    this.setupEventListeners()
  }

  setupEventListeners() {
    this.placeholderTarget.addEventListener('input', this.handlePlaceholderInput.bind(this))
  }

  selectFormat(event) {
    const format = event.currentTarget.dataset.format
    this.formatValue = format
    this.updateTabs()
    this.updatePlaceholderValue()
    this.updatePlaceholderSettings()
  }

  updatePlaceholderSettings() {
    switch (this.formatValue) {
      case 'hours':
        this.placeholderTarget.type = 'number'
        this.placeholderTarget.step = '0.01'
        this.placeholderTarget.min = '0'
        break
      default:
        this.placeholderTarget.type = 'number'
        this.placeholderTarget.step = '1'
        this.placeholderTarget.min = '0'
    }
  }

  updateTabs() {
    this.tabTargets.forEach(tab => {
      const isActive = tab.dataset.format === this.formatValue
      tab.classList.toggle('tab-item--active', isActive)
    })
  }

  updatePlaceholderValue() {
    const minutes = parseInt(this.inputTarget.value) || 0
    let displayValue = ''

    switch (this.formatValue) {
      case 'hours':
        displayValue = (minutes / 60).toFixed(2)
        break
      default:
        displayValue = minutes.toString()
    }

    this.placeholderTarget.value = displayValue
  }

  handlePlaceholderInput(event) {
    const value = event.target.value
    let minutes = 0

    switch (this.formatValue) {
      case 'hours':
        minutes = Math.round(parseFloat(value) * 60)
        break
      default:
        minutes = parseInt(value) || 0
    }

    this.inputTarget.value = minutes
  }
}