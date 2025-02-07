class Visualizations::AllocationsChannel < ApplicationCable::Channel
  class << self
    def broadcast_update(allocation)
      visualization_id = allocation.grouping.visualization_id
      broadcard(
        "visualizations:#{visualization_id}:allocations#update",
        allocation
      )
    end

    private
    def broadcard(stream_id, payload)
      ActionCable.server.broadcast(stream_id, payload)
    end
  end

  def subscribed
    stream_from "visualizations:#{params[:visualization_id]}:allocations##{params[:action]}"
  end
end
