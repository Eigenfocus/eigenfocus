import React, { useState } from "react";

const CustomTimerModal = ({ onClose, onSubmit }) => {
  const [minutes, setMinutes] = useState(25);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(minutes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
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
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
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