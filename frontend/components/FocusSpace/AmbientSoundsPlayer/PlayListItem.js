import React, { Fragment, useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'

import SoundWaveIcon from './SoundWaveIcon'
import useSound from "shared/useSound";

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

  const {
    playSound,
    pauseSound,
    changeVolume,
    changeSource,
  } = useSound(src, { loop: true, volume: volume });

  useEffect(() => {
    if (isPlaying) {
      playSound()
    } else {
      pauseSound()
    }
  }, [isPlaying])

  useEffect(() => {
    changeSource(src)
  }, [src])

  const handleVolumeChange = (
    event
  ) => {
    const value = parseFloat(event.target.value)
    onVolumeChange(value)
    changeVolume(value)
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
