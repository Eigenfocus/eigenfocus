import React, { useCallback } from "react"
import { FetchRequest } from "@rails/request.js"
import CallyDatePicker from "../CallyDatePicker"

const DueDatePicker = ({ updateUrl, value }) => {
  const updateDueDate = useCallback((dueDate) => {
    new FetchRequest("patch", updateUrl, {
      body: JSON.stringify({ issue: { due_date: dueDate } }),
      responseKind: "turbo-stream"
    }).perform()
  }, [updateUrl])

  const handleChange = useCallback((dateString) => {
    updateDueDate(dateString)
  }, [updateDueDate])

  const handleClear = useCallback(() => {
    updateDueDate(null)
  }, [updateDueDate])

  return (
    <CallyDatePicker
      value={value}
      onChange={handleChange}
      onClear={handleClear}
      showClearButton
      inputClass="w-full"
    />
  )
}

export default DueDatePicker
