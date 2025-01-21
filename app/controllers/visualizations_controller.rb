class VisualizationsController < ApplicationController
  def show
    @visualization = Visualization.includes(groupings: :issues).find(params[:id])
    if params[:issue_id]
      @open_issue = Issue.find(params[:issue_id])
    end
    skip_layout_content_wrapper!
  end
end
