const timeEntriesIndexTour = [
  {
    element: ".tour--new-time-entry",
    popover: {
      title: "Criar Registro de Tempo",
      description: "Registre seu trabalho criando um novo registro de tempo"
    }
  },
  {
    element: ".tour--calendar-dates",
    popover: {
      title: "Navegação entre datas",
      description: "Navegue entre diferentes dias para visualizar e gerenciar seus registros de tempo"
    }
  },
  {
    element: ".tour--time-entry",
    popover: {
      title: "Registro de Tempo",
      description: "Este é um registro de tempo para uma atividade do projeto."
    }
  },
  {
    element: ".tour--time-entry-duration",
    popover: {
      title: "Duração",
      description: "Este é o tempo total registrado para este registro de tempo."
    }
  },
  {
    element: ".tour--time-entry-actions",
    popover: {
      title: "Ações do Registro de Tempo",
      description: "Inicie, pare, edite ou remova seus registros de tempo."
    },
    disableActiveInteraction: false
  }, {
    popover: {
      title: "🥳 Você completou o tour!",
      description: "Esperamos que você aproveite o Eigenfocus. Se você tiver algum feedback, por favor, nos avise."
    }
  }
]

const timeEntriesFormTour = [
  {
    element: ".tour--project-selection",
    popover: {
      title: "Seleção de Projeto",
      description: "Escolha qual projeto você está rastreando o tempo."
    }
  },
  {
    element: ".tour--issue-selection",
    popover: {
      title: "Seleção de Issue",
      description: "Opcionalmente, vincule este registro de tempo a uma issue específica."
    }
  },
  {
    element: ".tour--description-field",
    popover: {
      title: "Descrição",
      description: "Descreva o que você fez durante este tempo."
    }
  },
  {
    element: ".tour--logged-time",
    popover: {
      title: "Tempo Registrado",
      description: "O tempo que você já registrou para este registro. Se deixado como 0, este registro de tempo começará a rodar automaticamente."
    }
  },
  {
    element: ".tour--form-actions",
    popover: {
      title: "Salvar ou Cancelar",
      description: "Salve seu registro de tempo ou cancele para descartar as alterações."
    },
    disableActiveInteraction: false
  }
]


export default {
  "time_entries/index": timeEntriesIndexTour,
  "time_entries/form": timeEntriesFormTour
}