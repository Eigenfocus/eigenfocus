class GroupingsController < ApplicationController
  def new
    @grouping = Grouping.new

    render partial: "form", locals: { visualization: current_visualization, grouping: @grouping  }
  end

  def create
    @grouping = current_visualization.create_grouping(permitted_params)
  end

  private
  def current_visualization
    @current_visualization ||= Visualization.find(params[:visualization_id])
  end

  def permitted_params
    params.require(:grouping).permit(:title)
  end
end
