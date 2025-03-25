import React, { useEffect, useRef, useState } from 'react'

const Sound = ({
  src,
  title,
  icon,
  isActive,
  isMuted,
  isPlaying,
  onPlay,
  onPause
}) => {
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [isMuted, volume])

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(src)
      audioRef.current = audio
      audio.loop = true
    }
    if (isActive) {
      audioRef.current.play()
      onPlay && onPlay()
    } else {
      audioRef.current.pause()
      onPause && onPause()
    }
  }, [isActive, src])

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(src)
      audioRef.current = audio
      audio.loop = true
    }
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, src])

  const handleSoundPlay = () => {
    if (isPlaying) {
      onPause && onPause()
    } else {
      onPlay && onPlay()
    }
  }

  const handleVolumeChange = (
    event
  ) => {
    const value = parseFloat(event.target.value)
    setVolume(value)
    audioRef.current && (audioRef.current.volume = value)
  }
  return (

    <div className={`relative border text-readable-content-500 rounded-lg ${
        isPlaying ? 'bg-background-200/50 border-primary-400' : 'border-background-100/50 hover:bg-background-200/50 hover:border-primary-400'
      }`}
    >
      <div onClick={handleSoundPlay} className={`cursor-pointer flex grow p-8 flex-col gap-4 items-center justify-center`}>
        <p className="text-xl font-base">{title}</p>
        <img src={icon} alt="" className="fill-current w-[50px] h-[50px]" />
      </div>
      <div className="flex items-center justify-center w-full bottom-[10px] absolute">
        {isPlaying ? (
          <input type="range"
            in={0}
            step={0.01}
            max={1}
            onChange={handleVolumeChange}
            value={volume}
            className="h-1 bg-primary-400 w-[90%] rounded-lg appearance-none cursor-pointer"/>
          ) : (
            ''
          )}
      </div>
    </div>
  )
}

export default Sound
