import React from 'react'
import SoundList from './SoundList'

const SoundPanel = () => {
  const sounds = [
    {
      src: '/sounds/rain.mp3',
      title: 'Rain',
      icon: '/assets/rain-icon.svg'
    },
    {
      src: '/sounds/thunder.mp3',
      title: 'Thunder',
      icon: '/assets/thunder-icon.svg'
    },
    {
      src: '/sounds/birds.mp3',
      title: 'Birds',
      icon: '/assets/birds-icon.svg'
    },
    {
      src: '/sounds/fire.mp3',
      title: 'Fire',
      icon: '/assets/fire-icon.svg'
    },
    {
      src: '/sounds/office.mp3',
      title: 'Office',
      icon: '/assets/office-icon.svg'
    },
    {
      src: '/sounds/forest.mp3',
      title: 'Forest',
      icon: '/assets/leaves-icon.svg'
    },
    {
      src: '/sounds/walk.mp3',
      title: 'Walk',
      icon: '/assets/walk-icon.svg'
    },
    {
      src: '/sounds/whitenoise.mp3',
      title: 'White Noise',
      icon: '/assets/whitenoise-icon.svg'
    }
  ]
  return <div className="flex grow flex-col">
    <SoundList sounds={sounds} />
  </div>
}

export default SoundPanel
