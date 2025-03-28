const projectsIndexTour = [
  {
    element: ".tour--header-guide-button",
    popover: {

      side: "bottom",
      align: 'end',
      title: "Guided Tour",
      description: "Quick tip: You can click here to see a guided tour for our features."
    },

  },
  {
    element: ".tour--open-focus-app-button",
    popover: {
      title: "Focus Space",
      description: "This is your focus space. Here you can concentrate on your current task without distractions."
    }
  },
  {
    element: ".tour--projects-list",
    popover: {
      title: "Your Projects",
      description: "This is the list of all your projects."
    }
  },
  {
    popover: {
      title: "Project Issues",
      description: "Issues are items that you need to accomplish in your project. Think them as tasks, bugs, features, ideas, etc."
    }
  },
  {
    element: ".tour--time-tracking",
    popover: {
      title: "Time Tracking",
      description: "Click here to track the time spent on your project and issues."
    }
  },
  {
    element: ".tour--workflow-board",
    popover: {
      title: "Workflow Board",
      description: "View your issues in a board."
    }
  },
  {
    element: ".tour--issues-list",
    popover: {
      title: "Issues List",
      description: "Start here: list all project issues."
    },
    disableActiveInteraction: false
  },
]

export default {
  "projects/index": projectsIndexTour
}