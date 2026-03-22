import React, { useState, useRef, useEffect } from "react"

// Register cally custom elements if not already registered by importmap
if (!customElements.get("calendar-date")) {
  require("cally")
}

const CallyDatePicker = ({
  value: initialValue = "",
  onChange,
  onClear,
  min,
  max,
  showClearButton = false,
  placeholder = "",
  inputClass = ""
}) => {
  const [value, setValue] = useState(initialValue || "")
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick)
    }

    return () => document.removeEventListener("click", handleOutsideClick)
  }, [isOpen])

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    setIsOpen(false)
    if (onChange) onChange(newValue)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    setValue("")
    setIsOpen(false)
    if (onClear) onClear()
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        value={value}
        className={`input ${inputClass} ${showClearButton ? "pr-8" : ""}`}
        placeholder={placeholder}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
      />

      {showClearButton && value && (
        <button
          type="button"
          className="cpy-cally-clear-button absolute right-2 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 cursor-pointer"
          onClick={handleClear}
        >
          <i className="fa-solid fa-arrow-rotate-left text-sm"></i>
        </button>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-base-100 rounded-box shadow-lg border border-base-300">
          <calendar-date
            className="cally bg-base-100"
            value={value}
            min={min || undefined}
            max={max || undefined}
            onchange={handleChange}
          >
            <i slot="previous" className="ti ti-chevron-left"></i>
            <i slot="next" className="ti ti-chevron-right"></i>
            <calendar-month></calendar-month>
          </calendar-date>
        </div>
      )}
    </div>
  )
}

export default CallyDatePicker
