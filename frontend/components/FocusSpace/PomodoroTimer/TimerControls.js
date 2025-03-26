import React from "react";

const TimerControls = ({ isActive, onStartPauseClick, onResetClick }) => {
  return (
    <div className="timer-controls flex justify-center gap-4 mt-4">
      <button
        className={`${isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white font-medium py-2 px-4 rounded`}
        onClick={onStartPauseClick}
      >
        {isActive ? "Pause" : "Start"}
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
        onClick={onResetClick}
      >
        Reset
      </button>
    </div>
  );
};

export default TimerControls;