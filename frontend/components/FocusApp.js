import React, { useState } from "react"
import FocusSpace from "./FocusSpace"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faWindowRestore, faVolumeHigh, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'

const FocusApp = ({ }) => {

  const [isShowing, setIsShowing] = useState(false)
  const [hasSoundPlaying, setHasSoundPlaying] = useState(false)
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false)

  return (
    <div className={`focus-app ${isShowing ? 'space-showing' : ''} ${hasSoundPlaying ? 'playing' : ''} ${isPomodoroRunning ? 'pomodoro-running' : ''}`}>
      <FocusSpace isShowing={isShowing}
        onPlayStart={() => setHasSoundPlaying(true)}
        onPlayStop={() => setHasSoundPlaying(false)}
        onPomodoroStart={() => setIsPomodoroRunning(true)}
        onPomodoroStop={() => setIsPomodoroRunning(false)}
        onHide={() => setIsShowing(false)} />

      <div className="focus-space-access-buttons">
        <button className={`open-space-button ${isShowing ? 'close' : 'open'}`} onClick={() => setIsShowing(!isShowing)}>
          <FontAwesomeIcon icon={isShowing ? faXmark : faWindowRestore} />
          <span className='sound-playing-icon'>
            <FontAwesomeIcon icon={faVolumeHigh} />
          </span>

          <span className='pomodoro-running-icon'>
            <FontAwesomeIcon icon={faHourglassHalf} />
          </span>
        </button>

      </div>
    </div>
  )
}

export default FocusApp
