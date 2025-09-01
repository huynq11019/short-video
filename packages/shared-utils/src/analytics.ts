import { eventBus } from './event-bus';

export const ANALYTICS_EVENTS = {
  VIDEO_VIEWED: 'VIDEO_VIEWED'
};

export function trackEvent<T>(event: string, payload: T): void {
  eventBus.emit(event, payload);
}

export function onEvent<T>(event: string, handler: (payload: T) => void): () => void {
  const subscription = eventBus.on<T>(event).subscribe(handler);
  return () => subscription.unsubscribe();
}
