const projectsIndexTour = [
  {
    element: ".tour--header-guide-button",
    popover: {

      side: "bottom",
      align: 'end',
      title: "Guia de Funcionalidades",
      description: "Dica rápida: Você pode clicar aqui para ver um guia de nossas funcionalidades."
    },

  },
  {
    element: ".tour--add-project",
    popover: {
      title: "Criar Novo Projeto",
      description: "Você pode criar um novo projeto clicando aqui."
    }
  },
  {
    element: ".tour--projects-list",
    popover: {
      title: "Seus Projetos",
      description: "Esta é a lista de todos os seus projetos."
    }
  },
  {
    popover: {
      title: "Issues do Projeto",
      description: "Issues são itens que você precisa completar em seu projeto. Pense nelas como tarefas, bugs, funcionalidades, ideias, etc."
    }
  },
  {
    element: ".tour--time-tracking",
    popover: {
      title: "Controle de Tempo",
      description: "Clique aqui para controlar o tempo gasto nos projetos e issues."
    }
  },
  {
    element: ".tour--workflow-board",
    popover: {
      title: "Quadro de Fluxo",
      description: "Veja seu quadro de trabalho."
    }
  },
  {
    element: ".tour--issues-list",
    popover: {
      title: "Lista de Problemas",
      description: "Comece aqui: liste todas as issues do seu projeto."
    },
    disableActiveInteraction: false
  },
]

export default {
  "projects/index": projectsIndexTour
}