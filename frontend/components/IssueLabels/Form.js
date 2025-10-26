import React, { useState, useRef } from "react"

import { t } from 'i18n.js.erb'

import { getContrastColor } from "./Badge"

const SUGGESTED_COLORS = [
  "#00D2BC",
  "#00BBFF",
  "#412AD5",
  "#F52E99",
  "#09090B",
  "#FF637F"
]

export function Form({ suggestedTitle, onSubmit, onCancel }) {
  const titleInputRef = useRef(null)
  const colorInputRef = useRef(null)
  const [newLabel, setNewLabel] = useState({ title: suggestedTitle, color: SUGGESTED_COLORS[0] })

  const handleCreateLabelSubmission = (e) => {
    e.preventDefault()
    onSubmit(newLabel)
  }

  const handleCancelCreate = () => {
    onCancel()
  }

  return (
    <form onSubmit={handleCreateLabelSubmission}  >
      <input
        ref={titleInputRef}
        type="text"
        placeholder={t("issue.enter_label_name")}
        className="input w-full cpy-label-title"
        value={newLabel.title}
        onChange={(e) => setNewLabel({ ...newLabel, title: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.stopPropagation()
            e.preventDefault()
            handleCancelCreate()
          }
        }}
      />

      <div className="flex items-center justify-between mt-3">

        {SUGGESTED_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setNewLabel({ ...newLabel, color: color })}
            className={`size-6 rounded-full transition-transform ${
              newLabel.color === color ? 'ring-1 ring-offset-1 ring-base-content scale-110' : ''
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}

        <button className={`relative button size-6 flex rounded-full items-center overflow-hidden justify-center ${
              SUGGESTED_COLORS.includes(newLabel.color) ? '' : 'ring-1 ring-offset-1 ring-base-content scale-110'
            } `}
          style={{
            backgroundColor: newLabel.color
          }}
          onClick={() => colorInputRef.current.click()}>

          <i
            style={{ color: getContrastColor(newLabel.color) }}
            className="ti ti-plus absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <input
            type="color"
            ref={colorInputRef}
            value={newLabel.color}
            onChange={(e) => setNewLabel({ ...newLabel, color: e.target.value })}
            className="left-0 right-0 top-0 bottom-0 absolute opacity-0"
          />
        </button>
      </div>

      <div className="flex justify-end gap-2 mt-3">
        <button
          type="button"
          onClick={handleCancelCreate}
          className="btn btn-ghost btn-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={!newLabel.title.trim()}
        >
          Create
        </button>
      </div>
    </form>
  )
}
