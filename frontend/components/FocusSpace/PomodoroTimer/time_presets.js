const DEFAULT_TIME_PRESETS = [
  { name: "Pomodoro", minutes: 25 },
  { name: "Short Break", minutes: 5 },
  { name: "Long Break", minutes: 15 }
]

const STORAGE_KEY = "pomodoro_time_presets"

export const getTimePresets = () => {
  try {
    const storedPresets = localStorage.getItem(STORAGE_KEY)

    if (storedPresets) {
      const parsedPresets = JSON.parse(storedPresets)

      return parsedPresets
    }

    return [...DEFAULT_TIME_PRESETS]
  } catch (error) {
    console.error("Error getting time presets:", error)

    return [...DEFAULT_TIME_PRESETS]
  }
}

export const updateTimePresets = (presets) => {
  try {
    const presetsForStorage = presets.map(preset => ({
      name: preset.name,
      minutes: preset.minutes
    }))

    localStorage.setItem(STORAGE_KEY, JSON.stringify(presetsForStorage))
    return true
  } catch (error) {
    console.error("Error updating time presets:", error)
    return false
  }
}
