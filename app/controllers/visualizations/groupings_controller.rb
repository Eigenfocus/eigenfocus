class Visualizations::GroupingsController < ApplicationController
  helper_method :current_visualization

  def new
    @grouping = Grouping.new

    render partial: "form", locals: { visualization: current_visualization, grouping: @grouping  }
  end

  def create
    @grouping = current_visualization.groupings.create(permitted_params)
  end

  def edit
    @grouping = Grouping.find(params[:id])

    render partial: "form", locals: { visualization: current_visualization, grouping: @grouping  }
  end

  def update
    @grouping = Grouping.find(params[:id])

    @grouping.update(permitted_params)
  end

  def destroy
    @grouping = current_visualization.groupings.find(params[:id])

    @grouping.destroy
  end

  def move
    move_params = params.deep_transform_keys(&:to_sym)
    current_visualization.groupings.find_by(position: move_params[:from][:position]).update(position: move_params[:to][:position])
  end

  def move_all_issues
    @source_grouping = current_visualization.groupings.find(params[:id])

    render partial: "move_all_issues_modal", locals: {
      visualization: current_visualization,
      source_grouping: @source_grouping
    }
  end

  def move_all_issues_to
    @source_grouping = current_visualization.groupings.find(params[:id])
    @target_grouping = current_visualization.groupings.includes(:allocations).find(params[:target_grouping_id])

    ActiveRecord::Base.transaction do
      @source_grouping.allocations.each do |allocation|
        allocation.update(grouping: @target_grouping, position: :last)
      end
    end
  end

  private
  def current_visualization
    @current_visualization ||= Visualization.find(params[:visualization_id])
  end

  def permitted_params
    params.require(:grouping).permit(:title, :hidden)
  end
end
