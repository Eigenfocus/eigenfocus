import React from 'react'
import PlayButton from './PlayButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { t } from 'i18n.js.erb'

const ControlBar = ({ isPlaying, onPlayButtonClick, onIamLuckyButtonCliked }) => {
  return <div className="control-bar">
    <PlayButton isPlaying={isPlaying} onClick={onPlayButtonClick} />
    <div className="flex items-end gap-2">
      <button className="preset-button" onClick={onIamLuckyButtonCliked}>
        <FontAwesomeIcon icon={faMusic} />
        {t("actions.i_am_lucky")}
      </button>
    </div>
  </div>
}

export default ControlBar
