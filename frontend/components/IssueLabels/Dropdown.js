import React, { useState, useRef, useEffect } from "react"

const SUGGESTED_COLORS = [
  "#00D2BC",
  "#00BBFF",
  "#412AD5",
  "#F52E99",
  "#09090B",
  "#FF637F"
]

function Dropdown({ isOpen, onToggle, availableLabels, onSelectLabel }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [newLabelTitle, setNewLabelTitle] = useState('')
  const [newLabelColor, setNewLabelColor] = useState(SUGGESTED_COLORS[0])
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

  const handleSelectLabel = (label) => {
    onSelectLabel(label.title, label.hexColor)
    setSearchTerm('')
  }

  const handleCreateNewLabel = () => {
    setIsCreating(true)
    setNewLabelTitle(searchTerm)
    setNewLabelColor(SUGGESTED_COLORS[0])
  }

  const handleCreateLabelSubmission = (e) => {
    e.preventDefault()
    if (newLabelTitle.trim()) {
      onSelectLabel(newLabelTitle.trim(), newLabelColor)
      setIsCreating(false)
      setNewLabelTitle('')
      setNewLabelColor(SUGGESTED_COLORS[0])
      setSearchTerm('')
    }
  }

  const handleCancelCreate = () => {
    setIsCreating(false)
    setNewLabelTitle('')
    setNewLabelColor(SUGGESTED_COLORS[0])
  }

  return (
    <div ref={dropdownRef}>
      <button
        type="button"
        onClick={() => onToggle(!isOpen)}
        className="btn btn-sm btn-outline"
      >
        + Add label
      </button>

      {isOpen && (
        <div className="menu bg-base-100 rounded-box z-50 w-64 p-2 shadow-lg mt-2">
          {!isCreating ? (
            <>
              <div className="form-control p-2 gap-2 flex">
                <input
                  type="text"
                  placeholder="Search labels..."
                  className="input input-sm input-ghost w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      e.stopPropagation()
                      e.preventDefault()
                      onToggle(false)
                    }
                  }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => onToggle(false)}
                  className="btn btn-sm btn-square btn-ghost"
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
                    No labels found
                  </li>
                )}
              </ul>

              <div className="divider my-1"></div>

              <button
                type="button"
                onClick={handleCreateNewLabel}
                className="btn btn-sm btn-ghost"
              >
                + Create new label
              </button>
            </>
          ) : (
            <form onSubmit={handleCreateLabelSubmission} className="p-2">
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
                      e.stopPropagation()
                      e.preventDefault()
                      handleCancelCreate()
                    }
                  }}
                />
              </div>

              <div className="form-control mt-3">
                <label className="label">
                  <span className="label-text text-xs">Color</span>
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {SUGGESTED_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewLabelColor(color)}
                      className={`w-6 h-6 rounded-full transition-transform ${
                        newLabelColor === color ? 'ring-2 ring-offset-2 ring-base-content scale-110' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
                <input
                  type="color"
                  value={newLabelColor}
                  onChange={(e) => setNewLabelColor(e.target.value)}
                  className="input input-sm w-full mt-2"
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

export default Dropdown
