import React, { useEffect, useState } from 'react'
import PlayListItem from './PlayListItem'
import ControlBar from './ControlBar'

const PlayList = ({ sounds }) => {
  const [favoriteSounds, setFavoriteSounds] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const anySoundSelected = Object.values(favoriteSounds).length > 0
    setIsPlaying(anySoundSelected && isPlaying)
  }, [favoriteSounds])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const playRandomPreset = (iterations = 3) => {
    // Random index may be the same...
    const newFavoriteSounds = {}

    for (let i = 0; i < iterations; i++) {
      let randomIndex = Math.floor(Math.random() * sounds.length)
      newFavoriteSounds[randomIndex] = true
    }

    setFavoriteSounds(newFavoriteSounds)
    setIsPlaying(true)
  }

  return (
    <div className="ambient-sounds-list">
      <ControlBar isPlaying={isPlaying} handlePlay={handlePlay} handleIamLucky={playRandomPreset} />
      <div className="grid gap-4 items-stretch justify-stretch grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sounds.map((sound, index) => {
          return (
            <PlayListItem
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

export default PlayList
