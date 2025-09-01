import { trackEvent, onEvent, ANALYTICS_EVENTS } from './analytics';

describe('analytics event bus integration', () => {
  it('should emit and listen to events', () => {
    const payload = { id: 1 };
    const handler = jest.fn();
    const off = onEvent<typeof payload>(ANALYTICS_EVENTS.VIDEO_VIEWED, handler);
    trackEvent(ANALYTICS_EVENTS.VIDEO_VIEWED, payload);
    expect(handler).toHaveBeenCalledWith(payload);
    off();
  });
});
