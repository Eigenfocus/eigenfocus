import { t } from 'i18n.js.erb'

function soundUrl(sound) {
  const SOUND_REPOSITORY_URL = 'https://eigenfocus.github.io/focus-assets/sounds'

  return `${SOUND_REPOSITORY_URL}/${sound}.mp3`
}

const sounds = {
  rain: {
    src: soundUrl('rain'),
    title: t('focus_space.ambient_sounds.rain'),
    icon: '/sound-icons/rain.svg'
  },
  thunder: {
    src: soundUrl('thunder'),
    title: t('focus_space.ambient_sounds.thunder'),
    icon: '/sound-icons/thunder.svg'
  },
  birds: {
    src: soundUrl('birds'),
    title: t('focus_space.ambient_sounds.birds'),
    icon: '/sound-icons/birds.svg'
  },
  fire: {
    src: soundUrl('fire'),
    title: t('focus_space.ambient_sounds.fire'),
    icon: '/sound-icons/fire.svg'
  },
  office: {
    src: soundUrl('office'),
    title: t('focus_space.ambient_sounds.office'),
    icon: '/sound-icons/office.svg'
  },
  forest: {
    src: soundUrl('forest'),
    title: t('focus_space.ambient_sounds.forest'),
    icon: '/sound-icons/forest.svg'
  },
  walk: {
    src: soundUrl('walk'),
    title: t('focus_space.ambient_sounds.walk'),
    icon: '/sound-icons/walk.svg'
  },
  whitenoise: {
    src: soundUrl('whitenoise'),
    title: t('focus_space.ambient_sounds.whitenoise'),
    icon: '/sound-icons/noise.svg'
  }
}

export default sounds
