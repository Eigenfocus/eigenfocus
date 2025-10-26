import React, { useState, useEffect } from "react"
import useSound from "shared/useSound"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlay } from '@fortawesome/free-solid-svg-icons'

import { t } from 'i18n.js.erb'

const TimersSettingsModal = ({ timePresets, alarms, onClose, onSubmit }) => {
  const [mutableTimePresets, setMutableTimePresets] = useState([...timePresets])
  const [selectedAlarm, setSelectedAlarm] = useState(alarms.find(alarm => alarm.isDefault))

  const {
    playSound,
    changeSource
  } = useSound(selectedAlarm.src, { loop: false, maxSeconds: 3, volume: 0.7 })

  const playSelectedAlarm = (e) => {
    e.preventDefault()
    changeSource(selectedAlarm.src)
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
    onSubmit(mutableTimePresets, selectedAlarm)
  }

  return (
    <dialog className="modal cpy-timer-modal" onClick={handleClickOutside} open={true}>
      <div className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 cpy-close-modal" onClick={onClose}>
          <i className="ti ti-x"></i>
        </button>

        <h2 className="text-xl font-bold mb-3">{ t("focus_space.pomodoro_timer.timers_settings") }</h2>
        <form onSubmit={handleSubmit}>
          {mutableTimePresets.map(({name, minutes}, key) => (
            <div className="flex items-stretch gap-2 mb-4" key={key}>
              <input
                type="text"
                value={name}
                onChange={(e) => updateTimePreset({ name: e.target.value }, key)}
                className="input grow"
              />

              <label className="input">
                <input
                  type="number"
                  value={minutes == 0 ? '' : minutes}
                  min={1}
                  onChange={(e) => updateTimePreset({ minutes: (e.target.value === '' ? 0 : parseInt(e.target.value)) }, key)}
                  className="text-center"
                  />
                <span className="label">{ t("minutes") }</span>
              </label>
            </div>
          ))}
          <h2 className="text-xl font-bold mt-6 mb-2">{ t("focus_space.pomodoro_timer.sound_settings") }</h2>
          <div className="flex justify-stretch items-stretch mb-4">
            <select value={selectedAlarm.key}
              name="alarm_key"
              onChange={(e) => setSelectedAlarm(alarms.find(alarm => alarm.key === e.target.value))}
              className="select grow">
              {alarms.map((alarm, key) => (
                <option key={key} value={alarm.key}>{alarm.title}</option>
              ))}
            </select>
            <a className="ml-2 btn btn-ghost" onClick={playSelectedAlarm}>
              <FontAwesomeIcon icon={faPlay} />
              { t("actions.play") }
            </a>
          </div>
          <div className="flex flex-row-reverse gap-5">
            <button
              type="submit"
              className="btn btn-primary"
            >
              { t("actions.save") }
            </button>
            <button
              type="button-clean"
              onClick={(e) => {
                e.preventDefault()
                onClose()
              }}
              className="btn btn-ghost"
            >
              { t("actions.cancel") }
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

export default TimersSettingsModal