import React,{ useState, useEffect } from "react"
import { FetchRequest } from '@rails/request.js'
import { addLabelProjectIssuePath, removeLabelProjectIssuePath } from "routes.js.erb"

import LabelBadge from './IssueLabels/LabelBadge'
import LabelDropdown from './IssueLabels/LabelDropdown'

function IssueLabels({
  availableLabels = [],
  issue
}) {
  console.log('IssueLabels', issue)
  const [selectedLabels, setSelectedLabels] = useState(issue.labels)
  const [projectLabels, setProjectLabels] = useState(availableLabels)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const getUnselectedLabels = () => {
    return projectLabels.filter(
      label => !selectedLabels.some(selected => selected.title === label.title)
    )
  }

  const addLabel = async (title, hexColor) => {
    console.log('addLabel', title, hexColor, addLabelProjectIssuePath(issue.project_id, issue.id))
    const request = new FetchRequest('post', addLabelProjectIssuePath(issue.project_id, issue.id), {
      body: JSON.stringify({
        label: {
          title,
          hex_color: hexColor
        }
      })
    })

    const response = await request.perform()

    if (response.ok) {
      const newLabel = { title, hexColor }

      setSelectedLabels([...selectedLabels, newLabel])

      if (!projectLabels.some(label => label.title === title)) {
        setProjectLabels([...projectLabels, newLabel])
      }
    }

  }

  const removeLabel = async (title) => {
    console.log('removeLabel', title, removeLabelProjectIssuePath(issue.project_id, issue.id))
    const request = new FetchRequest('delete', removeLabelProjectIssuePath(issue.project_id, issue.id), {
      body: JSON.stringify({
        label: {
          title
        }
      })
    })

    const response = await request.perform()

    if (response.ok) {
      const updatedLabels = selectedLabels.filter(label => label.title !== title)
      setSelectedLabels(updatedLabels)
    }
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
