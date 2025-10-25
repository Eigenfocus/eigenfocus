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
    color: getContrastColor(label.hexColor),
    borderColor: label.hexColor
  } : {}

  const badgeClasses = label.hexColor
    ? "badge badge-lg gap-2"
    : "badge badge-lg badge-primary gap-2"

  return (
    <div className={badgeClasses} style={badgeStyle}>
      <span>{label.title}</span>
      <button
        type="button"
        onClick={handleRemove}
        className="btn btn-ghost btn-xs btn-circle opacity-70 hover:opacity-100"
        aria-label={`Remove ${label.title} label`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block w-4 h-4 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

export default Badge
