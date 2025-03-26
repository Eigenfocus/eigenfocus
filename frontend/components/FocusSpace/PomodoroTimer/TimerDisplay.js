import React from "react";

const TimerDisplay = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="timer-display text-6xl font-bold text-center my-4">
      {formattedTime}
    </div>
  );
};

export default TimerDisplay;