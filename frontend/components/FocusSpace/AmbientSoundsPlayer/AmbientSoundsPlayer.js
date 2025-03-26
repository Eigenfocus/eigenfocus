import React, { useState, useEffect } from 'react'
import PlayList from './PlayList'
import ControlBar from './ControlBar'

import sounds from './sounds'

const AmbientSoundsPlayer = () => {
  const [playlist, setPlaylist] = useState(sounds)
  const [isPlaying, setIsPlaying] = useState(false)

  const onPlay = () => {
    setIsPlaying(true)
  }

  const onStop = () => {
    setIsPlaying(false)
  }

  useEffect(() => {
    const anySoundSelected = Object.values(playlist).some(sound => sound.isSelected)

    if (anySoundSelected === false) {
      setIsPlaying(false)
    }
  }, [playlist])

  const playRandomPreset = () => {
    // Random index may be the same...
    const newPlaylist = { ...sounds }

    for (let [_, sound] of Object.entries(newPlaylist)){
      sound.isSelected = false
    }

    for (let i = 0; i < 3; i++) {
      let soundKey = Object.keys(sounds)[Math.floor(Math.random() * Object.keys(sounds).length)]
      newPlaylist[soundKey].isSelected = true
    }

    setPlaylist(newPlaylist)
    setIsPlaying(true)
  }

  const handleSoundSelected = (soundKey) => {
    setPlaylist({ ...playlist, [soundKey]: { ...playlist[soundKey], isSelected: true } })
    setIsPlaying(true)
  }

  const handleSoundDeselected = (soundKey) => {
    setPlaylist({ ...playlist, [soundKey]: { ...playlist[soundKey], isSelected: false } })
  }
  return <div className="ambient-sounds-player">
    <ControlBar isPlaying={isPlaying} onPlay={onPlay} onStop={onStop} onIamLucky={playRandomPreset} />
    <PlayList playlist={playlist} isPlaying={isPlaying} onSelect={handleSoundSelected} onDeselect={handleSoundDeselected} />
  </div>
}

export default AmbientSoundsPlayer
