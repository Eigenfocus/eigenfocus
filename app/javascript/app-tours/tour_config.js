import projectToursEn from "app-tours/projects_tours.en"
import projectToursPtBR from "app-tours/projects_tours.pt-BR"
import issuesTourEn from "app-tours/issues_tour.en"
import issuesTourPtBR from "app-tours/issues_tour.pt-BR"
import visualizationBoardTourEn from "app-tours/visualization_board_tour.en"
import visualizationBoardTourPtBR from "app-tours/visualization_board_tour.pt-BR"
import timeEntriesTourEn from "app-tours/time_entries_tours.en"
import timeEntriesTourPtBR from "app-tours/time_entries_tours.pt-BR"

const TOUR_CONFIGS = {
  'en': {
    ...projectToursEn,
    ...issuesTourEn,
    ...visualizationBoardTourEn,
    ...timeEntriesTourEn
  },
  'pt-BR': {
    ...projectToursPtBR,
    ...issuesTourPtBR,
    ...visualizationBoardTourPtBR,
    ...timeEntriesTourPtBR
  }
}

export function getTourConfigs(language) {
  return TOUR_CONFIGS[language] || TOUR_CONFIGS['en']
}