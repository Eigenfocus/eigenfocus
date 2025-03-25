import React, { useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'

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

    <div className={`sound ${isPlaying ? 'sound-playing' : ''}`}>
      <div onClick={handleSoundPlay} className={`cursor-pointer flex grow p-6 flex-col gap-2 items-center justify-center`}>
        <p className="text-lg font-base">{title}</p>
        <ReactSVG
          src={icon} alt=""
          beforeInjection={(svg) => {
            // Add a class name to the SVG element. Note: You'll need a classList
            // polyfill if you're using this in older browsers.
            svg.classList.add('svg-line-animated')

            // Add inline style to the SVG element.
            svg.setAttribute('style', 'width: 50px; height: 50px; fill: currentColor; stroke: currentColor;')

          }} />
      </div>
      <div className="slider-wrapper">
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
