import React, { useState, useEffect, useRef } from "react"
import TimerPresets from "./TimerPresets"
import TimerDisplay from "./TimerDisplay"
import TimerControls from "./TimerControls"
import TimersSettingsModal from "./TimersSettingsModal"

import { getTimePresets, updateTimePresets } from "./time_presets"
import useSound from "shared/useSound"
import { useAlarms } from "./useAlarms"

const _timePresets = getTimePresets()

const PomodoroTimer = ({ onStart = () => {}, onStop = () => {} } = {}) => {
  const [timePresets, setTimePresets] = useState(_timePresets);
  const [timeRemaining, setTimeRemaining] = useState(_timePresets[0].minutes * 60)
  const [initialTime, setInitialTime] = useState(_timePresets[0].minutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [showCustomModal, setShowCustomModal] = useState(false)
  const { alarms, setDefaultAlarmKey } = useAlarms()
  const interval = useRef(null)

  const {
    playSound: playAlarm,
    pauseSound: pauseAlarm,
    changeSource: changeAlarmSource
  } = useSound(alarms.find(alarm => alarm.isDefault).src, { loop: true, volume: 0.7, maxSeconds: 4 })

  useEffect(() => {
    changeAlarmSource(alarms.find(alarm => alarm.isDefault).src)
  }, [alarms])

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      interval.current = setInterval(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)

      const isFirstTick = timeRemaining === initialTime

      if (isFirstTick) {
        onStart()
      }
    } else if (isRunning && timeRemaining == 0) {
      setIsRunning(false)
      playAlarm()
    } else {
      onStop()
      clearInterval(interval.current)
    }

    return () => clearInterval(interval.current)
  }, [isRunning, timeRemaining])

  const handleStartPause = () => {
    setIsRunning(prev => !prev)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeRemaining(initialTime)
    pauseAlarm()
  }

  const handlePresetSelect = (minutes) => {
    setIsRunning(false)
    setInitialTime(minutes * 60)
    setTimeRemaining(minutes * 60)
  }

  const handleCustomTimerSubmit = (newTimePresets, newSelectedAlarm) => {
    setTimePresets(newTimePresets)
    updateTimePresets(newTimePresets)
    setDefaultAlarmKey(newSelectedAlarm.key)
    setShowCustomModal(false)
  }

  return (
    <div className="pomodoro-timer">
      <TimerPresets presets={timePresets}
        onSelectPreset={handlePresetSelect}
        onOpenSettings={() => setShowCustomModal(true)} />
      <TimerDisplay timeRemaining={timeRemaining} isPulsing={isRunning} isShaking={timeRemaining == 0} />
      <TimerControls
        isRunning={isRunning}
        isFinished={timeRemaining == 0}
        onStartPause={handleStartPause}
        onReset={handleReset}
      />
      {showCustomModal && (
        <TimersSettingsModal
          timePresets={timePresets}
          alarms={alarms}
          onClose={() => setShowCustomModal(false)}
          onSubmit={handleCustomTimerSubmit}
        />
      )}
    </div>
  )
}

export default PomodoroTimer