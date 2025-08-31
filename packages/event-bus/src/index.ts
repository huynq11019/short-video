export type EventHandler<T = any> = (payload: T) => void;

class EventBus {
  private handlers = new Map<string, Set<EventHandler>>();

  emit<T>(event: string, payload: T): void {
    const set = this.handlers.get(event);
    if (set) {
      set.forEach(handler => handler(payload));
    }
  }

  on<T>(event: string, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler as EventHandler);
    return () => this.handlers.get(event)!.delete(handler as EventHandler);
  }
}

export const eventBus = new EventBus();
export const EVENTS = {
  VIDEO_VIEWED: 'VIDEO_VIEWED'
};
