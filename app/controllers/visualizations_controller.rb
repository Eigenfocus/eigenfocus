class VisualizationsController < ApplicationController
  def update
    @visualization = Visualization.find(params[:id])

    @updated = @visualization.update(visualization_params)
  end

  def show
    @visualization = Visualization.includes(groupings: :issues).find(params[:id])
    if params[:issue_id]
      @open_issue = Issue.find(params[:issue_id])
    end
    skip_layout_content_wrapper!
  end

  def visualization_params
    params.require(:visualization).permit(favorite_issue_labels: [])
  end
end
