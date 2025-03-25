import React, { useState } from "react"
import AmbientSounds from "./AmbientSounds"

const FocusSpace = ({ isShowing }) => {
  return (
    <React.Fragment>
      <div className={`focus-space ${isShowing ? 'showing' : ''}`}>
        <div className="flex flex-col items-stretch justify-stretch h-full w-full">
          <div className="flex basis-1 grow items-center justify-center">
            <p>TEst</p>
          </div>
          <div className="flex basis-1 grow items-center justify-center">
            <AmbientSounds/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FocusSpace
