import React, { useState } from "react"
import { IconHourglassEmpty, IconBrandDeezer } from '@tabler/icons-react';

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

  const showPomodoroIcon = (pomodoroState === POMODORO_STATE.RUNNING || pomodoroState === POMODORO_STATE.PAUSED)

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
      <div className={`${isFocusSpaceShowing ? 'space-showing' : ''}`}>
        <button className={`tour--open-focus-app-button btn-slide cpy-open-space-button btn btn-sm btn-ghost`} onClick={() => setIsFocusSpaceShowing(!isFocusSpaceShowing)}>
          {
            !hasSoundPlaying &&
            !showPomodoroIcon &&
            (<i className="ti ti-layout-dashboard"></i>)
          }
          {!isFocusSpaceShowing && (
            <>
              {(pomodoroState === POMODORO_STATE.FINISHED) && (
                <div aria-label="status" class="status status-info animate-bounce"></div>
              )}

              {hasSoundPlaying && (
                <span className='sound-playing-icon animate-pulse'>
                  <IconBrandDeezer />
                </span>
              )}

              {showPomodoroIcon && (
                <span className='pomodoro-running-icon'>
                  <IconHourglassEmpty />
                </span>
              )}
            </>
          )}
          <span className="sliding-text"><span className="sliding-text-inner">Focus space</span></span>
        </button>
      </div>
    </>
  )
}

export default FocusApp
