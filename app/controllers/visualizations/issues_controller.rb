class Visualizations::IssuesController < ApplicationController
  helper_method :current_visualization

  def create
    @issue = Issue.new(permitted_params.merge(project_id: current_visualization.project.id))
    @grouping = Grouping.find params[:allocate_to_grouping_id]

    ActiveRecord::Base.transaction do
      if @issue.save
        @grouping.allocate_issue(@issue)
      end
    end
  end

  def edit
    @issue = Issue.find(params[:id])
    render partial: "form", locals: { visualization: current_visualization, issue: @issue  }
  end

  def update
    @issue = Issue.find(params[:id])
    @updated = @issue.update(permitted_params)
  end

  def destroy
    @issue = Issue.find(params[:id])
    @issue.destroy
  end

  private
  def current_visualization
    @current_visualization ||= Visualization.find(params[:visualization_id])
  end

  def permitted_params
    params.require(:issue).permit(:title, :description, files: [])
  end
end
