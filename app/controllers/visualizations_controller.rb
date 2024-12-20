class VisualizationsController < ApplicationController
  def show
    @visualization = Visualization.includes(groupings: { allocations: :issue }).find(params[:id])
  end
end
