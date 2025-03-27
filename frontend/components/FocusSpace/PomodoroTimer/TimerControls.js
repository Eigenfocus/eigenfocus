import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faClock, faPause } from '@fortawesome/free-solid-svg-icons'

const TimerControls = ({ isRunning, onStartPause, onReset }) => {
  return (
    <div className="timer-controls">
      <button
        className="button-primary big start-pause-button"
        onClick={onStartPause}
      >
        {isRunning ?
          (<FontAwesomeIcon icon={faPause} />) :
          (<FontAwesomeIcon icon={faClock} />)}

        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        className="button-primary big"
        onClick={onReset}
      >
        <FontAwesomeIcon icon={faClockRotateLeft} />
        Reset
      </button>
    </div>
  );
};
export default TimerControls;