const baseUrl = document.querySelector('meta[name="sounds-base-url"]')?.content ?? ''

export function soundUrl(sound) {
  return `${baseUrl}/sounds/${sound}.mp3`
}

export function alarmUrl(key) {
  return `${baseUrl}/alarms/${key}-alarm.mp3`
}
