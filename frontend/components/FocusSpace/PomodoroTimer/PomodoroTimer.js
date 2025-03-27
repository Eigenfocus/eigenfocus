import React, { useState, useEffect, useRef } from "react";
import TimerPresets from "./TimerPresets";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import TimersSettingsModal from "./TimersSettingsModal";

import { getTimePresets, updateTimePresets } from "./time_presets";
import useSound from "shared/useSound";
import { getAlarms, setSelectedAlarmKey, getSelectedAlarmKey } from "./alarms";

const _timePresets = getTimePresets();
const alarms = getAlarms();

const PomodoroTimer = ({ onTimerStart, onTimerComplete }) => {
  const [timePresets, setTimePresets] = useState(_timePresets);
  const [timeRemaining, setTimeRemaining] = useState(_timePresets[0].minutes * 60);
  const [initialTime, setInitialTime] = useState(_timePresets[0].minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);

  const interval = useRef(null);

  const {
    playSound: playAlarm,
    pauseSound: pauseAlarm,
    changeSource: changeAlarmSource
  } = useSound(alarms[0].src, { loop: true, maxPlays: 3 });

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

  const handlePresetSelect = (minutes) => {
    setIsRunning(false);
    setInitialTime(minutes * 60);
    setTimeRemaining(minutes * 60);
  };

  const handleCustomTimerSubmit = (newTimePresets) => {
    setTimePresets(newTimePresets);
    updateTimePresets(newTimePresets);
    setShowCustomModal(false)
  };

  return (
    <div className="pomodoro-timer">
      <TimerPresets presets={timePresets} onSelect={handlePresetSelect} onCustom={() => setShowCustomModal(true)} />
      <TimerDisplay timeRemaining={timeRemaining} isPulsing={isRunning} />
      <TimerControls
        isRunning={isRunning}
        onStartPause={handleStartPause}
        onReset={handleReset}
      />
      {showCustomModal && (
        <TimersSettingsModal
          timePresets={timePresets}
          onClose={() => setShowCustomModal(false)}
          onSubmit={handleCustomTimerSubmit}
        />
      )}
    </div>
  );
};

export default PomodoroTimer;