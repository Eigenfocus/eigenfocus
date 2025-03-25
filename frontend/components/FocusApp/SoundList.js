import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle, faVolumeXmark, faVolumeHigh, faStop } from '@fortawesome/free-solid-svg-icons'
import Sound from './Sound'

const SoundList = ({ sounds }) => {
  const MAX_RANDOM_SOUNDS = 5
  const [currentSoundIndex, setCurrentSoundIndex] = useState([])
  const [isMuted, setIsMuted] = useState(false)
  const [playingSounds, setPlayingSounds] = useState({})

  const handleShuffle = () => {
    if (currentSoundIndex.length < MAX_RANDOM_SOUNDS) {
      const randomIndex = Math.floor(Math.random() * sounds.length)
      setCurrentSoundIndex([...currentSoundIndex, randomIndex])
    } else {
      let newCurrentSoundIndex = [...currentSoundIndex]
      newCurrentSoundIndex.shift()
      newCurrentSoundIndex.push(Math.floor(Math.random() * sounds.length))
      setCurrentSoundIndex(newCurrentSoundIndex)
    }
  }

  useEffect(() => {
    setPlayingSounds(
      currentSoundIndex.reduce(
        (newPlayingSounds, index) => {
          newPlayingSounds[index] = true
          return newPlayingSounds
        },
        {}
      )
    )
  }, [currentSoundIndex])

  const handleMuteUnmute = () => {
    setIsMuted(!isMuted)
  }

  const handleStopAll = () => {
    setPlayingSounds({})
    setCurrentSoundIndex([])
  }

  return (
    <div className="ambient-sounds-list">
      <div className="actions">
        <button onClick={handleShuffle}>
          <FontAwesomeIcon icon={faShuffle} />
        </button>

        <button onClick={handleMuteUnmute}>
          {isMuted ? (
            <FontAwesomeIcon icon={faVolumeXmark} />
          ) : (
            <FontAwesomeIcon icon={faVolumeHigh} />
          )}
        </button>
        <button onClick={handleStopAll}>
          <FontAwesomeIcon icon={faStop} />
        </button>
      </div>
      <div className="grid gap-[2rem] items-stretch justify-stretch grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sounds.map((sound, index) => {
          return (
            <Sound
              key={index}
              {...sound}
              isActive={currentSoundIndex.includes(index)}
              isMuted={isMuted}
              isPlaying={playingSounds[index]}
              onPlay={() =>
                setPlayingSounds({ ...playingSounds, [index]: true })
              }
              onPause={() => {
                const newPlayingSounds = { ...playingSounds }
                delete newPlayingSounds[index]
                setPlayingSounds(newPlayingSounds)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SoundList
