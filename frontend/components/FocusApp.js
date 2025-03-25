import React from "react"
import SoundPanel from "./FocusApp/SoundPanel"

const FocusApp = (props) => {
  return (
    <React.Fragment>
      <div className="fixed z-999 top-0 left-0 w-full h-full bg-gradient-to-r from-primary-500 to-secondary-600">
        <SoundPanel />
      </div>
    </React.Fragment>
  )
}

export default FocusApp
