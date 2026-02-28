import React, { useState, useRef, useEffect } from "react"
import { t } from 'i18n.js.erb'

function SearchableSelect({ options = [], selectedValues = [], placeholder = "", multiple = true }) {
  const [selected, setSelected] = useState(selectedValues)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef(null)
  const searchInputRef = useRef(null)

  const dispatchChange = (newSelected) => {
    if (containerRef.current) {
      containerRef.current.dispatchEvent(
        new CustomEvent('searchable-select:change', {
          bubbles: true,
          detail: { selectedValues: newSelected }
        })
      )
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
    if (isOpen) {
      setSearchTerm('')
    }
  }, [isOpen])

  const getLabel = (value) => {
    const option = options.find(o => o.value === value)
    return option ? option.label : value
  }

  const availableOptions = multiple
    ? options.filter(o => !selected.includes(o.value))
    : options

  const filteredOptions = availableOptions.filter(o =>
    o.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelect = (value) => {
    let newSelected
    if (multiple) {
      newSelected = [...selected, value]
    } else {
      newSelected = [value]
      setIsOpen(false)
    }
    setSelected(newSelected)
    dispatchChange(newSelected)
    setSearchTerm('')
  }

  const handleRemove = (value, e) => {
    e.stopPropagation()
    const newSelected = selected.filter(v => v !== value)
    setSelected(newSelected)
    dispatchChange(newSelected)
  }

  const handleContainerClick = () => {
    setIsOpen(!isOpen)
  }

  const renderSelectedContent = () => {
    if (selected.length === 0) {
      return <span className="text-base-content/50 text-sm">{placeholder}</span>
    }

    if (multiple) {
      return selected.map((value) => (
        <span key={value} className="badge badge-sm gap-1 cpy-searchable-select-tag">
          {getLabel(value)}
          <button
            type="button"
            onClick={(e) => handleRemove(value, e)}
            className="cursor-pointer cpy-searchable-select-remove"
          >
            <i className="ti ti-x" style={{ fontSize: '0.75rem' }} />
          </button>
        </span>
      ))
    }

    return <span className="text-sm truncate">{getLabel(selected[0])}</span>
  }

  return (
    <div ref={containerRef} className="relative w-full cpy-searchable-select">
      <div
        onClick={handleContainerClick}
        className="flex flex-wrap items-center gap-1 min-h-8 w-full px-2 py-1 border border-base-300 rounded-xs bg-base-100 cursor-pointer"
      >
        {renderSelectedContent()}
        <i className="ti ti-chevron-down ml-auto text-base-content/50" style={{ fontSize: '0.9rem' }} />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-base-100 rounded-box shadow-lg border border-base-300/50 p-2 cpy-searchable-select-dropdown">
          <div className="form-control p-1">
            <input
              ref={searchInputRef}
              type="text"
              placeholder={t("searchable_select.search_placeholder")}
              className="input input-sm w-full cpy-searchable-select-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.stopPropagation()
                  e.preventDefault()
                  setIsOpen(false)
                } else if (e.key === 'Enter') {
                  e.stopPropagation()
                  e.preventDefault()
                  if (filteredOptions.length > 0) {
                    handleSelect(filteredOptions[0].value)
                  }
                }
              }}
            />
          </div>
          <ul className="mt-1 max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className="w-full text-left px-3 py-1.5 text-sm hover:bg-base-200 rounded cursor-pointer cpy-searchable-select-option"
                  >
                    {option.label}
                  </button>
                </li>
              ))
            ) : (
              <li className="text-base-content/50 text-sm px-3 py-2">
                {t("searchable_select.no_results")}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchableSelect
