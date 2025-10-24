import React, { useState, useRef, useEffect } from "react"

function LabelDropdown({ isOpen, onToggle, availableLabels, onSelectLabel }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [newLabelTitle, setNewLabelTitle] = useState('')
  const dropdownRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && !isCreating) {
      setSearchTerm('')
    }
  }, [isOpen, isCreating])

  useEffect(() => {
    if (isCreating && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isCreating])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle(false)
        setIsCreating(false)
        setNewLabelTitle('')
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

  const handleSelectLabel = (labelTitle) => {
    onSelectLabel(labelTitle)
    setSearchTerm('')
  }

  const handleCreateClick = () => {
    setIsCreating(true)
    setNewLabelTitle(searchTerm)
  }

  const handleCreateLabel = (e) => {
    e.preventDefault()
    if (newLabelTitle.trim()) {
      onSelectLabel(newLabelTitle.trim())
      setIsCreating(false)
      setNewLabelTitle('')
      setSearchTerm('')
    }
  }

  const handleCancelCreate = () => {
    setIsCreating(false)
    setNewLabelTitle('')
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => onToggle(!isOpen)}
        className="btn btn-sm btn-outline"
      >
        + Add label
      </button>

      {isOpen && (
        <div className="dropdown-content menu bg-base-100 rounded-box z-50 w-64 p-2 shadow-lg border border-base-300 mt-2">
          {!isCreating ? (
            <>
              <div className="form-control p-2">
                <input
                  type="text"
                  placeholder="Search labels..."
                  className="input input-sm input-ghost w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>

              <ul className="menu-compact max-h-48 overflow-y-auto">
                {filteredLabels.length > 0 ? (
                  filteredLabels.map((label, index) => (
                    <li key={`${label.title}-${index}`}>
                      <button
                        type="button"
                        onClick={() => handleSelectLabel(label.title)}
                        className="text-left"
                      >
                        {label.title}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="text-base-content/50 text-sm px-4 py-2">
                    No labels found
                  </li>
                )}
              </ul>

              <div className="divider my-1"></div>

              <button
                type="button"
                onClick={handleCreateClick}
                className="btn btn-sm btn-ghost justify-start"
              >
                + Create new label
              </button>
            </>
          ) : (
            <form onSubmit={handleCreateLabel} className="p-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs">New label name</span>
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter label name..."
                  className="input input-sm w-full"
                  value={newLabelTitle}
                  onChange={(e) => setNewLabelTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      handleCancelCreate()
                    }
                  }}
                />
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm flex-1"
                  disabled={!newLabelTitle.trim()}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={handleCancelCreate}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default LabelDropdown
