import React, { useState, useRef, useEffect } from "react"

import { t } from 'i18n.js.erb'

import { Form as LabelForm} from "./Form"

function Dropdown({ isOpen, onToggle, availableLabels, onSelectLabel }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (isOpen && !isCreating) {
      setSearchTerm('')
    }
  }, [isOpen, isCreating])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle(false)
        setIsCreating(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onToggle])

  const filteredLabels = availableLabels.filter(label =>
    label.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectLabel = (label) => {
    onSelectLabel(label.title, label.hexColor)
    setSearchTerm('')
  }

  const handleCreateNewLabel = () => {
    setIsCreating(true)
  }

  const handleCreateLabelSubmission = (newLabel) => {
    if (newLabel.title.trim()) {
      onSelectLabel(newLabel.title.trim(), newLabel.color)
      setIsCreating(false)
      setSearchTerm('')
    }
  }

  const handleCancelCreate = () => {
    setIsCreating(false)
  }

  return (
    <div href={dropdownRef}>
      {isOpen && (
        <div className="menu bg-base-100 rounded-box z-50 w-64 p-2 shadow-lg mt-2">
          {
            isCreating ?
              <LabelForm suggestedTitle={searchTerm} onSubmit={handleCreateLabelSubmission} onCancel={handleCancelCreate} /> :
              (
                <>
                  <div className="form-control p-2 gap-2 flex">
                    <input
                      type="text"
                      placeholder={t("issue.search_labels")}
                      className="input input-sm w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          e.stopPropagation()
                          e.preventDefault()
                          onToggle(false)
                        } else if (e.key === 'Enter') {
                          e.stopPropagation()
                          e.preventDefault()
                          handleSelectLabel(filteredLabels[0])
                        }
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => onToggle(false)}
                      className="btn btn-sm btn-circle btn-ghost"
                    >
                      <i className="ti ti-x" />
                    </button>
                  </div>
                  <ul className="mt-2 max-h-48 overflow-y-auto">
                    {filteredLabels.length > 0 ? (
                      filteredLabels.map((label, index) => (
                        <li key={`${label.title}-${index}`}>
                          <button
                            type="button"
                            onClick={() => handleSelectLabel(label)}
                            className="text-left"
                          >
                            {label.hexColor && (
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: label.hexColor }}
                              />
                            )}
                            <span>{label.title}</span>
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-base-content text-sm px-4 py-2">
                        {t("issue.no_labels_found")}
                      </li>
                    )}
                  </ul>

                  <div className="divider my-1"></div>

                  <button
                    type="button"
                    onClick={handleCreateNewLabel}
                    className="btn btn-sm btn-ghost"
                  >
                    <i className="ti ti-plus" />
                    {t("actions.create")} {t("activerecord.models.issue_label.one").toLowerCase()}
                  </button>
                </>
              )
          }
        </div>
      )}
    </div>
  )
}

export default Dropdown
