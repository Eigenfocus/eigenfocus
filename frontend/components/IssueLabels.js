import React,{ useState, useEffect } from "react"
import { FetchRequest } from '@rails/request.js'
import { addLabelProjectIssuePath, removeLabelProjectIssuePath } from "routes.js.erb"
import { t } from 'i18n.js.erb'
import LabelBadge from './IssueLabels/Badge'
import LabelsDropdown from './IssueLabels/Dropdown'

function IssueLabels({
  availableLabels = [],
  issue
}) {
  const [selectedLabels, setSelectedLabels] = useState(issue.labels)
  const [projectLabels, setProjectLabels] = useState(availableLabels)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const newProjectLabels = availableLabels.filter(label => !selectedLabels.some(selected => selected.title === label.title))
    setProjectLabels(newProjectLabels)
  }, [selectedLabels])

  const getUnselectedLabels = () => {
    return projectLabels.filter(
      label => !selectedLabels.some(selected => selected.title === label.title)
    )
  }

  const addLabel = async (title, hexColor) => {
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
    }

  }

  const removeLabel = async (title) => {
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
    <fieldset className="fieldset">
      <label className="fieldset-legend pb-1">{t("activerecord.models.issue_label.other")}</label>
      <div className="flex flex-wrap gap-2 items-stretch">
        {selectedLabels.map((label, index) => (
          <LabelBadge
            key={`${label.title}-${index}`}
            label={label}
            onRemove={removeLabel}
          />
        ))}
        <div className="relative flex items-stretch gap-2">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="btn btn-soft"
          >
            <i className="ti ti-plus" />
            {t("actions.add")} {t("activerecord.models.issue_label.one").toLowerCase()}
          </button>
          <div className="absolute top-full left-0 z-50" >
            <LabelsDropdown
              isOpen={isDropdownOpen}
              onToggle={setIsDropdownOpen}
              availableLabels={getUnselectedLabels()}
              onSelectLabel={addLabel}
            />
          </div>
        </div>
      </div>
    </fieldset>
  )
}

export default IssueLabels
