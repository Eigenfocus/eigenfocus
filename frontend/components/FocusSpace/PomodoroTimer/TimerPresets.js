import React from "react";

const TimerPresets = ({ presets, onSelect, onCustomClick }) => {
  return (
    <div className="timer-presets flex justify-center gap-2 mb-4">
      {presets.map((preset, index) => (
        <button
          key={index}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded"
          onClick={() => onSelect(preset.time)}
        >
          {preset.name}
        </button>
      ))}
      <button
        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-1 px-3 rounded"
        onClick={onCustomClick}
      >
        Custom
      </button>
    </div>
  );
};

export default TimerPresets;