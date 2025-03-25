import React, { useState } from "react"
import FocusSpace from "./FocusSpace"

const FocusApp = (props) => {
  const [isShowing, setIsShowing] = useState(false)

  return (
    <React.Fragment>
      <FocusSpace isShowing={isShowing} />
      <div className="focus-space-access-buttons">
        {isShowing ?
          <button onClick={() => setIsShowing(false)}>Hide</button>
        :
          <button onClick={() => setIsShowing(true)}>Show</button>
        }
      </div>
    </React.Fragment>
  )
}

export default FocusApp
