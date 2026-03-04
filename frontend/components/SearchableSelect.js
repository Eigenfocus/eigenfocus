import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { t } from 'i18n.js.erb'

function SearchableSelect({ options = [], selectedValues = [], placeholder = "", includeBlank = "", multiple = true, size = "md", url = null, valueKey = "id", labelKey = "title" }) {
  const [selected, setSelected] = useState(selectedValues)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [hiddenCount, setHiddenCount] = useState(0)
  const [activeTab, setActiveTab] = useState('available')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [remoteOptions, setRemoteOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const searchInputRef = useRef(null)
  const tagsContainerRef = useRef(null)
  const wasOpenRef = useRef(false)
  const dropdownRef = useRef(null)
  const [dropdownStyle, setDropdownStyle] = useState({})

  const sizeClass = `input-${size}`

  const fetchOptions = useCallback(() => {
    if (!url || hasFetched || isLoading) return

    setIsLoading(true)

    fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const mapped = data.map(item => ({
          value: String(item[valueKey]),
          label: String(item[labelKey])
        }))
        setRemoteOptions(mapped)
        setHasFetched(true)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [url, hasFetched, isLoading, valueKey, labelKey])

  // Fetch on mount if there are pre-selected values (to resolve labels)
  useEffect(() => {
    if (url && selectedValues.length > 0) {
      fetchOptions()
    }
  }, [])

  const effectiveOptions = url ? remoteOptions : options

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
      if (
        containerRef.current && !containerRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
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
    if (!isOpen && wasOpenRef.current && triggerRef.current) {
      triggerRef.current.focus()
    }
    wasOpenRef.current = isOpen
    if (isOpen) {
      setSearchTerm('')
      setActiveTab('available')
      setHighlightedIndex(0)
      // Fetch on first open if not yet fetched
      if (url && !hasFetched) {
        fetchOptions()
      }
    }
  }, [isOpen])

  const updateDropdownPosition = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setDropdownStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    })
  }, [])

  useLayoutEffect(() => {
    if (isOpen) updateDropdownPosition()
  }, [isOpen, updateDropdownPosition])

  useEffect(() => {
    if (!isOpen) return

    const handleScroll = (e) => {
      // Ignore scroll events from within the dropdown itself
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) return
      updateDropdownPosition()
    }
    document.addEventListener('scroll', handleScroll, true)
    return () => document.removeEventListener('scroll', handleScroll, true)
  }, [isOpen, updateDropdownPosition])

  useEffect(() => {
    setHighlightedIndex(0)
  }, [searchTerm])

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
    const option = effectiveOptions.find(o => o.value === value)
    return option ? option.label : value
  }

  const availableOptions = multiple
    ? effectiveOptions.filter(o => !selected.includes(o.value))
    : effectiveOptions

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

    if (selected[0] === '' && includeBlank) {
      return <span className="text-base-content/50 text-sm">{includeBlank}</span>
    }

    return <span className="text-sm truncate">{getLabel(selected[0])}</span>
  }

  const renderDropdownContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center p-2">
          <span className="loading loading-spinner loading-sm" />
        </div>
      )
    }

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
          filteredOptions.map((option, index) => (
            <li key={option.value}
              ref={(el) => {
                if (index === highlightedIndex && el) {
                  el.scrollIntoView({ block: 'nearest' })
                }
              }}
            >
              <button
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-base-200 rounded cursor-pointer cpy-searchable-select-option ${index === highlightedIndex ? 'bg-base-200' : ''}`}
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
    <div ref={containerRef} className="w-full cpy-searchable-select">
      <div
        ref={triggerRef}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={handleContainerClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(!isOpen)
          } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (!isOpen) setIsOpen(true)
          }
        }}
        className={`input ${sizeClass} w-full cursor-pointer grid grid-cols-[1fr_auto] gap-1 items-center relative`}
      >
        {renderSelectedContent()}
        {multiple && hiddenCount > 0 && (
          <span className="badge badge-sm absolute right-7 top-1/2 -translate-y-1/2">+{hiddenCount}</span>
        )}
        <i className="ti ti-chevron-down shrink-0 text-base-content/50" style={{ fontSize: '0.9rem' }} />
      </div>

      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className="bg-base-100 rounded-box shadow-lg border border-base-300/50 p-2 cpy-searchable-select-dropdown"
          style={dropdownStyle}
        >
          <button onClick={() => setIsOpen(false) } className="cursor-pointer absolute right-4 top-4">
            <i className="ti ti-x"></i>
          </button>
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
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setHighlightedIndex(prev =>
                    prev < filteredOptions.length - 1 ? prev + 1 : prev
                  )
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev))
                } else if (e.key === 'Enter') {
                  e.stopPropagation()
                  e.preventDefault()
                  if (activeTab === 'available' && filteredOptions.length > 0 && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                    handleSelect(filteredOptions[highlightedIndex].value)
                  }
                } else if (e.key === 'Tab') {
                  setIsOpen(false)
                }
              }}
            />
          </div>
          {renderDropdownContent()}
        </div>,
        document.body
      )}
    </div>
  )
}

export default SearchableSelect
