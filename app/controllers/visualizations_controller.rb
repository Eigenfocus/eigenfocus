class VisualizationsController < ApplicationController
  def show
    @visualization = Visualization.includes(groupings: { allocations: :task }).find(params[:id])
  end
end
