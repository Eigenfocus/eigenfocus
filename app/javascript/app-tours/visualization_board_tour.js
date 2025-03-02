const visualizationBoardTour = [
  {
    element: ".tour--visualization-board",
    popover: {
      side: "top",
      align: 'end',
      title: "Workflow Board",
      description: "Use this board to manage your project workflow."
    }
  },
  {
    element: ".tour--column",
    popover: {
      title: "Board Column",
      description: "You can create multiple columns."
    }
  },
  {
    element: ".tour--column-menu-button",
    popover: {
      title: "Column Actions",
      description: "Access more actions to manage the column or issues."
    }
  },
  {
    element: ".tour--inline-create-button",
    popover: {
      title: "Create New Issue",
      description: "Quickly add new issues to any column."
    }
  },
  {
    element: ".tour--card",
    popover: {
      title: "Issue Card",
      description: "Click here to view this issue card."
    },
    disableActiveInteraction: false
  }
]

export default {
  "visualization/board": visualizationBoardTour
}