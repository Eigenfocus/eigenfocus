class VisualizationsController < ApplicationController
  def show
    @visualization = Visualization.includes(groupings: :issues).find(params[:id])
    skip_layout_content_wrapper!
  end
end
