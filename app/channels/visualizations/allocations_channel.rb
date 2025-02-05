class Visualizations::AllocationsChannel < ApplicationCable::Channel
  def self.broadcast_move(visualization_id, move)
    ActionCable.server.broadcast("visualizations/#{visualization_id}/allocations/move", move)
  end

  def subscribed
    stream_from "visualizations/#{params[:visualization_id]}/allocations/move"
  end
end
