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

const LOCAL_STORAGE_KEY = `focus_selected_alarm_key`
function getSelectedAlarmKey() {
  return localStorage.getItem(LOCAL_STORAGE_KEY) ?? alarms[0].key
}

function setSelectedAlarmKey(key) {
  localStorage.setItem(LOCAL_STORAGE_KEY, key)
}

function getAlarms() {
  return alarms.map(alarm => ({
    ...alarm
  }))
}

function getSelectedAlarm() {
  return alarms.find(alarm => alarm.key === getSelectedAlarmKey())
}

export { getAlarms, getSelectedAlarmKey, setSelectedAlarmKey, getSelectedAlarm }
