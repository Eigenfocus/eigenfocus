import React, { useState } from "react"
import AmbientSoundsPlayer from "./AmbientSoundsPlayer"

const FocusSpace = ({ isShowing, focusSpaceConfig }) => {
  const selectedSounds = focusSpaceConfig["favorite_ambient_sounds"] || []

  return (
    <React.Fragment>
      <div className={`focus-space ${isShowing ? 'showing' : ''}`}>
        <div className="flex flex-col items-stretch justify-stretch h-full w-full">
          <div className="flex basis-1 grow items-center justify-center">
            <p>TEst</p>
          </div>
          <div className="flex basis-1 grow items-center justify-center">
            <AmbientSoundsPlayer selectedSounds={selectedSounds} onPlay={() => {}} onStop={() => {}} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FocusSpace
