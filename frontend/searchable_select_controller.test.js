jest.mock('@hotwired/stimulus', () => ({
  Controller: class {}
}), { virtual: true })

import SearchableSelectController from '../app/javascript/controllers/searchable_select_controller'

function buildController(element) {
  const controller = new SearchableSelectController()
  controller.element = element
  return controller
}

it('maps local optgroups into flat grouped react props', () => {
  document.body.innerHTML = `
    <select data-controller="searchable-select" multiple>
      <option value="">None</option>
      <optgroup label="Team A">
        <option value="1" selected>Alpha</option>
        <option value="2">Beta</option>
      </optgroup>
      <option value="3">Gamma</option>
    </select>
  `

  const select = document.querySelector('select')
  const controller = buildController(select)

  controller.connect()

  const props = JSON.parse(controller.container.getAttribute('data-react-props'))

  expect(props.options).toEqual([
    { value: '', label: 'None', group: null },
    { value: '1', label: 'Alpha', group: 'Team A' },
    { value: '2', label: 'Beta', group: 'Team A' },
    { value: '3', label: 'Gamma', group: null }
  ])
  expect(props.selectedValues).toEqual(['1'])
})

it('passes through the configurable ajax group key', () => {
  document.body.innerHTML = `
    <select
      data-controller="searchable-select"
      data-searchable-select-url="/options.json"
      data-searchable-select-group-key="section_name"
    >
      <option value="1">Alpha</option>
    </select>
  `

  const select = document.querySelector('select')
  const controller = buildController(select)

  controller.connect()

  const props = JSON.parse(controller.container.getAttribute('data-react-props'))

  expect(props.groupKey).toBe('section_name')
  expect(props.url).toBe('/options.json')
})
