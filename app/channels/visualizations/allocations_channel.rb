class Visualizations::AllocationsChannel < ApplicationCable::Channel
  def self.broadcast_move(grouping_id, move)
    ActionCable.server.broadcast("visualizations/#{grouping_id}/allocations/move", move)
  end

  def subscribed
    stream_from "visualizations/#{params[:grouping_id]}/allocations/move"
  end
end
