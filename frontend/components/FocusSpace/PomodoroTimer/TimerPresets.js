import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { t } from 'i18n.js.erb'

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
        <FontAwesomeIcon icon={faCog} />
        {t("settings")}
      </button>
    </div>
  );
};

export default TimerPresets;