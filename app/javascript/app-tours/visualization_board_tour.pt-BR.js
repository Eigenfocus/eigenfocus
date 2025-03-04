const visualizationBoardTour = [
  {
    element: ".tour--visualization-board",
    popover: {
      side: "top",
      align: 'end',
      title: "Quadro de Trabalho",
      description: "Use este quadro para acompanhar o andamento do seu projeto."
    }
  },
  {
    element: ".tour--column",
    popover: {
      title: "Colunas",
      description: "Você pode criar várias colunas."
    }
  },
  {
    element: ".tour--column-menu-button",
    popover: {
      title: "Ações da Coluna",
      description: "Acesse mais ações para gerenciar a coluna ou issues."
    }
  },
  {
    element: ".tour--inline-create-button",
    popover: {
      title: "Criar Nova Issue",
      description: "Adicione rapidamente novas issues a qualquer coluna."
    }
  },
  {
    element: ".tour--card",
    popover: {
      title: "Cartão de Issue",
      description: "Clique aqui para ver este cartão de issue."
    },
    disableActiveInteraction: false
  }
]

export default {
  "visualization/board": visualizationBoardTour
}