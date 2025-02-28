import consumer from "../consumer";
import dispatcher from "../../services/dispatcher";

const GroupingsChannel = {
  /**
   * Subscribe to groupings updates for a specific visualization
   * @param {string} token - The signed stream token for authentication
   */
  subscribe(token) {
    const subscription = consumer.subscriptions.create({
      channel: "Visualizations::GroupingsChannel",
      token: token
    }, {
      received: (data) => {
        dispatcher.emit("groupings:received", {
          type: "event",
          payload: data
        });
      }
    });

    return subscription;
  },

  signed_stream_token_for(visualization) {
    // Implementation of signed_stream_token_for method
  }
};

export default GroupingsChannel;