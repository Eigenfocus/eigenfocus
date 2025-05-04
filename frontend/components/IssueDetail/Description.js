import React, { useRef } from "react"
import MarkdownEditor from "../MarkdownEditor"

const Description = ({ content, issueId }) => {
  const hiddenFieldRef = useRef(null)

  return (
    <React.Fragment>
      <MarkdownEditor defaultValue={content} readOnly={false} mirrorInputTargetRef={hiddenFieldRef}/>
      <input type="hidden" name="issue[description]" value={content ? content : ""} ref={hiddenFieldRef}/>
    </React.Fragment>
  )
}

export default Description