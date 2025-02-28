// Event emitter-based Dispatcher for handling frontend events and commands
class Dispatcher {
  constructor() {
    if (Dispatcher.instance) {
      return Dispatcher.instance;
    }

    this.events = new Map();
    this.middlewares = [];
    Dispatcher.instance = this;
  }

  /**
   * Add a middleware to process events before they reach subscribers
   * @param {Function} middleware - (event, next) => void
   */
  use(middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Subscribe to an event
   * @param {string} eventName - The event to subscribe to
   * @param {Function} handler - The event handler
   * @param {Object} options - Subscription options
   * @param {boolean} options.once - Whether to handle the event only once
   * @param {number} options.priority - Handler priority (higher numbers run first)
   * @returns {Function} - Unsubscribe function
   */
  on(eventName, handler, { once = false, priority = 0 } = {}) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    const subscription = {
      handler,
      once,
      priority,
      removed: false
    };

    const handlers = this.events.get(eventName);
    handlers.push(subscription);
    // Sort by priority (higher numbers first)
    handlers.sort((a, b) => b.priority - a.priority);

    return () => {
      subscription.removed = true;
      this.cleanupEvent(eventName);
    };
  }

  /**
   * Subscribe to an event once
   * @param {string} eventName - The event to subscribe to
   * @param {Function} handler - The event handler
   * @param {number} priority - Handler priority (higher numbers run first)
   * @returns {Function} - Unsubscribe function
   */
  once(eventName, handler, priority = 0) {
    return this.on(eventName, handler, { once: true, priority });
  }

  /**
   * Remove all handlers for an event
   * @param {string} eventName - The event to clear
   */
  off(eventName) {
    this.events.delete(eventName);
  }

  /**
   * Emit an event with data
   * @param {string} eventName - The event to emit
   * @param {Object} data - Event data
   * @param {string} data.type - Event type ('event' or 'command')
   * @param {*} data.payload - Event payload
   */
  emit(eventName, data) {
    const handlers = this.events.get(eventName);
    if (!handlers) return;

    // Process through middleware chain
    const runMiddlewareChain = (index = 0) => {
      if (index >= this.middlewares.length) {
        this.executeHandlers(eventName, data);
        return;
      }

      const middleware = this.middlewares[index];
      middleware(data, () => runMiddlewareChain(index + 1));
    };

    runMiddlewareChain();
  }

  /**
   * Execute handlers for an event
   * @private
   */
  executeHandlers(eventName, data) {
    const handlers = this.events.get(eventName);
    if (!handlers) return;

    handlers.forEach(subscription => {
      if (subscription.removed) return;

      try {
        subscription.handler(data);
      } catch (error) {
        console.error(`Error in event handler for ${eventName}:`, error);
      }

      if (subscription.once) {
        subscription.removed = true;
      }
    });

    this.cleanupEvent(eventName);
  }

  /**
   * Clean up removed handlers for an event
   * @private
   */
  cleanupEvent(eventName) {
    const handlers = this.events.get(eventName);
    if (!handlers) return;

    const activeHandlers = handlers.filter(h => !h.removed);
    if (activeHandlers.length === 0) {
      this.events.delete(eventName);
    } else {
      this.events.set(eventName, activeHandlers);
    }
  }

  /**
   * Get the singleton instance
   * @returns {Dispatcher}
   */
  static getInstance() {
    if (!Dispatcher.instance) {
      Dispatcher.instance = new Dispatcher();
    }
    return Dispatcher.instance;
  }
}

export default Dispatcher.getInstance();