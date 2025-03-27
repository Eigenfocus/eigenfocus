import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const CustomTimerModal = ({ onClose, onSubmit }) => {
  const [minutes, setMinutes] = useState(25);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(minutes);
  };

  return (
    <div className="timer-modal" onClick={handleClickOutside}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className="text-xl font-bold mb-4">Custom Timer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Minutes:</label>
            <input
              type="number"
              min="1"
              max="120"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="input-field"
            />
          </div>
          <div className="flex justify-end gap-5">
            <button
              type="button-clean"
              onClick={onClose}
              className="button-clean"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-primary"
            >
              Set Timer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomTimerModal;