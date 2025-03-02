export default {
  "visualization/board": [
    {
      element: ".tour--visualization-board",
      popover: {
        side: "top",
        align: 'end',
        title: "Workflow Board",
        description: "This board helps you manage your project workflow"
      }
    },
    {
      element: ".tour--column",
      popover: {
        title: "Workflow Column",
        description: "Each column represents a stage in your workflow"
      }
    },
    {
      element: ".tour--column-menu-button",
      popover: {
        title: "Column Actions",
        description: "Access more options to manage the column or issues"
      }
    },
    {
      element: ".tour--card",
      popover: {
        title: "Issue Card",
        description: "Each card represents an issue in your project"
      }
    },
    {
      element: ".tour--inline-create-button",
      popover: {
        title: "Create New Issue",
        description: "Quickly add new issues to any column"
      }
    }
  ]
}