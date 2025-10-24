import React, { useRef, useState } from "react"
import MarkdownEditor from "../MarkdownEditor"
import { t } from "i18n.js.erb"
import { FetchRequest } from '@rails/request.js'
import { updateDescriptionIssuePath } from 'routes.js.erb'

import useLocalState from 'utils/use-local-state'

const { useEffect, useCallback } = React

const Description = ({ content, issueId }) => {
  const hiddenFieldRef = useRef(null)
  const [localState, setLocalState] = useLocalState(issueId)
  const [isEditing, setIsEditing] = useState(false)
  const [currentContent, setCurrentContent] = useState(content)
  const defaultValue = localState || currentContent || ""

  const handleSave = useCallback((e) => {
    e.preventDefault()

    const request = new FetchRequest('patch', updateDescriptionIssuePath(issueId), {
      body: JSON.stringify({ description: hiddenFieldRef.current.value }),
      responseKind: 'turbo-stream'
    }).perform()

    request.then((response) => {
      if (response.ok) {
        setIsEditing(false)
        setCurrentContent(hiddenFieldRef.current.value)
        setLocalState(null)
      } else {
        alert("Failed to update description")
      }
    })
  }, [hiddenFieldRef, setIsEditing, setCurrentContent, setLocalState])

  const handleInput = useCallback(value => {
    const persistedContent = currentContent || ""

    if (value.trim() != persistedContent.trim()) {
      setLocalState(value)
    }
  }, [setLocalState])

  const handleCancel = useCallback(() => {
    setIsEditing(false)
    setLocalState(null)
  }, [setIsEditing, setLocalState])

  return (
    <form onSubmit={handleSave} className="grow">
      <div className="mt-2 mb-2 flex items-center justify-between">
        <h3 className="text-lg font-medium text-base-content">
          <span className="mr-1 text-base-content/80">
            <i className="ti ti-align-justified"></i>
          </span>
          { t("activerecord.attributes.issue.description") }
        </h3>

        <div className="flex flex-row gap-2 items-center justify-between">
          { localState && (
            <a className="link-warning text-sm cursor-pointer btn-sm" onClick={() => { setIsEditing(true) }}>
              { t("issue_detail.description.changes_not_saved") }
            </a>
          )}

          { !isEditing && (
            <a className="btn btn-sm" onClick={() => { setIsEditing(true) }}>
              { t("actions.edit") }
            </a>
          )}
        </div>
      </div>
      <div className={ isEditing ? "" : "cursor-pointer grow cpy-issue-detail-description" } onClick={() => { setIsEditing(true) }}>
        <MarkdownEditor
          defaultValue={defaultValue}
          readOnly={!isEditing}
          mirrorInputTargetRef={hiddenFieldRef}
          identifier={issueId}
          onInput={handleInput}
          />
        <input type="hidden" name="issue[description]" value={defaultValue} ref={hiddenFieldRef}/>
      </div>
      { isEditing && (
        <div className="flex gap-4 items-center mt-2 justify-end">
          <a className="btn-ghost btn btn-sm" onClick={handleCancel}>
            { localState ? t("issue_detail.description.discard_changed") : t("actions.cancel") }
          </a>

          <button type="submit" className="btn btn-sm btn-primary">
            { t("actions.save") }
          </button>
        </div>
      )}
    </form>
  )
}

export default Description
