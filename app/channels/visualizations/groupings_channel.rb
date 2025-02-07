class Visualizations::GroupingsChannel < ApplicationCable::Channel
  class << self
    def broadcast_update(grouping)
      broadcard(
        "visualizations:#{grouping.visualization_id}:groupings#update",
        grouping
      )
    end

    private
    def broadcard(stream_id, payload)
      ActionCable.server.broadcast(stream_id, payload)
    end
  end

  def subscribed
    stream_from "visualizations:#{params[:visualization_id]}:groupings##{params[:action]}"
  end
end
