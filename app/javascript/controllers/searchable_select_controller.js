import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const options = Array.from(this.element.options)
      .filter(o => o.value !== '')
      .map(o => ({
        value: o.value,
        label: o.text
      }))

    const selectedValues = Array.from(this.element.selectedOptions)
      .filter(o => o.value !== '')
      .map(o => o.value)
    const multiple = this.element.multiple

    this.element.style.display = 'none'

    this.container = document.createElement('div')
    this.container.className = 'grow w-full'
    this.container.setAttribute('data-react-class', 'SearchableSelect')
    this.container.setAttribute('data-react-props', JSON.stringify({
      options,
      selectedValues,
      multiple,
      placeholder: this.element.getAttribute('placeholder') || ''
    }))

    this.element.insertAdjacentElement('afterend', this.container)

    this.container.addEventListener('searchable-select:change', this.handleChange.bind(this))
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
      this.container.removeEventListener('searchable-select:change', this.handleChange.bind(this))
      this.container.remove()
    }
  }
}
