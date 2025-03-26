import React, { useState } from "react"
import FocusSpace from "./FocusSpace"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faWindowRestore, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

const FocusApp = ({ focusSpaceConfig = {} }) => {

  const [isShowing, setIsShowing] = useState(false)
  const [hasSoundPlaying, setHasSoundPlaying] = useState(false)

  return (
    <div className={`focus-app ${isShowing ? 'space-showing' : ''} ${hasSoundPlaying ? 'playing' : ''}`}>
      <FocusSpace isShowing={isShowing} focusSpaceConfig={focusSpaceConfig} onPlayStart={() => setHasSoundPlaying(true)} onPlayStop={() => setHasSoundPlaying(false)} />

      <div className="focus-space-access-buttons">
        <button className={`open-space-button ${isShowing ? 'close' : 'open'}`} onClick={() => setIsShowing(!isShowing)}>
          <FontAwesomeIcon icon={isShowing ? faXmark : faWindowRestore} />
          <span className='sound-playing-icon'>
            <FontAwesomeIcon icon={faVolumeHigh} />
          </span>
        </button>

      </div>
    </div>
  )
}

export default FocusApp
