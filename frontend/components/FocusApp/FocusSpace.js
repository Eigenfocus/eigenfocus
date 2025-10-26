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
        <button className="cpy-close-space-button fixed top-4 right-4 btn btn-xl btn-circle btn-ghost" onClick={onHide}>
          <IconX />
        </button>
        <div className="flex items-center justify-center p-8 rounded-box border shadow-sm border-base-300/70 bg-base-100/50">
          <PomodoroTimer onStateChange={onPomodoroStateChange} />
        </div>
        <div className="flex items-center justify-center p-8 rounded-box border shadow-sm border-base-300/70 bg-base-100/50">
          <AmbientSoundsPlayer onPlay={onPlayStart} onStop={onPlayToggle} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default FocusSpace