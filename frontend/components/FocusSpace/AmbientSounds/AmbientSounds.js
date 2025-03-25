import React from 'react'
import SoundList from './SoundList'

import { t } from 'i18n.js.erb'

function soundUrl(sound) {
  const SOUND_REPOSITORY_URL = 'https://eigenfocus.github.io/focus-assets/sounds'

  return `${SOUND_REPOSITORY_URL}/${sound}.mp3`
}

const SoundPanel = () => {
  const sounds = [
    {
      src: soundUrl('rain'),
      title: t('focus_space.ambient_sounds.rain'),
      icon: '/sound-icons/rain.svg'
    },
    {
      src: soundUrl('thunder'),
      title: t('focus_space.ambient_sounds.thunder'),
      icon: '/sound-icons/thunder.svg'
    },
    {
      src: soundUrl('birds'),
      title: t('focus_space.ambient_sounds.birds'),
      icon: '/sound-icons/birds.svg'
    },
    {
      src: soundUrl('fire'),
      title: t('focus_space.ambient_sounds.fire'),
      icon: '/sound-icons/fire.svg'
    },
    {
      src: soundUrl('office'),
      title: t('focus_space.ambient_sounds.office'),
      icon: '/sound-icons/office.svg'
    },
    {
      src: soundUrl('forest'),
      title: t('focus_space.ambient_sounds.forest'),
      icon: '/sound-icons/forest.svg'
    },
    {
      src: soundUrl('walk'),
      title: t('focus_space.ambient_sounds.walk'),
      icon: '/sound-icons/walk.svg'
    },
    {
      src: soundUrl('whitenoise'),
      title: t('focus_space.ambient_sounds.whitenoise'),
      icon: '/sound-icons/noise.svg'
    }
  ]
  return <div className="flex grow flex-col">
    <SoundList sounds={sounds} />
  </div>
}

export default SoundPanel
