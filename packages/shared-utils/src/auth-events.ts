import { eventBus } from './event-bus';

export const AUTH_EVENTS = {
  AUTH_CHANGED: 'AUTH_CHANGED'
};

export const authEventBus = eventBus;
