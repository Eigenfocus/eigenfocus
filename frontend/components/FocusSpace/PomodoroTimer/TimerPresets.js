import React from "react";

const TimerPresets = ({ presets, activePreset, onSelect, onCustom }) => {
  return (
    <div className="timer-presets">
      {presets.map((preset, index) => (
        <button
          key={index}
          className={activePreset === index ? "active button-secondary" : "button-secondary"}
          onClick={() => onSelect(preset.minutes, index)}
        >
          {preset.name}
        </button>
      ))}
      <button
        className="button-secondary"
        onClick={onCustom}
      >
        Custom
      </button>
    </div>
  );
};

export default TimerPresets;