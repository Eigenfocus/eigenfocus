import React from "react"

function LabelBadge({ label, onRemove }) {
  const handleRemove = (e) => {
    e.preventDefault()
    onRemove(label.title)
  }

  return (
    <div className="badge badge-lg badge-primary gap-2">
      <span>{label.title}</span>
      <button
        type="button"
        onClick={handleRemove}
        className="btn btn-ghost btn-xs btn-circle"
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

export default LabelBadge
