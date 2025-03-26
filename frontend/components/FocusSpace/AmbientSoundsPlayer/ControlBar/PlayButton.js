import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

import { t } from 'i18n.js.erb'

const PlayButton = ({ isPlaying, onClick }) => {
  return <button onClick={onClick} className="play-button">
    {
      isPlaying ?
      (<FontAwesomeIcon icon={faStop} />) :
      <FontAwesomeIcon icon={faPlay} />}

    {isPlaying ? t('actions.stop') : t('actions.play')}
  </button>
}

export default PlayButton
