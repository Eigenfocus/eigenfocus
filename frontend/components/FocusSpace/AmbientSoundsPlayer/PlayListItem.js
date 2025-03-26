import React, { Fragment, useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'

import SoundWaveIcon from './SoundWaveIcon'

const PlayListItem = ({
  src,
  title,
  icon,
  isSelected,
  volume,
  isPlaying,
  onSelect,
  onDeselect,
  onVolumeChange
}) => {
  const audioRef = useRef(null)

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(src)
      audioRef.current = audio
      audio.loop = true
      audioRef.current.volume = volume
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
    onVolumeChange(value)
    audioRef.current && (audioRef.current.volume = value)
  }

  const handleClick = () => {
    if (isSelected) {
      onDeselect()
    } else {
      onSelect()
    }
  }

  return (

    <div className={`sound ${isPlaying ? 'sound-playing' : isSelected ? 'sound-selected' : ''}`}>
      <div onClick={handleClick} className={`cursor-pointer flex grow p-6 flex-col gap-2 items-center justify-center`}>
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
        null
      )}

    </div>
  )
}

export default PlayListItem
