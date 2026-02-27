import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const options = Array.from(this.element.options).map(o => ({
      value: o.value,
      label: o.text
    }))

    const selectedValues = Array.from(this.element.selectedOptions).map(o => o.value)

    this.element.style.display = 'none'

    this.container = document.createElement('div')
    this.container.setAttribute('data-react-class', 'MultiSelect')
    this.container.setAttribute('data-react-props', JSON.stringify({
      options,
      selectedValues,
      placeholder: this.element.getAttribute('placeholder') || ''
    }))

    this.element.insertAdjacentElement('afterend', this.container)

    this.container.addEventListener('multi-select:change', this.handleChange.bind(this))
  }

  handleChange(event) {
    const { selectedValues } = event.detail

    Array.from(this.element.options).forEach(option => {
      option.selected = selectedValues.includes(option.value)
    })

    this.element.dispatchEvent(new Event('change', { bubbles: true }))
  }

  disconnect() {
    if (this.container) {
      this.container.removeEventListener('multi-select:change', this.handleChange.bind(this))
      this.container.remove()
    }
  }
}
