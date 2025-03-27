import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const CustomTimersModal = ({ timePresets, onClose, onSubmit }) => {
  const [mutableTimePresets, setMutableTimePresets] = useState([...timePresets]);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  const updateTimePreset = ({ name, minutes }, key) => {
    const newTimePresets = [...mutableTimePresets];


    newTimePresets[key] = {
      name: name ?? newTimePresets[key].name,
      minutes: minutes ?? newTimePresets[key].minutes
    };

    setMutableTimePresets(newTimePresets);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(mutableTimePresets);
  };

  return (
    <div className="timer-modal" onClick={handleClickOutside}>
      <div className="timer-modal-content">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className="text-xl font-bold mb-4">Timer Presets</h2>
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
              <label className="flex items-center text-xs">Minutes</label>
            </div>
          ))}
          <div className="flex justify-end gap-5">
            <button
              type="button-clean"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className="button-clean"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-primary"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomTimersModal;