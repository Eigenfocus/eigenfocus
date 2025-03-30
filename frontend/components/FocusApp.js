import React, { useState } from "react"
import FocusSpace from "./FocusSpace"
import { POMODORO_STATE } from "./FocusSpace/PomodoroTimer/PomodoroTimer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faWindowRestore, faVolumeHigh, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'

const FocusApp = ({ }) => {

  const [isFocusSpaceShowing, setIsFocusSpaceShowing] = useState(false)
  const [hasSoundPlaying, setHasSoundPlaying] = useState(false)
  const [pomodoroState, setPomodoroState] = useState(POMODORO_STATE.STOPPED)

  const handlePomodoroStateChange = (newState) => {
    console.log("newState", newState)
    setPomodoroState(newState)
  }

  return (
    <div className={`focus-app ${isFocusSpaceShowing ? 'space-showing' : ''}`}>
      <FocusSpace isFocusSpaceShowing={isFocusSpaceShowing}
        onPlayStart={() => setHasSoundPlaying(true)}
        onPlayToggle={() => setHasSoundPlaying(false)}
        onPomodoroStateChange={handlePomodoroStateChange}
        onHide={() => setIsFocusSpaceShowing(false)} />

      <div className="focus-space-access-buttons">

        <button className={`tour--open-focus-app-button open-space-button ${isFocusSpaceShowing ? 'close' : 'open'}`} onClick={() => setIsFocusSpaceShowing(!isFocusSpaceShowing)}>
          <FontAwesomeIcon icon={isFocusSpaceShowing ? faXmark : faWindowRestore} />
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
        </button>

      </div>
    </div>
  )
}

export default FocusApp
