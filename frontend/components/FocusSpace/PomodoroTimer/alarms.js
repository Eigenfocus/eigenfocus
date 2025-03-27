import { t } from 'i18n.js.erb'

function alarmUrl(key) {
  const ALARM_REPOSITORY_URL = 'https://eigenfocus.github.io/focus-assets/alarms'

  return `${ALARM_REPOSITORY_URL}/${key}-alarm.mp3`
}

const alarms = [
  {
    key: 'standard',
    src: alarmUrl('standard'),
    title: t('focus_space.pomodoro_timer.alarms.standard')
  },
  {
    key: 'digital',
    src: alarmUrl('digital'),
    title: t('focus_space.pomodoro_timer.alarms.digital')
  },
  {
    key: 'funny',
    src: alarmUrl('funny'),
    title: t('focus_space.pomodoro_timer.alarms.funny')
  },
  {
    key: 'magic',
    src: alarmUrl('magic'),
    title: t('focus_space.pomodoro_timer.alarms.magic')
  },
  {
    key: 'ringbell',
    src: alarmUrl('ringbell'),
    title: t('focus_space.pomodoro_timer.alarms.ringbell')
  }
]

const LOCAL_STORAGE_KEY = `focus_default_alarm_key`

function getDefaultAlarmKey() {
  return localStorage.getItem(LOCAL_STORAGE_KEY) ?? alarms[0].key
}

function storePreferenceForDefaultAlarm(alarmKey) {
  localStorage.setItem(LOCAL_STORAGE_KEY, alarmKey)
}

function getAlarms() {
  return alarms.map(alarm => ({
    ...alarm,
    isDefault: alarm.key === getDefaultAlarmKey()
  }))
}

export { getAlarms, storePreferenceForDefaultAlarm }
