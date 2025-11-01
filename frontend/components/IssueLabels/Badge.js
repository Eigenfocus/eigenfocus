import React from "react"

export const getContrastColor = (hexColor) => {
  if (!hexColor) return '#ffffff'

  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

function Badge({ label, onRemove }) {
  const handleRemove = (e) => {
    e.preventDefault()
    onRemove(label.title)
  }

  const badgeStyle = label.hexColor ? {
    backgroundColor: label.hexColor,
    color: getContrastColor(label.hexColor)
  } : {}

  return (
    <div className="flex items-center text-xs font-medium rounded-field min-h-[35px] py-1 px-2 gap-1 cpy-label-badge" style={badgeStyle}>
      <span>{label.title}</span>
      <button
        type="button"
        onClick={handleRemove}
        className="cursor-pointer flex items-center cpy-label-remove"
      >
        <i className="ti ti-x ml-2" style={{
          fontSize: '0.95rem',
          color: getContrastColor(label.hexColor),
          position: 'relative',
          top: '1px'
        }} />
      </button>
    </div>
  )
}

export default Badge
