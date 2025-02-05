class Visualizations::GroupingsChannel < ApplicationCable::Channel
  def self.broadcast_update(grouping)
    ActionCable.server.broadcast(
      "visualizations/#{grouping.visualization_id}/groupings/updated",
      grouping
    )
  end

  def subscribed
    stream_from "visualizations/#{params[:visualization_id]}/groupings/updated"
  end
end
