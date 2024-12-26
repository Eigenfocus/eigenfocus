class GroupingsController < ApplicationController
  def new
    @grouping = Grouping.new

    render partial: "form", locals: { visualization: current_visualization, grouping: @grouping  }
  end

  def create
    @grouping = current_visualization.create_grouping(permitted_params)
  end

  def edit
    @grouping = Grouping.find(params[:id])

    render partial: "form", locals: { visualization: current_visualization, grouping: @grouping  }
  end

  def update
    @grouping = Grouping.find(params[:id])

    @grouping.update(permitted_params)
  end

  def move
    position = params.require(:position)
    current_visualization.move_grouping!(to: position["to"], from: position["from"])
  end

  private
  def current_visualization
    @current_visualization ||= Visualization.find(params[:visualization_id])
  end

  def permitted_params
    params.require(:grouping).permit(:title)
  end
end
