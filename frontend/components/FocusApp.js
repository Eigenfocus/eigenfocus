import React from "react"
import SoundPanel from "./FocusApp/SoundPanel"

const FocusApp = (props) => {
  return (
    <React.Fragment>
      <div className="fixed z-999 top-0 left-0 w-full h-full bg-gradient-to-r from-primary-500/50 to-secondary-600/50 backdrop-blur-md">
        <div className="flex flex-col items-stretch justify-stretch h-full w-full">
          <div className="flex basis-1 grow items-center justify-center">
            <p>TEst</p>
          </div>
          <div className="flex basis-1 grow items-center justify-center">
            <SoundPanel />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default FocusApp
