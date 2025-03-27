import { t } from 'i18n.js.erb'

function soundUrl(sound) {
  const SOUND_REPOSITORY_URL = 'https://eigenfocus.github.io/focus-assets/sounds'

  return `${SOUND_REPOSITORY_URL}/${sound}.mp3`
}

const sounds = {
  rain: {
    src: soundUrl('rain'),
    title: t('focus_space.ambient_sounds.rain'),
    icon: require('./sound-icons/rain.svg')
  },
  thunder: {
    src: soundUrl('thunder'),
    title: t('focus_space.ambient_sounds.thunder'),
    icon: require('./sound-icons/thunder.svg')
  },
  birds: {
    src: soundUrl('birds'),
    title: t('focus_space.ambient_sounds.birds'),
    icon: require('./sound-icons/birds.svg')
  },
  fire: {
    src: soundUrl('fire'),
    title: t('focus_space.ambient_sounds.fire'),
    icon: require('./sound-icons/fire.svg')
  },
  office: {
    src: soundUrl('office'),
    title: t('focus_space.ambient_sounds.office'),
    icon: require('./sound-icons/office.svg')
  },
  forest: {
    src: soundUrl('forest'),
    title: t('focus_space.ambient_sounds.forest'),
    icon: require('./sound-icons/forest.svg')
  },
  walk: {
    src: soundUrl('walk'),
    title: t('focus_space.ambient_sounds.walk'),
    icon: require('./sound-icons/walk.svg')
  },
  whitenoise: {
    src: soundUrl('whitenoise'),
    title: t('focus_space.ambient_sounds.whitenoise'),
    icon: require('./sound-icons/noise.svg')
  }
}

function getSoundConfig(soundKey) {
  const storageKey = `focus_sound_config_${soundKey}`
  const storedConfig = localStorage.getItem(storageKey)
  return storedConfig ? JSON.parse(storedConfig) : { isSelected: false, volume: 0.5 }
}

function updateSoundConfig(soundKey, { isSelected, volume }) {
  const storageKey = `focus_sound_config_${soundKey}`
  const existingConfig = getSoundConfig(soundKey)

  const config = {
    isSelected: isSelected ?? existingConfig.isSelected,
    volume: volume ?? existingConfig.volume
  }

  localStorage.setItem(storageKey, JSON.stringify(config))
  return config
}

function getSounds() {
  return Object.entries(sounds).reduce((newSounds, [key, sound]) => {
    const customConfig = getSoundConfig(key)

    newSounds[key] = {
      ...sound,
      ...customConfig
    }
    return newSounds
  }, {})
}

export { updateSoundConfig, getSounds }
