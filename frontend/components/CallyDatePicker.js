import React, { useState, useRef, useId } from "react"
import "cally"

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
  const popoverRef = useRef(null)
  const popoverId = useId()

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)

    if (popoverRef.current) {
      popoverRef.current.hidePopover()
    }

    if (onChange) onChange(newValue)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    setValue("")

    if (popoverRef.current) {
      popoverRef.current.hidePopover()
    }

    if (onClear) onClear()
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        className={`input ${inputClass}`}
        placeholder={placeholder}
        popoverTarget={popoverId}
        readOnly
      />

      {showClearButton && value && (
        <button
          type="button"
          className="cpy-cally-clear-button"
          onClick={handleClear}
        >
          <i className="fa-solid fa-arrow-rotate-left"></i>
        </button>
      )}

      <div
        ref={popoverRef}
        popover="auto"
        id={popoverId}
        className="dropdown bg-base-100 rounded-box shadow-lg"
      >
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
    </div>
  )
}

export default CallyDatePicker
