import React, { useState, useEffect, useRef } from "react"
import TimerPresets from "./TimerPresets"
import TimerDisplay from "./TimerDisplay"
import TimerControls from "./TimerControls"
import TimersSettingsModal from "./TimersSettingsModal"

import { getTimePresets, updateTimePresets } from "./time_presets"
import useSound from "shared/useSound"
import { useAlarms } from "./useAlarms"

const _timePresets = getTimePresets()

export const POMODORO_STATE = Object.freeze({
  STOPPED: Symbol("stopped"),
  RUNNING: Symbol("running"),
  PAUSED: Symbol("paused"),
  FINISHED: Symbol("finished")
})

const PomodoroTimer = ({ onStateChange = () => {} } = {}) => {
  const [timePresets, setTimePresets] = useState(_timePresets);
  const { alarms, setDefaultAlarmKey } = useAlarms()
  const [showCustomModal, setShowCustomModal] = useState(false)

  const [timeRemaining, setTimeRemaining] = useState(_timePresets[0].minutes * 60)
  const [initialTime, setInitialTime] = useState(_timePresets[0].minutes * 60)
  const interval = useRef(null)
  const [pomodoroState, setPomodoroState] = useState(POMODORO_STATE.STOPPED)

  const {
    playSound: playAlarm,
    pauseSound: pauseAlarm,
    changeSource: changeAlarmSource
  } = useSound(alarms.find(alarm => alarm.isDefault).src, { loop: true, volume: 0.7, maxSeconds: 7 })

  useEffect(() => {
    changeAlarmSource(alarms.find(alarm => alarm.isDefault).src)
  }, [alarms])

  useEffect(() => {
    onStateChange(pomodoroState)
    if (pomodoroState === POMODORO_STATE.RUNNING) {
      if (timeRemaining == 0) {
        setPomodoroState(POMODORO_STATE.FINISHED)
      } else {
        interval.current = setInterval(() => {
          setTimeRemaining(prev => prev - 1)
        }, 1000)
      }
    } else if (pomodoroState === POMODORO_STATE.FINISHED) {
      clearInterval(interval.current)
      playAlarm()
    } else if (pomodoroState === POMODORO_STATE.PAUSED) {
      clearInterval(interval.current)
    } else if (pomodoroState === POMODORO_STATE.STOPPED) {
      clearInterval(interval.current)
    }
    return () => clearInterval(interval.current)
  }, [pomodoroState, timeRemaining])

  const handleStartPause = () => {
    setPomodoroState(previsousState => previsousState === POMODORO_STATE.RUNNING ? POMODORO_STATE.PAUSED : POMODORO_STATE.RUNNING)
  }

  const handleReset = () => {
    setPomodoroState(POMODORO_STATE.STOPPED)
    setTimeRemaining(initialTime)
    pauseAlarm()
  }

  const handlePresetSelect = (minutes) => {
    setPomodoroState(POMODORO_STATE.STOPPED)
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
      <TimerDisplay timeRemaining={timeRemaining} isPulsing={pomodoroState === POMODORO_STATE.RUNNING} isShaking={pomodoroState === POMODORO_STATE.FINISHED} />
      <TimerControls
        isRunning={pomodoroState === POMODORO_STATE.RUNNING}
        isFinished={pomodoroState === POMODORO_STATE.FINISHED}
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