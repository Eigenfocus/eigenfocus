import React, { useState, useEffect } from "react"
import useSound from "shared/useSound"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlay } from '@fortawesome/free-solid-svg-icons'

import { t } from 'i18n.js.erb'

const TimersSettingsModal = ({ timePresets, alarms, selectedAlarmKey, onClose, onSubmit }) => {
  const [mutableTimePresets, setMutableTimePresets] = useState([...timePresets])
  const [mutableSelectedAlarmKey, setMutableSelectedAlarmKey] = useState(selectedAlarmKey)

  const {
    playSound,
    changeSource
  } = useSound(alarms.find(alarm => alarm.key === mutableSelectedAlarmKey).src, { loop: false, maxSeconds: 3 })

  const playSelectedAlarm = (e) => {
    e.preventDefault()
    changeSource(alarms.find(alarm => alarm.key === mutableSelectedAlarmKey).src)
    playSound()
  }

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const updateTimePreset = ({ name, minutes }, key) => {
    const newTimePresets = [...mutableTimePresets]

    newTimePresets[key] = {
      name: name ?? newTimePresets[key].name,
      minutes: minutes ?? newTimePresets[key].minutes
    }

    setMutableTimePresets(newTimePresets)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(mutableTimePresets, mutableSelectedAlarmKey)
  }

  return (
    <div className="timer-modal" onClick={handleClickOutside}>
      <div className="timer-modal-content">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className="text-xl font-bold mb-2">{ t("focus_space.pomodoro_timer.timers_settings") }</h2>
        <form onSubmit={handleSubmit}>
          {mutableTimePresets.map(({name, minutes}, key) => (
            <div className="flex justify-stretch gap-2 mb-4" key={key}>
              <input
                type="text"
                value={name}
                onChange={(e) => updateTimePreset({ name: e.target.value }, key)}
                className="input-field grow"
              />
            <input
              type="number"
              value={minutes == 0 ? '' : minutes}
              min={1}
              onChange={(e) => updateTimePreset({ minutes: (e.target.value === '' ? 0 : parseInt(e.target.value)) }, key)}
              className="input-field w-16 text-center"
              />
              <label className="flex items-center text-xs">{ t("minutes") }</label>
            </div>
          ))}
          <h2 className="text-xl font-bold mt-6 mb-2">{ t("focus_space.pomodoro_timer.sound_settings") }</h2>
          <div className="flex justify-stretch items-center mb-4">
            <select value={mutableSelectedAlarmKey}
              name="alarm_key"
              onChange={(e) => setMutableSelectedAlarmKey(e.target.value)}
              className="input-field grow">
              {alarms.map((alarm, key) => (
                <option key={key} value={alarm.key}>{alarm.title}</option>
              ))}
            </select>
            <button className="ml-4 button-clean tex-xs" onClick={playSelectedAlarm}>
              <FontAwesomeIcon icon={faPlay} />
              { t("actions.play") }
            </button>
          </div>
          <div className="flex justify-end gap-5">
            <button
              type="button-clean"
              onClick={(e) => {
                e.preventDefault()
                onClose()
              }}
              className="button-clean"
            >
              { t("actions.cancel") }
            </button>
            <button
              type="submit"
              className="button-primary"
            >
              { t("actions.save") }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TimersSettingsModal