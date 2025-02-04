class Visualizations::GroupingsChannel < ApplicationCable::Channel
  def self.broadcast_move(visualization_id, move)
    ActionCable.server.broadcast("visualizations/#{visualization_id}/groupings/move", move)
  end

  def subscribed
    stream_from "visualizations/#{params[:visualization_id]}/groupings/move"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
