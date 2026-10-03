import React, { useRef, useState } from "react"
import MarkdownEditor from "../MarkdownEditor"
import { t } from "i18n.js.erb"
import { FetchRequest } from '@rails/request.js'
import { updateDescriptionIssuePath } from 'routes.js.erb'

import useLocalState from 'utils/use-local-state'

const { useEffect, useCallback } = React

const UpdatedFeedback = ({ onDone }) => {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1000)
    const doneTimer = setTimeout(onDone, 1500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <span className={`flex items-center gap-1 text-sm text-success transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}>
      <i className="ti ti-circle-dashed-check"></i>
      { t("issue_detail.description.updated") }
    </span>
  )
}

const Description = ({ content, issueId }) => {
  const hiddenFieldRef = useRef(null)
  const [localState, setLocalState] = useLocalState(issueId)
  const [isEditing, setIsEditing] = useState(false)
  const [currentContent, setCurrentContent] = useState(content)
  const [previewVersion, setPreviewVersion] = useState(0)
  const [updatedAt, setUpdatedAt] = useState(null)
  const defaultValue = localState || currentContent || ""

  const saveDescription = useCallback((description) => {
    return new FetchRequest('patch', updateDescriptionIssuePath(issueId), {
      body: JSON.stringify({ description }),
      responseKind: 'turbo-stream'
    }).perform()
  }, [issueId])

  const handleSave = useCallback((e) => {
    e.preventDefault()

    saveDescription(hiddenFieldRef.current.value).then((response) => {
      if (response.ok) {
        setIsEditing(false)
        setCurrentContent(hiddenFieldRef.current.value)
        setLocalState(null)
        setUpdatedAt(Date.now())
      } else {
        alert("Failed to update description")
      }
    })
  }, [hiddenFieldRef, saveDescription, setIsEditing, setCurrentContent, setLocalState, setUpdatedAt])

  const handleTaskToggle = useCallback(markdown => {
    if (localState) {
      setLocalState(markdown)
      return
    }

    saveDescription(markdown).then((response) => {
      if (response.ok) {
        setCurrentContent(markdown)
        setUpdatedAt(Date.now())
      } else {
        setPreviewVersion(version => version + 1)
        alert("Failed to update description")
      }
    })
  }, [localState, saveDescription, setLocalState, setCurrentContent, setUpdatedAt])

  const hideUpdatedFeedback = useCallback(() => setUpdatedAt(null), [setUpdatedAt])

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
        <h3 className="text-base font-medium text-base-content flex items-center gap-1">
          <i className="ti ti-align-justified opacity-60"></i>
          { t("activerecord.attributes.issue.description") }
        </h3>

        <div className="flex flex-row gap-2 items-center justify-between">
          { localState && (
            <a className="link-warning text-sm cursor-pointer btn-sm" onClick={() => { setIsEditing(true) }}>
              { t("issue_detail.description.changes_not_saved") }
            </a>
          )}

          { updatedAt && (
            <UpdatedFeedback key={updatedAt} onDone={hideUpdatedFeedback} />
          )}

          { !isEditing && (
            <a className="btn btn-sm" onClick={() => { setIsEditing(true) }}>
              { t("actions.edit") }
            </a>
          )}
        </div>
      </div>
      <div className={ isEditing ? "" : "cursor-pointer cpy-issue-detail-description" } onClick={() => { setIsEditing(true) }}>
        <MarkdownEditor
          key={isEditing ? "editing" : `reading-${localState ? "draft" : "saved"}-${previewVersion}`}
          defaultValue={defaultValue}
          readOnly={!isEditing}
          mirrorInputTargetRef={hiddenFieldRef}
          identifier={issueId}
          onInput={handleInput}
          onTaskToggle={isEditing ? undefined : handleTaskToggle}
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
