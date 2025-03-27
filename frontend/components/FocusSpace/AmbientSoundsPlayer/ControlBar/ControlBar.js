import React from 'react'
import PlayStopButton from './PlayStopButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { t } from 'i18n.js.erb'

const ControlBar = ({ isPlaying, onPlayStop, onIamLucky }) => {
  return <div className="control-bar">
    <PlayStopButton isPlaying={isPlaying} onPlayStop={onPlayStop} />
    <div className="flex items-end gap-2">
      <button className="button-clean" onClick={onIamLucky}>
        <FontAwesomeIcon icon={faMusic} />
        {t("actions.i_am_lucky")}
      </button>
    </div>
  </div>
}

export default ControlBar
