import React from 'react'
import SoundList from './SoundList'

function soundUrl(sound) {
  const SOUND_REPOSITORY_URL = 'https://eigenfocus.github.io/focus-assets/sounds'

  return `${SOUND_REPOSITORY_URL}/${sound}.mp3`
}

const SoundPanel = () => {
  console.log(soundUrl('rain'))
  const sounds = [
    {
      src: soundUrl('rain'),
      title: 'Rain',
      icon: '/sound-icons/rain.svg'
    },
    {
      src: soundUrl('thunder'),
      title: 'Thunder',
      icon: '/sound-icons/thunder.svg'
    },
    {
      src: soundUrl('birds'),
      title: 'Birds',
      icon: '/sound-icons/birds.svg'
    },
    {
      src: soundUrl('fire'),
      title: 'Fire',
      icon: '/sound-icons/fire.svg'
    },
    {
      src: soundUrl('office'),
      title: 'Office',
      icon: '/sound-icons/office.svg'
    },
    {
      src: soundUrl('forest'),
      title: 'Forest',
      icon: '/sound-icons/forest.svg'
    },
    {
      src: soundUrl('walk'),
      title: 'Walk',
      icon: '/sound-icons/walk.svg'
    },
    {
      src: soundUrl('whitenoise'),
      title: 'White Noise',
      icon: '/sound-icons/noise.svg'
    }
  ]
  return <div className="flex grow flex-col">
    <SoundList sounds={sounds} />
  </div>
}

export default SoundPanel
