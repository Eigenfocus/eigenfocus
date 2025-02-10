class Visualizations::AllocationsChannel < ApplicationCable::Channel
  class << self
    def broadcast_update(allocation)
      visualization_id = allocation.grouping.visualization_id
      broadcast(
        "visualizations:#{visualization_id}:allocations#update",
        allocation
      )
    end

    private
    def broadcast(stream_id, payload)
      ActionCable.server.broadcast(stream_id, payload)
    end
  end

  def subscribed
    stream_from "visualizations:#{signed_params[:visualization_id]}:allocations##{signed_params[:action]}"
  end
end
