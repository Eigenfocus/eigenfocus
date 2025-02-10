class VisualizationsController < ApplicationController
  include IssueEmbeddable

  def show
    @visualization = Visualization.includes(groupings: :issues).find(params[:id])
    skip_layout_content_wrapper!

    if params[:issue_id]
      @issue = Issue.find(params[:issue_id])
      open_issue(
        @issue,
        back_path: visualization_path(@visualization),
        form_path: visualization_issue_path(@visualization, @issue)
      )
    end
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
