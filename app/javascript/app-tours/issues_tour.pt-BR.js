const issuesIndexTour = [
  {
    element: ".tour--create-issue",
    popover: {
      title: "Criar Nova Issue",
      description: "Comece a rastrear tarefas criando uma nova issue."
    }
  },
  {
    element: ".tour--issues-table",
    popover: {
      title: "Lista de Issues",
      description: "Veja e gerencie todas as issues do seu projeto aqui."
    }
  },
  {
    element: ".tour--issue-labels",
    popover: {
      title: "Labels de Issues",
      description: "Aqui você pode gerenciar as labels existentes para este projeto"
    }
  },
  {
    element: ".tour--issue-actions",
    popover: {
      title: "Ações de Issues",
      description: "Ações disponíveis para cada issue."
    }
  },
  {
    element: ".tour--project-navigation-tabs > *:last-child",
    popover: {
      title: "Abas para navegar pelo projeto",
      description: "Próximo: navegue pelas visualizações do seu projeto."
    },
    disableActiveInteraction: false
  }
]

const issueDetailTour = [
  {
    element: ".tour--issue-detail-fields",
    popover: {
      title: "Detalhes da Issue",
      description: "Aqui você pode gerenciar o título, labels, descrição (suporta markdown), uploads de arquivos, etc."
    }
  },
  {
    element: ".tour--issue-detail-actions",
    popover: {
      title: "Ações da Issue",
      description: "Este painel contém ações que você pode realizar nesta issue, como alterar seu status ou removê-la."
    }
  },
  {
    element: ".tour--issue-detail-time-tracking",
    popover: {
      title: "Iniciar Registro de Tempo",
      description: "Próximo: clique aqui para começar a registrar o tempo gasto nesta issue."
    },
    disableActiveInteraction: false
  }
]

export default {
  "issues/index": issuesIndexTour,
  "issues/detail": issueDetailTour
}