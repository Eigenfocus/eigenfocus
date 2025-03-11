class Visualizations::BaseController < ApplicationController
  helper_method :current_visualization

  private
  def current_visualization
    @current_visualization ||= Visualization.find(params[:visualization_id])
  end
end
