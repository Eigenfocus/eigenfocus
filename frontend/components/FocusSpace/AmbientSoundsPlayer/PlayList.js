import React, { useEffect, useState } from 'react'
import PlayListItem from './PlayListItem'
import { t } from 'i18n.js.erb'
import PlayButton from './PlayButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

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
      <div className="actions">
        <PlayButton isPlaying={isPlaying} onClick={handlePlay} />
        <div className="flex items-end gap-2">
          <button className="preset-button" onClick={() => playRandomPreset(3)}>
            <FontAwesomeIcon icon={faMusic} />
            {t("actions.i_am_lucky")}
          </button>
        </div>
      </div>
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
