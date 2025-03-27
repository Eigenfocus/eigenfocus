import React from "react";

const TimerControls = ({ isActive, onStartPause, onReset }) => {
  return (
    <div className="timer-controls">
      <button
        className="button-primary big"
        onClick={onStartPause}
      >
        {isActive ? "Pause" : "Start"}
      </button>
      <button
        className="button-primary big"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};
export default TimerControls;