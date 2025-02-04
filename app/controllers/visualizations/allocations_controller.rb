class Visualizations::AllocationsController < ApplicationController
  def move
    @allocation = GroupingIssueAllocation.find_by(grouping_id: move_params[:from][:group], position: move_params[:from][:position])
    from_grouping = @allocation.grouping
    @allocation.update(grouping_id: move_params[:to][:group], position: move_params[:to][:position])
    @grouping = @allocation.grouping
    @issue = @allocation.issue

    broadcast_move(from_grouping, params)
  end

  private
  def move_params
    params.deep_transform_keys(&:to_sym)
  end

  def broadcast_move(grouping, params)
    Visualizations::AllocationsChannel.broadcast_move(
      grouping.id,
      params.permit(:origin, from: [ :position, :group ], to: [ :position, :group ])
    )
  end
end
