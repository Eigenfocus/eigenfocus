import React from "react"

const TimerDisplay = ({ timeRemaining, isPulsing }) => {
  const seconds = timeRemaining % 60

  let minutes = Math.floor(timeRemaining / 60)
  let hours = 0
  if (minutes > 59) {
    hours = Math.floor(minutes / 60)
    minutes = minutes % 60
  }

  const formattedTime = `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return (
    <div className={`timer-display ${isPulsing ? 'animate-pulse' : ''}`}>
      {formattedTime}
    </div>
  )
}

export default TimerDisplay