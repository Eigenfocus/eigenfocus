import { t } from 'i18n.js.erb'
import { soundUrl } from 'shared/assets_url'

const sounds = {
  rain: {
    src: soundUrl('rain'),
    title: t('focus_space.ambient_sounds.rain'),
    icon: require('./sound-icons/rain.svg'),
    iconType: 'cloud-rain'
  },
  thunder: {
    src: soundUrl('thunder'),
    title: t('focus_space.ambient_sounds.thunder'),
    icon: require('./sound-icons/thunder.svg'),
    iconType: 'bolt'
  },
  birds: {
    src: soundUrl('birds'),
    title: t('focus_space.ambient_sounds.birds'),
    icon: require('./sound-icons/birds.svg'),
    iconType: 'sunrise'
  },
  fire: {
    src: soundUrl('fire'),
    title: t('focus_space.ambient_sounds.fire'),
    icon: require('./sound-icons/fire.svg'),
    iconType: 'flame'
  },
  office: {
    src: soundUrl('office'),
    title: t('focus_space.ambient_sounds.office'),
    icon: require('./sound-icons/office.svg'),
    iconType: 'desk'
  },
  forest: {
    src: soundUrl('forest'),
    title: t('focus_space.ambient_sounds.forest'),
    icon: require('./sound-icons/forest.svg'),
    iconType: 'trees'
  },
  walk: {
    src: soundUrl('walk'),
    title: t('focus_space.ambient_sounds.walk'),
    icon: require('./sound-icons/walk.svg'),
    iconType: 'walk'
  },
  whitenoise: {
    src: soundUrl('whitenoise'),
    title: t('focus_space.ambient_sounds.whitenoise'),
    icon: require('./sound-icons/noise.svg'),
    iconType: 'wave-sine'
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
