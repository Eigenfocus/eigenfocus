import React, { useState } from "react"
import AmbientSoundsPlayer from "./AmbientSoundsPlayer"
import PomodoroTimer from "./PomodoroTimer"

const FocusSpace = ({ isShowing, focusSpaceConfig, onPlayStart, onPlayStop }) => {
  const selectedSounds = focusSpaceConfig["favorite_ambient_sounds"] || []
  const [timerComplete, setTimerComplete] = useState(false)

  const handleTimerComplete = () => {
    setTimerComplete(true)
    // You might want to add sound notification or other actions here
    setTimeout(() => setTimerComplete(false), 3000)
  }

  return (
    <React.Fragment>
      <div className={`focus-space ${isShowing ? 'showing' : ''}`}>
        <div className="flex flex-col items-stretch justify-stretch h-full w-full">
          <div className="flex basis-1 grow items-center justify-center">
            <PomodoroTimer onTimerComplete={handleTimerComplete} />
          </div>
          <div className="flex basis-1 grow items-center justify-center">
            <AmbientSoundsPlayer selectedSounds={selectedSounds} onPlay={onPlayStart} onStop={onPlayStop} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FocusSpace