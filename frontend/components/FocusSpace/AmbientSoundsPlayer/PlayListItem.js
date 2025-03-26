import React, { Fragment, useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'

import SoundWaveIcon from './SoundWaveIcon'

const PlayListItem = ({
  src,
  title,
  icon,
  isSelected,
  isPlaying,
  onClick
}) => {
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef(null)

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

  const handleVolumeChange = (
    event
  ) => {
    const value = parseFloat(event.target.value)
    setVolume(value)
    audioRef.current && (audioRef.current.volume = value)
  }
  return (

    <div className={`sound ${isPlaying ? 'sound-playing' : isSelected ? 'sound-selected' : ''}`}>
      <div onClick={onClick} className={`cursor-pointer flex grow p-6 flex-col gap-2 items-center justify-center`}>
        <p className="text-lg font-base">{title}</p>
        <ReactSVG
          src={icon} alt=""
          beforeInjection={(svg) => {
            svg.setAttribute('style', 'width: 50px; height: 50px; fill: currentColor; stroke: currentColor;')
          }} />
      </div>
      {isPlaying ? (
        <Fragment>
          <div className="slider-wrapper">
            <input type="range"
              in={0}
              step={0.01}
              max={1}
              onChange={handleVolumeChange}
              value={volume}
              className="h-1 bg-primary-400 w-[90%] rounded-lg appearance-none cursor-pointer"/>
          </div>
          <span className="wave-wrapper">
            <SoundWaveIcon />
          </span>
        </Fragment>
      ) : (
        ''
      )}

    </div>
  )
}

export default PlayListItem
