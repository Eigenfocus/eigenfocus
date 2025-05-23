class Visualizations::AllocationsController < Visualizations::BaseController
  def move
    @allocation = GroupingIssueAllocation.find_by(grouping_id: move_params[:from][:group], position: move_params[:from][:position])
    @allocation.update(grouping_id: move_params[:to][:group], position: move_params[:to][:position])
    @grouping = @allocation.grouping
    @issue = @allocation.issue
  end

  private
  def move_params
    params.deep_transform_keys(&:to_sym)
  end
end
