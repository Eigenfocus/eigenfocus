import { useRef, useEffect } from "react"

export const useSound = (audioSource, { volume = 1, loop = true, maxPlays = 0 } = {}) => {

  const soundRef = useRef()
  let playCount = 0

  useEffect(() => {
    soundRef.current = new Audio(audioSource)

    // Looping sounds does not trigger 'ended' event.
    // So we use a custom event listener to handle the loop.
    // soundRef.current.loop = loop
    soundRef.current.volume = volume

    soundRef.current.addEventListener('ended', () => {
      if (loop) {
        playCount++

        if (maxPlays > 0 && playCount >= maxPlays) {
          pauseSound()
        } else {
          playSound()
        }
      }
    })
  }, [])

  const playSound = () => {
    soundRef.current.play()
    soundRef.current.currentTime = 0
  }

  const pauseSound = () => {
    soundRef.current.pause()
    soundRef.current.currentTime = 0
    playCount = 0
  }

  const changeSource = (newSource) => {
    soundRef.current.src = newSource
  }

  const changeVolume = (newVolume) => {
    soundRef.current.volume = newVolume
  }

  return {
    playSound,
    pauseSound,
    changeSource,
    changeVolume,
  }
}

export default useSound
