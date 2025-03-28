const BASE_URL = 'https://self-hosted-resources.eigenfocus.com'

export function soundUrl(sound) {
  return `${BASE_URL}/sounds/${sound}.mp3`
}

export function alarmUrl(key) {
  return `${BASE_URL}/alarms/${key}-alarm.mp3`
}