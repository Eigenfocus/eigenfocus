import React, { useState } from "react"
import AmbientSoundsPlayer from "./AmbientSoundsPlayer"

const FocusSpace = ({ isShowing }) => {
  return (
    <React.Fragment>
      <div className={`focus-space ${isShowing ? 'showing' : ''}`}>
        <div className="flex flex-col items-stretch justify-stretch h-full w-full">
          <div className="flex basis-1 grow items-center justify-center">
            <p>TEst</p>
          </div>
          <div className="flex basis-1 grow items-center justify-center">
            <AmbientSoundsPlayer selectedSounds={['birds', 'fire', 'forest']} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FocusSpace
