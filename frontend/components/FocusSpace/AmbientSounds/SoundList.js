import React, { useEffect, useState } from 'react'
import Sound from './Sound'

import PlayButton from './PlayButton'

const SoundList = ({ sounds }) => {
  const [favoriteSounds, setFavoriteSounds] = useState({2: true})
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const anySoundSelected = Object.values(favoriteSounds).length > 0
    setIsPlaying(anySoundSelected && isPlaying)
  }, [favoriteSounds])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="ambient-sounds-list">
      <div className="actions">
        <PlayButton isPlaying={isPlaying} onClick={handlePlay} />
      </div>
      <div className="grid gap-4 items-stretch justify-stretch grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sounds.map((sound, index) => {
          return (
            <Sound
              key={index}
              {...sound}
              isSelected={favoriteSounds[index]}
              isPlaying={isPlaying && favoriteSounds[index]}
              onClick={() => {
                const newFavoriteSounds = { ...favoriteSounds }
                if (newFavoriteSounds[index]) {
                  delete newFavoriteSounds[index]
                } else {
                  newFavoriteSounds[index] = true
                  setIsPlaying(true)
                }
                setFavoriteSounds(newFavoriteSounds)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SoundList
