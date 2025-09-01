import { eventBus } from '@short-video/event-bus';

export function resetEventBus() {
  // Accessing private field for test cleanup purposes
  (eventBus as any).handlers?.clear?.();
}
