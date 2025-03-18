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

Turbo::Streams::TagBuilder.prepend(TurboStreamDispatchEventHelper)
