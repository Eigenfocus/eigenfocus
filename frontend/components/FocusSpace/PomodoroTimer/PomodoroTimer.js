import React, { useState, useEffect, useRef } from "react";
import TimerPresets from "./TimerPresets";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import CustomTimerModal from "./CustomTimerModal";

const timePresets = [
  { name: "Pomodoro", time: 25 * 60 },
  { name: "Short Break", time: 5 * 60 },
  { name: "Long Break", time: 15 * 60 }
];


const PomodoroTimer = ({ onTimerStart, onTimerComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  const interval = useRef(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      interval.current = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      const isFirstTick = timeRemaining === initialTime;

      if (isFirstTick) {
        if (onTimerStart) onTimerStart();
      }
    } else if (isRunning && timeRemaining <= 0) {
      setIsRunning(false);
      if (onTimerComplete) onTimerComplete();
    } else {
      clearInterval(interval.current);
    }

    return () => clearInterval(interval.current);
  }, [isRunning, timeRemaining, onTimerComplete]);

  const handleStartPause = () => {
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(initialTime);
  };

  const handlePresetSelect = (time) => {
    setIsRunning(false);
    setInitialTime(time);
    setTimeRemaining(time);
  };

  const handleCustomTimer = (minutes) => {
    const seconds = minutes * 60;
    setInitialTime(seconds);
    setTimeRemaining(seconds);
    setShowCustomModal(false);
  };

  return (
    <div className="pomodoro-timer">
      <TimerPresets presets={timePresets} onSelect={handlePresetSelect} onCustom={() => setShowCustomModal(true)} />
      <TimerDisplay timeRemaining={timeRemaining} />
      <TimerControls
        isRunning={isRunning}
        onStartPause={handleStartPause}
        onReset={handleReset}
      />
      {showCustomModal && (
        <CustomTimerModal
          onClose={() => setShowCustomModal(false)}
          onSubmit={handleCustomTimer}
        />
      )}
    </div>
  );
};

export default PomodoroTimer;