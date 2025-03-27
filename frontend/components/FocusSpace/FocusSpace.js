import React, { useState } from "react"
import AmbientSoundsPlayer from "./AmbientSoundsPlayer"
import PomodoroTimer from "./PomodoroTimer"

const FocusSpace = ({ isShowing, onHide, onPlayStart, onPlayToggle, onPomodoroStart, onPomodoroStop }) => {

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onHide()
    }
  }

  return (
    <React.Fragment>
      <div className={`focus-space ${isShowing ? 'showing' : ''}`} onClick={handleClickOutside}>

        <div className="flex items-center justify-center">
          <PomodoroTimer onStart={onPomodoroStart} onStop={onPomodoroStop} />
        </div>
        <div className="flex items-center justify-center">
          <AmbientSoundsPlayer onPlay={onPlayStart} onStop={onPlayToggle} />
        </div>
      </div>

    </React.Fragment>
  )
}

export default FocusSpace