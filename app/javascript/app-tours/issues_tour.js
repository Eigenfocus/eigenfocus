const issuesIndexTour = [
  {
    element: ".tour--create-issue",
    popover: {
      title: "Create New Issue",
      description: "Start tracking tasks by creating a new issue."
    }
  },
  {
    element: ".tour--issues-table",
    popover: {
      title: "Issues List",
      description: "View and manage all your project issues here."
    }
  },
  {
    element: ".tour--issue-labels",
    popover: {
      title: "Issue Labels",
      description: "Here you can manage the existing issue labels for this project"
    }
  },
  {
    element: ".tour--issue-actions",
    popover: {
      title: "Issue Actions",
      description: "These actions are available for each issue."
    }
  },
  {
    element: ".tour--project-navigation-tabs > *:last-child",
    popover: {
      title: "Project Navigation",
      description: "Next: navigate through your project views."
    },
    disableActiveInteraction: false
  }
]

const issueDetailTour = [
  {
    element: ".tour--issue-detail-fields",
    popover: {
      title: "Issue Details",
      description: "Here you can manage an issue title, labels, description (supports markdown), file uploads, etc."
    }
  },
  {
    element: ".tour--issue-detail-actions",
    popover: {
      title: "Issue Actions",
      description: "This panel contains actions you can perform on this issue, such as changing its status or removing it."
    }
  },
  {
    element: ".tour--issue-detail-time-tracking",
    popover: {
      title: "Start Time Tracking",
      description: "Next: click here to start tracking time spent on this issue."
    },
    disableActiveInteraction: false
  }
]

export default {
  "issues/index": issuesIndexTour,
  "issues/detail": issueDetailTour
}