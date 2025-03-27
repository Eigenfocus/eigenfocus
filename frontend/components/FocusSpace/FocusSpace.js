import React, { useState } from "react"
import AmbientSoundsPlayer from "./AmbientSoundsPlayer"
import PomodoroTimer from "./PomodoroTimer"

const FocusSpace = ({ isShowing, onHide, onPlayStart, onPlayStop }) => {

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onHide()
    }
  }

  const handleTimerComplete = () => {
    setTimerComplete(true)
  }

  return (
    <React.Fragment>
      <div className={`focus-space ${isShowing ? 'showing' : ''}`} onClick={handleClickOutside}>

        <div className="flex items-center justify-center">
          <PomodoroTimer onTimerComplete={handleTimerComplete} />
        </div>
        <div className="flex items-center justify-center">
          <AmbientSoundsPlayer onPlay={onPlayStart} onStop={onPlayStop} />
        </div>
      </div>

    </React.Fragment>
  )
}

export default FocusSpace