import React from 'react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import SearchableSelect from './SearchableSelect'

jest.mock('i18n.js.erb', () => ({
  t: (key) => {
    const translations = {
      'searchable_select.search_placeholder': 'Search...',
      'searchable_select.no_results': 'No results found',
      'searchable_select.tab_available': 'Available',
      'searchable_select.tab_selected': 'Selected',
      'searchable_select.no_group': 'No group'
    }

    return translations[key] || key
  }
}), { virtual: true })

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    disconnect() {}
  }

  HTMLElement.prototype.scrollIntoView = jest.fn()
})

beforeEach(() => {
  global.fetch = undefined
  HTMLElement.prototype.scrollIntoView.mockClear()
})

const groupedOptions = [
  { value: 'b', label: 'Beta', group: 'Team B' },
  { value: 'a', label: 'Alpha', group: 'Team A' },
  { value: 'c', label: 'Gamma', group: null },
  { value: 'z', label: 'Zeta', group: 'A Team' },
  { value: 'd', label: 'Delta', group: 'Team A' },
  { value: 'e', label: 'Epsilon', group: '' }
]

function openSelect(props = {}) {
  render(<SearchableSelect options={groupedOptions} placeholder="Pick one" {...props} />)
  fireEvent.click(screen.getByRole('combobox'))
}

it('renders grouped headers in source order and keeps ungrouped items last', () => {
  openSelect()

  const sectionHeaders = Array.from(
    document.querySelectorAll('.cpy-searchable-select-dropdown li')
  )
    .map((node) => node.textContent)
    .filter((text) => ['A Team', 'Team A', 'Team B', 'No group'].includes(text))

  expect(sectionHeaders).toEqual(['A Team', 'Team A', 'Team B', 'No group'])
  expect(screen.getByText('Gamma')).toBeTruthy()
  expect(screen.getByText('Epsilon')).toBeTruthy()
  expect(screen.getByText('Zeta')).toBeTruthy()
})

it('filters options and hides empty sections', () => {
  openSelect()

  fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'bet' } })

  expect(screen.getByText('Team B')).toBeTruthy()
  expect(screen.queryByText('Team A')).toBeNull()
  expect(screen.queryByText('No group')).toBeNull()
  expect(screen.getByText('Beta')).toBeTruthy()
})

it('shows all options from a matching group when searching by group name', () => {
  openSelect()

  fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'team a' } })

  expect(screen.getByText('Team A')).toBeTruthy()
  expect(screen.getByText('Alpha')).toBeTruthy()
  expect(screen.getByText('Delta')).toBeTruthy()
  expect(screen.queryByText('Team B')).toBeNull()
  expect(screen.queryByText('Beta')).toBeNull()
  expect(screen.queryByText('No group')).toBeNull()
})

it('keeps keyboard navigation working across grouped sections', () => {
  const handleChange = jest.fn()
  render(
    <SearchableSelect
      options={groupedOptions}
      placeholder="Pick one"
      multiple={false}
    />
  )

  const root = document.querySelector('.cpy-searchable-select')
  root.addEventListener('searchable-select:change', handleChange)

  fireEvent.click(screen.getByRole('combobox'))

  const searchInput = screen.getByPlaceholderText('Search...')
  fireEvent.keyDown(searchInput, { key: 'ArrowDown' })
  fireEvent.keyDown(searchInput, { key: 'ArrowDown' })
  fireEvent.keyDown(searchInput, { key: 'Enter' })

  expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
    detail: { selectedValues: ['c'] }
  }))
  expect(screen.getByText('Gamma')).toBeTruthy()
})

it('keeps the selected tab flat', () => {
  openSelect({ selectedValues: ['a', 'c'] })

  fireEvent.click(screen.getByText('Selected (2)'))

  const selectedList = document.querySelector('.cpy-searchable-select-dropdown ul')

  expect(within(selectedList).getByText('Alpha')).toBeTruthy()
  expect(within(selectedList).getByText('Gamma')).toBeTruthy()
  expect(within(selectedList).queryByText('Team A')).toBeNull()
  expect(within(selectedList).queryByText('No group')).toBeNull()
})

it('maps remote items using groupKey', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { uuid: 1, name: 'Alpha', section_name: 'Team A' },
        { uuid: 2, name: 'Gamma', section_name: null }
      ])
    })
  )

  render(
    <SearchableSelect
      url="/options.json"
      valueKey="uuid"
      labelKey="name"
      groupKey="section_name"
      autoOpen
    />
  )

  await waitFor(() => expect(screen.getByText('Alpha')).toBeTruthy())

  expect(screen.getByText('Team A')).toBeTruthy()
  expect(screen.getByText('No group')).toBeTruthy()
  expect(global.fetch).toHaveBeenCalledWith('/options.json', expect.any(Object))
})

it('does not render a fallback group header for flat option lists', () => {
  render(
    <SearchableSelect
      options={[
        { value: '1', label: 'Alpha', group: null },
        { value: '2', label: 'Beta', group: null }
      ]}
      autoOpen
    />
  )

  expect(screen.queryByText('No group')).toBeNull()
  expect(screen.getByText('Alpha')).toBeTruthy()
  expect(screen.getByText('Beta')).toBeTruthy()
})
