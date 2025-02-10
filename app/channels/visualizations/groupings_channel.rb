class Visualizations::GroupingsChannel < ApplicationCable::Channel
  class << self
    def broadcast_update(grouping)
      broadcast(
        "visualizations:#{grouping.visualization_id}:groupings#update",
        grouping
      )
    end

    private
    def broadcast(stream_id, payload)
      ActionCable.server.broadcast(stream_id, payload)
    end
  end

  def subscribed
    stream_from "visualizations:#{signed_params[:visualization_id]}:groupings##{signed_params[:action]}"
  end
end
