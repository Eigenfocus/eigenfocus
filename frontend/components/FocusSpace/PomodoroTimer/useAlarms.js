import { t } from 'i18n.js.erb'
import { useState } from 'react'
import { alarmUrl } from 'shared/assets_url'

const ALARMS_LIST = [
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

function storePreferenceForDefaultAlarm(alarmKey) {
  localStorage.setItem(LOCAL_STORAGE_KEY, alarmKey)
}

function getDefaultAlarmKey() {
  return localStorage.getItem(LOCAL_STORAGE_KEY) ?? ALARMS_LIST[0].key
}

function getConfiguredAlarms() {
  const newAlarms = ALARMS_LIST.map(alarm => ({
    ...alarm,
    isDefault: alarm.key === getDefaultAlarmKey()
  }))

  if (!newAlarms.find(alarm => alarm.isDefault)) {
    newAlarms[0].isDefault = true
  }

  return newAlarms
}

export const useAlarms = () => {
  const [alarms, setAlarms] = useState(getConfiguredAlarms())

  function setDefaultAlarmKey(alarmKey) {
    storePreferenceForDefaultAlarm(alarmKey)
    setAlarms(getConfiguredAlarms())
  }

  return { alarms, setDefaultAlarmKey }
}

export default useAlarms
