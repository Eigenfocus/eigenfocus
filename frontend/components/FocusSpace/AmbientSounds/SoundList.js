import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import Sound from './Sound'

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
        <button onClick={handlePlay}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faStop} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
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
