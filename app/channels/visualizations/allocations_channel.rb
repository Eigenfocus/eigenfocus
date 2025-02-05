class Visualizations::AllocationsChannel < ApplicationCable::Channel
  def self.broadcast_update(allocation)
    visualization_id = allocation.grouping.visualization_id
    ActionCable.server.broadcast("visualizations/#{visualization_id}/allocations/updated", allocation)
  end

  def subscribed
    stream_from "visualizations/#{params[:visualization_id]}/allocations/updated"
  end
end
