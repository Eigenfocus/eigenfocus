import React, { useRef, useState } from "react"
import MarkdownEditor from "../MarkdownEditor"
import { t } from "i18n.js.erb"
import { FetchRequest } from '@rails/request.js'
import { updateDescriptionIssuePath } from 'routes.js.erb'

const Description = ({ content, issueId }) => {
  const hiddenFieldRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false)
  const [currentContent, setCurrentContent] = useState(content)

  const handleSave = (e) => {
    e.preventDefault()

    const request = new FetchRequest('patch', updateDescriptionIssuePath(issueId), {
      body: JSON.stringify({ description: hiddenFieldRef.current.value }),
      responseKind: 'turbo-stream'
    }).perform()

    request.then((response) => {
      if (response.ok) {
        setIsEditing(false)
        setCurrentContent(hiddenFieldRef.current.value)
      } else {
        alert("Failed to update description")
      }
    })
  }

  return (
    <form onSubmit={handleSave}>
      <div className="mt-2 mb-2 flex items-center justify-between">
        <h3 className="text-lg font-medium text-readable-content-500">
          <span className="mr-1 text-readable-content-500/80">
            <i className="fa-solid text-sm fa-align-justify"></i>
          </span>
          { t("activerecord.attributes.issue.description") }
        </h3>

        { !isEditing && (
          <a className="btn-primary text-sm cursor-pointer btn-sm" onClick={() => { setIsEditing(true) }}>
            { t("actions.edit") }
          </a>
        )}
      </div>
      <div className={ isEditing ? "" : "cursor-pointer" } onClick={() => { setIsEditing(true) }}>
        <MarkdownEditor defaultValue={currentContent} readOnly={!isEditing} mirrorInputTargetRef={hiddenFieldRef}/>
        <input type="hidden" name="issue[description]" value={currentContent ? currentContent : ""} ref={hiddenFieldRef}/>
      </div>
      { isEditing && (
        <div className="flex gap-4 items-center mt-2 justify-end">
          <a className="link-cancel text-sm" onClick={() => { setIsEditing(false) }}>
            { t("actions.cancel") }
          </a>

          <button type="submit" className="btn-primary">
            { t("actions.save") }
          </button>
        </div>
      )}
    </form>
  )
}

export default Description