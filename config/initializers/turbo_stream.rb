module TurboStreamDispatchEventHelper
  # Creates a turbo stream tag like:
  #   <turbo-stream action="dispatch_event" event="some_event" data="{}"></turbo-stream>
  #
  def dispatch_event(event:, data: {})
    # Allows data to be serialized before dispatching it
    data = data.to_json unless data.is_a? String

    turbo_stream_action_tag :dispatch_event, event: event, data: data
  end
end

module Turbo::Streams::Broadcasts
  def broadcast_dispatch_message_to(*streamables, action:, **opts)
    broadcast_stream_to(
      *streamables,
      content: turbo_stream_action_tag(action, **opts)
    )
  end

  def broadcast_dispatch_message_later_to(*streamables, action:, **opts)
    Turbo::Streams::BroadcastStreamJob.perform_later(
      stream_name_from(streamables),
      content: turbo_stream_action_tag(action, **opts)
    )
  end
end

module Turbo::Broadcastable
  def broadcast_dispatch_event_to(*streamables, event:, data: {})
    broadcast_dispatch_message(*streamables, action: :dispatch_event, event:, data:)
  end

  def broadcast_dispatch_event_later_to(*streamables, event:, data: {})
    broadcast_dispatch_message_later(*streamables, action: :dispatch_event, event:, data:)
  end

  private
  def broadcast_dispatch_message(*streamables, **opts)
    unless suppressed_turbo_broadcasts?
      Turbo::StreamsChannel.broadcast_dispatch_message_to(*streamables, **opts)
    end
  end

  def broadcast_dispatch_message_later(*streamables, **opts)
    unless suppressed_turbo_broadcasts?
      Turbo::StreamsChannel.broadcast_dispatch_message_later_to(*streamables, **opts)
    end
  end
end

Turbo::Streams::TagBuilder.prepend(TurboStreamDispatchEventHelper)
