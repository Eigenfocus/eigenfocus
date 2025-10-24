import React, { useState, useEffect } from "react"
import { FetchRequest } from '@rails/request.js'
import LabelBadge from './IssueLabels/LabelBadge'
import LabelDropdown from './IssueLabels/LabelDropdown'

function IssueLabels({
  initialLabels = [],
  availableLabels = [],
  addLabelPath,
  removeLabelPath,
  onLabelsChange = () => {}
}) {
  const [selectedLabels, setSelectedLabels] = useState(initialLabels)
  const [projectLabels, setProjectLabels] = useState(availableLabels)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    setSelectedLabels(initialLabels)
  }, [initialLabels])

  useEffect(() => {
    setProjectLabels(availableLabels)
  }, [availableLabels])

  const addLabel = async (labelTitle) => {
    const request = new FetchRequest('post', addLabelPath, {
      body: JSON.stringify({
        label: { title: labelTitle }
      })
    })

    try {
      const response = await request.perform()
      if (response.ok) {
        const newLabel = { title: labelTitle }
        const updatedLabels = [...selectedLabels, newLabel]
        setSelectedLabels(updatedLabels)

        if (!projectLabels.some(label => label.title === labelTitle)) {
          setProjectLabels([...projectLabels, newLabel])
        }

        onLabelsChange(updatedLabels)
        setIsDropdownOpen(false)
      }
    } catch (error) {
      console.error('Error adding label:', error)
    }
  }

  const removeLabel = async (labelTitle) => {
    const request = new FetchRequest('delete', removeLabelPath, {
      body: JSON.stringify({
        label: { title: labelTitle }
      })
    })

    try {
      const response = await request.perform()
      if (response.ok) {
        const updatedLabels = selectedLabels.filter(label => label.title !== labelTitle)
        setSelectedLabels(updatedLabels)
        onLabelsChange(updatedLabels)
      }
    } catch (error) {
      console.error('Error removing label:', error)
    }
  }

  const getUnselectedLabels = () => {
    return projectLabels.filter(
      label => !selectedLabels.some(selected => selected.title === label.title)
    )
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {selectedLabels.map((label, index) => (
        <LabelBadge
          key={`${label.title}-${index}`}
          label={label}
          onRemove={removeLabel}
        />
      ))}

      <LabelDropdown
        isOpen={isDropdownOpen}
        onToggle={setIsDropdownOpen}
        availableLabels={getUnselectedLabels()}
        onSelectLabel={addLabel}
      />
    </div>
  )
}

export default IssueLabels
