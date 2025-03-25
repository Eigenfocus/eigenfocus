import React, { useEffect, useState } from 'react'
import {
  BsFillStopFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill
} from 'react-icons/bs'
import { FiShuffle } from 'react-icons/fi'
import Sound from './Sound'

const SoundList = () => {
  const MAX_SOUNDS = 5
  const [currentSoundIndex, setCurrentSoundIndex] = useState([])
  const [isMuted, setIsMuted] = useState(false)
  const [playingSounds, setPlayingSounds] = useState({})

  const handleShuffle = () => {
    if (currentSoundIndex.length < MAX_SOUNDS) {
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
    <div className="flex flex-col gap-[2rem] justify-center items-center pb-[4rem]">
      <div className="flex gap-[2rem]">
        <Tooltip title="Shuffle" placement="top">
          <button onClick={handleShuffle} className="player-control">
            <FiShuffle size={20} color="white" />
          </button>
        </Tooltip>
        <Tooltip title="Mute/Umnute" placement="top">
          <button onClick={handleMuteUnmute} className="player-control">
            {isMuted ? (
              <BsFillVolumeMuteFill size={20} color="white" />
            ) : (
              <BsFillVolumeUpFill size={20} color="white" />
            )}
          </button>
        </Tooltip>
        <Tooltip title="Stop/Reset" placement="top">
          <button onClick={handleStopAll} className="player-control">
            <BsFillStopFill size={20} color="white" />
          </button>
        </Tooltip>
      </div>
      <div className="grid gap-[2rem] sm:grid-cols-2 lg:grid-cols-4">
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
