import React, { useState } from "react"
import AmbientSoundsPlayer from "./AmbientSoundsPlayer"
import PomodoroTimer from "./PomodoroTimer"
import { IconX } from "@tabler/icons-react"

const FocusSpace = ({ isShowing, onHide, onPlayStart, onPlayToggle, onPomodoroStateChange }) => {

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onHide()
    }
  }

  return (
    <React.Fragment>
      <div className={`focus-space`} onClick={handleClickOutside}>
        <button className="cpy-close-space-button btn btn-sm btn-ghost" onClick={onHide}>
          <IconX />
        </button>
        <div className="flex items-center justify-center">
          <PomodoroTimer onStateChange={onPomodoroStateChange} />
        </div>
        <div className="flex items-center justify-center">
          <AmbientSoundsPlayer onPlay={onPlayStart} onStop={onPlayToggle} />
        </div>

        <div className="focus-space-fireflies">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="firefly"></div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default FocusSpace