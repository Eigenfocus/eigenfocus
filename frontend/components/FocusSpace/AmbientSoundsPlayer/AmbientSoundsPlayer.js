import React from 'react'
import PlayList from './PlayList'
import sounds from './sounds'

const AmbientSoundsPlayer = () => {
  return <div className="flex grow flex-col">
    <PlayList sounds={sounds} />
  </div>
}

export default AmbientSoundsPlayer
