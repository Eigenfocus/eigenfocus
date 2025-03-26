import React, { useState, useEffect } from 'react'
import PlayList from './PlayList'
import ControlBar from './ControlBar'

import { getSounds, updateSoundConfig } from './sounds'

const sounds = getSounds()

const AmbientSoundsPlayer = ({onPlay, onStop}) => {
  const [playlist, setPlaylist] = useState(sounds)

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      onPlay()
    } else {
      onStop()
    }
  }, [isPlaying])

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
      newPlaylist[soundKey].volume = 0.7 * Math.random()
    }

    for (let [soundKey, { isSelected, volume }] of Object.entries(newPlaylist)){
      updateSoundConfig(soundKey, { isSelected, volume })
    }

    setPlaylist(newPlaylist)
    setIsPlaying(true)

  }

  const handleSoundSelected = (soundKey) => {
    setPlaylist({ ...playlist, [soundKey]: { ...playlist[soundKey], isSelected: true } })
    setIsPlaying(true)
    updateSoundConfig(soundKey, { isSelected: true })
  }

  const handleSoundDeselected = (soundKey) => {
    setPlaylist({ ...playlist, [soundKey]: { ...playlist[soundKey], isSelected: false } })
    updateSoundConfig(soundKey, { isSelected: false })
  }

  const handleVolumeChange = (soundKey, volume) => {
    setPlaylist({ ...playlist, [soundKey]: { ...playlist[soundKey], volume } })
    updateSoundConfig(soundKey, { volume })
  }

  return <div className="ambient-sounds-player">
    <ControlBar isPlaying={isPlaying} onPlayButtonClick={() => setIsPlaying(!isPlaying)} onIamLucky={playRandomPreset} />
    <PlayList playlist={playlist} isPlaying={isPlaying} onSelect={handleSoundSelected} onDeselect={handleSoundDeselected} onVolumeChange={handleVolumeChange} />
  </div>
}

export default AmbientSoundsPlayer
