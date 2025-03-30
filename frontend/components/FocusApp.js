import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faWindowRestore, faVolumeHigh, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'

import AnimatedBackground from "./FocusApp/AnimatedBackground"
import FocusSpace from "./FocusApp/FocusSpace"
import { POMODORO_STATE } from "./FocusApp/PomodoroTimer/PomodoroTimer"


const FocusApp = ({ }) => {

  const [isFocusSpaceShowing, setIsFocusSpaceShowing] = useState(false)
  const [hasSoundPlaying, setHasSoundPlaying] = useState(false)
  const [pomodoroState, setPomodoroState] = useState(POMODORO_STATE.STOPPED)

  const handlePomodoroStateChange = (newState) => {
    setPomodoroState(newState)
  }

  return (
    <>
      {isFocusSpaceShowing && (
        <AnimatedBackground />
      )}
      <div className={`focus-app ${isFocusSpaceShowing ? 'space-showing' : ''}`}>

        <FocusSpace isFocusSpaceShowing={isFocusSpaceShowing}
          onPlayStart={() => setHasSoundPlaying(true)}
          onPlayToggle={() => setHasSoundPlaying(false)}
          onPomodoroStateChange={handlePomodoroStateChange}
          onHide={() => setIsFocusSpaceShowing(false)} />
      </div>
      <div className={`focus-space-access-buttons ${isFocusSpaceShowing ? 'space-showing' : ''}`}>
        <button className={`tour--open-focus-app-button open-space-button ${isFocusSpaceShowing ? 'close' : 'open'}`} onClick={() => setIsFocusSpaceShowing(!isFocusSpaceShowing)}>
          <FontAwesomeIcon icon={isFocusSpaceShowing ? faXmark : faWindowRestore} />
          {!isFocusSpaceShowing && (
            <>
              {(pomodoroState === POMODORO_STATE.FINISHED) && (
                <span className="ping-notification">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-600 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-primary-700"></span>
                </span>
              )}

              {hasSoundPlaying && (
                <span className='sound-playing-icon'>
                  <FontAwesomeIcon icon={faVolumeHigh} />
                </span>
              )}

              {(pomodoroState === POMODORO_STATE.RUNNING || pomodoroState === POMODORO_STATE.PAUSED) && (
                <span className='pomodoro-running-icon'>
                  <FontAwesomeIcon icon={faHourglassHalf} />
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </>
  )
}

export default FocusApp
