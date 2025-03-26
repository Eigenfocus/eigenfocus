import React, { useState } from "react"
import FocusSpace from "./FocusSpace"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faWindowRestore } from '@fortawesome/free-solid-svg-icons'

const FocusApp = ({ focusSpaceConfig = {} }) => {

  const [isShowing, setIsShowing] = useState(false)

  return (
    <div className={`focus-app ${isShowing ? 'space-showing' : ''}`}>
      <FocusSpace isShowing={isShowing} focusSpaceConfig={focusSpaceConfig} />
      <div className="focus-space-access-buttons">
        <button className={`open-space-button ${isShowing ? 'close' : 'open'}`} onClick={() => setIsShowing(!isShowing)}>
          <FontAwesomeIcon icon={isShowing ? faXmark : faWindowRestore} />
        </button>
      </div>
    </div>
  )
}

export default FocusApp
