class Visualizations::IssuesController < Visualizations::BaseController
  def create
    @issue = Issue.new(permitted_params.merge(project_id: current_visualization.project.id))
    @grouping = Grouping.find params[:allocate_to_grouping_id]

    ActiveRecord::Base.transaction do
      if @issue.save
        @grouping.allocate_issue(@issue)
      end
    end
  end

  def update
    @issue = Issue.find(params[:id])
    @updated = @issue.update(permitted_params)
  end

  private
  def permitted_params
    params.require(:issue).permit(:title, :description, files: [])
  end
end
