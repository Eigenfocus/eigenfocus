class VisualizationsController < ApplicationController
  def show
    @visualization = Visualization.find(params[:id])
  end
end
