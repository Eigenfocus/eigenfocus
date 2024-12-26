class VisualizationsController < ApplicationController
  def show
    @visualization = Visualization.includes(groupings: :issues).find(params[:id])
  end
end
