import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const url = this.element.dataset.searchableSelectUrl || null
    const valueKey = this.element.dataset.searchableSelectValueKey || 'id'
    const labelKey = this.element.dataset.searchableSelectLabelKey || 'title'

    const selectedValues = Array.from(this.element.selectedOptions).map(o => o.value)
    const multiple = this.element.multiple

    let options = []
    if (!url) {
      options = Array.from(this.element.options).map(o => ({
          value: o.value,
          label: o.text
        }))
    }

    this.element.style.display = 'none'

    this.container = document.createElement('div')
    this.container.className = 'grow w-full'
    this.container.setAttribute('data-react-class', 'SearchableSelect')
    const size = this.element.dataset.searchableSelectSize || 'md'

    const blankOption = Array.from(this.element.options).find(o => o.value === '')
    const includeBlank = blankOption ? blankOption.text : ''

    const props = {
      options,
      selectedValues,
      multiple,
      includeBlank,
      placeholder: this.element.getAttribute('placeholder') || '',
      size,
      autoOpen: this.element.hasAttribute('autofocus')
    }

    if (url) {
      props.url = url
      props.valueKey = valueKey
      props.labelKey = labelKey
    }

    this.container.setAttribute('data-react-props', JSON.stringify(props))

    this.element.insertAdjacentElement('afterend', this.container)

    this._handleChange = this.handleChange.bind(this)
    this.container.addEventListener('searchable-select:change', this._handleChange)

    this._isAjax = !!url
  }

  handleChange(event) {
    const { selectedValues } = event.detail

    if (this._isAjax) {
      // In AJAX mode, options may not exist in the DOM yet — sync them
      const existingValues = new Set(Array.from(this.element.options).map(o => o.value))

      selectedValues.forEach(value => {
        if (!existingValues.has(value)) {
          const option = document.createElement('option')
          option.value = value
          option.text = value
          this.element.appendChild(option)
        }
      })
    }

    Array.from(this.element.options).forEach(option => {
      option.selected = selectedValues.includes(option.value)
    })

    this.element.dispatchEvent(new Event('change', { bubbles: true }))
  }

  disconnect() {
    if (this.container) {
      this.container.removeEventListener('searchable-select:change', this._handleChange)
      this.container.remove()
    }
  }
}
