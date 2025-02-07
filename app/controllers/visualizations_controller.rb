class VisualizationsController < ApplicationController
  include IssuesHelper

  def show
    @visualization = Visualization.includes(groupings: :issues).find(params[:id])
    if params[:issue_id]
      @open_issue = Issue.find(params[:issue_id])
    end
    skip_layout_content_wrapper!
  end

  def update
    @visualization = Visualization.find(params[:id])

    @updated = @visualization.update(visualization_params)
  end

  private
  def visualization_params
    params.require(:visualization).permit(favorite_issue_labels: [])
  end
end
