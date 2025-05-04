import React, { useRef, useState } from "react"
import MarkdownEditor from "../MarkdownEditor"
import { t } from "i18n.js.erb"

const Description = ({ content, issueId }) => {
  const hiddenFieldRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div>
      <div class="mt-2 mb-2 flex items-center justify-between">
        <h3 class="text-lg font-medium text-readable-content-500">
          <span class="mr-1 text-readable-content-500/80">
            <i class="fa-solid text-sm fa-align-justify"></i>
          </span>
          { t("activerecord.attributes.issue.description") }
        </h3>

        { !isEditing && (
          <a className="btn-primary text-sm cursor-pointer btn-sm" onClick={() => { setIsEditing(true) }}>
            { t("actions.edit") }
          </a>
        )}
      </div>
      <div onClick={() => { setIsEditing(true) }}>
        <MarkdownEditor defaultValue={content} readOnly={!isEditing} mirrorInputTargetRef={hiddenFieldRef}/>
        <input type="hidden" name="issue[description]" value={content ? content : ""} ref={hiddenFieldRef}/>
      </div>
      { isEditing && (
        <div className="flex gap-4 items-center mt-2 justify-end">
          <a className="link-cancel text-sm" onClick={() => { setIsEditing(false) }}>
            { t("actions.cancel") }
          </a>

          <button className="btn-primary">
            { t("actions.save") }
          </button>
        </div>
      )}
    </div>
  )
}

export default Description