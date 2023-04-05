export class EventBus<
  Events extends Record<string, (...args: never[]) => void>
> {
  private readonly listeners: {
    [K in keyof Events]?: Events[K][];
  };

  constructor() {
    this.listeners = {};
  }

  /**
   * Subscribe to an event
   */
  public on<K extends keyof Events>(event: K, callback: Events[K]): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  /**
   * Unsubscribe to an event
   */
  public off<K extends keyof Events>(event: K, callback: Events[K]): void {
    if (!this.listeners[event]) {
      throw new Error(`Event not found: ${String(event)}`);
    }

    this.listeners[event] = this.listeners[event]?.filter(
      (listener) => listener !== callback
    );
  }
  /**
   * Notify all subscribers of the event
   */
  public emit<K extends keyof Events>(
    event: K,
    ...args: Parameters<Events[K]>
  ): void {
    if (!this.listeners[event]) {
      // throw new Error(`Event not found: ${String(event)}`);
      return;
    }

    this.listeners[event]?.forEach((listener) => {
      listener(...args);
    });
  }
}
