import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react"
import { t } from 'i18n.js.erb'

function SearchableSelect({ options = [], selectedValues = [], placeholder = "", multiple = true, size = "md" }) {
  const [selected, setSelected] = useState(selectedValues)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [hiddenCount, setHiddenCount] = useState(0)
  const [activeTab, setActiveTab] = useState('available')
  const containerRef = useRef(null)
  const searchInputRef = useRef(null)
  const tagsContainerRef = useRef(null)

  const sizeClass = `input-${size}`

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

  const computeHiddenCount = useCallback(() => {
    if (!tagsContainerRef.current || !multiple) return

    const container = tagsContainerRef.current
    const isOverflowing = container.scrollWidth > container.clientWidth

    if (!isOverflowing) {
      setHiddenCount(0)
      return
    }

    const tags = container.querySelectorAll('.cpy-searchable-select-tag')
    let hidden = 0
    const visibleRight = container.clientWidth + container.scrollLeft

    tags.forEach((tag) => {
      if (tag.offsetLeft + tag.offsetWidth > visibleRight) {
        hidden++
      }
    })

    setHiddenCount(hidden)
  }, [multiple])

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
      setActiveTab('available')
    }
  }, [isOpen])

  useLayoutEffect(() => {
    computeHiddenCount()
  }, [selected, computeHiddenCount])

  useEffect(() => {
    if (!tagsContainerRef.current) return

    const observer = new ResizeObserver(() => {
      computeHiddenCount()
    })
    observer.observe(tagsContainerRef.current)

    return () => observer.disconnect()
  }, [computeHiddenCount])

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

  const filteredSelected = selected.filter(value =>
    getLabel(value).toLowerCase().includes(searchTerm.toLowerCase())
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
      return (
        <div
          ref={tagsContainerRef}
          className="flex flex-nowrap gap-1 items-center overflow-hidden min-w-0"
        >
          {selected.map((value) => (
            <span key={value} className="badge badge-sm gap-1 shrink-0 cpy-searchable-select-tag">
              {getLabel(value)}
              <button
                type="button"
                onClick={(e) => handleRemove(value, e)}
                className="cursor-pointer cpy-searchable-select-remove"
              >
                <i className="ti ti-x" style={{ fontSize: '0.75rem' }} />
              </button>
            </span>
          ))}
        </div>
      )
    }

    return <span className="text-sm truncate">{getLabel(selected[0])}</span>
  }

  const renderDropdownContent = () => {
    if (activeTab === 'selected') {
      return (
        <ul className="mt-1 max-h-48 overflow-y-auto">
          {filteredSelected.length > 0 ? (
            filteredSelected.map((value) => (
              <li key={value}>
                <button
                  type="button"
                  onClick={(e) => handleRemove(value, e)}
                  className="w-full text-left px-3 py-1.5 text-sm hover:bg-base-200 rounded cursor-pointer flex items-center justify-between cpy-searchable-select-option"
                >
                  <span>{getLabel(value)}</span>
                  <i className="ti ti-x text-base-content/50" style={{ fontSize: '0.75rem' }} />
                </button>
              </li>
            ))
          ) : (
            <li className="text-base-content/50 text-sm px-3 py-2">
              {t("searchable_select.no_results")}
            </li>
          )}
        </ul>
      )
    }

    return (
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
    )
  }

  return (
    <div ref={containerRef} className="relative w-full cpy-searchable-select">
      <div
        onClick={handleContainerClick}
        className={`input ${sizeClass} w-full cursor-pointer grid grid-cols-[1fr_auto] gap-1 items-center relative`}
      >
        {renderSelectedContent()}
        {multiple && hiddenCount > 0 && (
          <span className="badge badge-sm absolute right-7 top-1/2 -translate-y-1/2">+{hiddenCount}</span>
        )}
        <i className="ti ti-chevron-down shrink-0 text-base-content/50" style={{ fontSize: '0.9rem' }} />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-base-100 rounded-box shadow-lg border border-base-300/50 p-2 cpy-searchable-select-dropdown">
          {multiple && selected.length > 0 && (
            <div className="tabs tabs-border text-sm mb-2">
              <button
                type="button"
                className={`tab text-sm ${activeTab === 'available' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('available')}
              >
                {t("searchable_select.tab_available")}
              </button>
              <button
                type="button"
                className={`tab text-sm ${activeTab === 'selected' ? 'tab-active' : ''}`}
                onClick={() => setActiveTab('selected')}
              >
                {t("searchable_select.tab_selected")} ({selected.length})
              </button>
            </div>
          )}
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
                  if (activeTab === 'available' && filteredOptions.length > 0) {
                    handleSelect(filteredOptions[0].value)
                  }
                }
              }}
            />
          </div>
          {renderDropdownContent()}
        </div>
      )}
    </div>
  )
}

export default SearchableSelect
