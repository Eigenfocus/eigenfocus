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
      description: "This is a time entry for a project activity."
    }
  },
  {
    element: ".tour--time-entry-duration",
    popover: {
      title: "Duration",
      description: "This is the total time tracked for this entry."
    }
  },
  {
    element: ".tour--time-entry-actions",
    popover: {
      title: "Time Entry Actions",
      description: "Start, stop, edit or remove your time entries."
    },
    disableActiveInteraction: false
  }
]

const timeEntriesFormTour = [
  {
    element: ".tour--project-selection",
    popover: {
      title: "Project Selection",
      description: "Choose which project you're tracking time for."
    }
  },
  {
    element: ".tour--issue-selection",
    popover: {
      title: "Issue Selection",
      description: "Optionally link this time entry to a specific issue."
    }
  },
  {
    element: ".tour--description-field",
    popover: {
      title: "Description",
      description: "Describe what you worked on during this time."
    }
  },
  {
    element: ".tour--logged-time",
    popover: {
      title: "Logged Time",
      description: "The time you've already tracked for this entry. If left as 0, this time entry will start running automatically."
    }
  },
  {
    element: ".tour--form-actions",
    popover: {
      title: "Save or Cancel",
      description: "Save your time entry or cancel to discard changes."
    },
    disableActiveInteraction: false
  }
]

export default {
  "time_entries/index": timeEntriesIndexTour,
  "time_entries/form": timeEntriesFormTour
}