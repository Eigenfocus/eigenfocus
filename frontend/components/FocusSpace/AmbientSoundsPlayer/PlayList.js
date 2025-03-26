import React, { useEffect, useState } from 'react'
import PlayListItem from './PlayListItem'

const PlayList = ({ playlist, isPlaying, onSelect, onDeselect }) => {
  return (
    <div className="ambient-sounds-list">
      <div className="grid gap-4 items-stretch justify-stretch grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Object.entries(playlist).map(([soundKey, sound]) => {
          return (
            <PlayListItem
              key={soundKey}
              {...sound}
              isPlaying={isPlaying && sound.isSelected}
              onSelect={() => onSelect(soundKey)}
              onDeselect={() => onDeselect(soundKey)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PlayList
