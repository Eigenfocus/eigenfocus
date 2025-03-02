const timeEntriesIndexTour = [
  {
    element: ".tour--new-time-entry",
    popover: {
      title: "Create Time Entry",
      description: "Track your work by creating a new time entry"
    }
  },
  {
    element: ".tour--calendar-dates",
    popover: {
      title: "Date Navigation",
      description: "Navigate between different days to view and manage your time entries"
    }
  },
  {
    element: ".tour--time-entry",
    popover: {
      title: "Time Entry",
      description: "Each item shows details about your tracked time"
    }
  },
  {
    element: ".tour--time-entry-duration",
    popover: {
      title: "Duration",
      description: "The total time tracked for this entry"
    }
  },
  {
    element: ".tour--time-entry-actions",
    popover: {
      title: "Time Entry Actions",
      description: "Start, stop, edit or remove your time entries"
    }
  }
]

const timeEntriesFormTour = [
  {
    element: ".tour--project-selection",
    popover: {
      title: "Project Selection",
      description: "Choose which project you're tracking time for"
    }
  },
  {
    element: ".tour--issue-selection",
    popover: {
      title: "Issue Selection",
      description: "Optionally link this time entry to a specific issue"
    }
  },
  {
    element: ".tour--description-field",
    popover: {
      title: "Description",
      description: "Describe what you worked on during this time"
    }
  },
  {
    element: ".tour--logged-time",
    popover: {
      title: "Logged Time",
      description: "Enter the already tracked time in minutes. If left empty, the timer will start running automatically"
    }
  },
  {
    element: ".tour--form-actions",
    popover: {
      title: "Save or Cancel",
      description: "Save your time entry or cancel to discard changes"
    }
  }
]

export default {
  "time_entries/index": timeEntriesIndexTour,
  "time_entries/form": timeEntriesFormTour
}