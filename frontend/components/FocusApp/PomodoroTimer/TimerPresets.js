import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { t } from 'i18n.js.erb'

const TimerPresets = ({ presets, activePreset, onSelectPreset, onOpenSettings }) => {
  return (
    <div className="timer-presets">
      {presets.map((preset, index) => (
        <button
          key={index}
          className={activePreset === index ? "btn btn-xl btn-secondary btn-active" : "btn btn-xl btn-secondary"}
          onClick={() => onSelectPreset(preset.minutes, index)}
        >
          {preset.name}
        </button>
      ))}
      <button
        className="btn btn-xl btn-soft btn-square"
        onClick={onOpenSettings}
      >
        <FontAwesomeIcon icon={faCog} />
      </button>
    </div>
  )
}

export default TimerPresets