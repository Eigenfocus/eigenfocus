import React, { useState } from 'react'
import PlayList from './PlayList'
import ControlBar from './ControlBar'

import sounds from './sounds'

const AmbientSoundsPlayer = () => {
  const [playlist, setPlaylist] = useState(sounds)
  const [isPlaying, setIsPlaying] = useState(false)

  // useEffect(() => {
  //   const anySoundSelected = Object.values(favoriteSounds).length > 0
  //   setIsPlaying(anySoundSelected && isPlaying)
  // }, [favoriteSounds])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const playRandomPreset = (iterations = 3) => {
    // Random index may be the same...
    const newFavoriteSounds = {}

    for (let i = 0; i < iterations; i++) {
      let randomIndex = Math.floor(Math.random() * Object.keys(sounds).length)
      newFavoriteSounds[randomIndex] = true
    }

    setFavoriteSounds(newFavoriteSounds)
    setIsPlaying(true)
  }

  const handleSoundSelected = (soundKey) => {
    setPlaylist({ ...playlist, [soundKey]: { ...playlist[soundKey], isPlaying: true, isSelected: true } })
  }

  const handleSoundDeselected = (soundKey) => {
    setPlaylist({ ...playlist, [soundKey]: { ...playlist[soundKey], isPlaying: false, isSelected: false } })
  }
  return <div className="ambient-sounds-player">
    <ControlBar isPlaying={isPlaying} handlePlay={handlePlay} handleIamLucky={playRandomPreset} />
    <PlayList playlist={playlist} onSelect={handleSoundSelected} onDeselect={handleSoundDeselected} />
  </div>
}

export default AmbientSoundsPlayer
