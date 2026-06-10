import { createCustomEvent, dispatchCustomEvent, debounce, throttle } from './event-helpers.js';

describe('event-helpers', () => {
  describe('createCustomEvent', () => {
    it('should create a CustomEvent with default options', () => {
      const event = createCustomEvent('sando-test');
      expect(event.type).toBe('sando-test');
      expect(event.bubbles).toBe(true);
      expect(event.composed).toBe(true);
      expect(event.cancelable).toBe(true);
      expect(event.detail).toEqual({});
    });

    it('should create a CustomEvent with detail payload', () => {
      const detail = { data: { value: 'test' }, originalEvent: new Event('click') };
      const event = createCustomEvent('sando-change', detail);
      expect(event.detail).toEqual(detail);
    });

    it('should merge override options on top of defaults', () => {
      const event = createCustomEvent('sando-test', {} as any, {
        bubbles: false,
        cancelable: false
      });
      expect(event.bubbles).toBe(false);
      expect(event.composed).toBe(true);
      expect(event.cancelable).toBe(false);
    });

    it('should create event with string detail', () => {
      const event = createCustomEvent('sando-test', { data: 'hello' });
      expect(event.detail.data).toBe('hello');
    });
  });

  describe('dispatchCustomEvent', () => {
    it('should dispatch a CustomEvent on the given element', () => {
      const element = document.createElement('div');
      const spy = vi.spyOn(element, 'dispatchEvent');
      dispatchCustomEvent(element, 'sando-test', { data: 'payload' });
      expect(spy).toHaveBeenCalledTimes(1);
      const event = spy.mock.calls[0][0] as CustomEvent;
      expect(event.type).toBe('sando-test');
      expect(event.detail.data).toBe('payload');
    });

    it('should return true when event is not cancelled', () => {
      const element = document.createElement('div');
      const result = dispatchCustomEvent(element, 'sando-test');
      expect(result).toBe(true);
    });

    it('should return false when event is cancelled', () => {
      const element = document.createElement('div');
      element.addEventListener('sando-test', (e: Event) => e.preventDefault());
      const result = dispatchCustomEvent(element, 'sando-test');
      expect(result).toBe(false);
    });

    it('should pass detail through to the created event', () => {
      const element = document.createElement('div');
      let capturedDetail: any;
      element.addEventListener('sando-test', ((e: CustomEvent) => {
        capturedDetail = e.detail;
      }) as EventListener);
      dispatchCustomEvent(element, 'sando-test', { key: 'value' });
      expect(capturedDetail).toEqual({ key: 'value' });
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should call the callback after the specified delay', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      debounced('arg1', 'arg2');
      expect(fn).not.toHaveBeenCalled();
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should reset the timer on multiple calls', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      debounced();
      vi.advanceTimersByTime(50);
      debounced();
      vi.advanceTimersByTime(50);
      expect(fn).not.toHaveBeenCalled();
      vi.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should only call once for rapid successive calls', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      for (let i = 0; i < 10; i++) {
        debounced();
      }
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should pass the arguments of the last call', () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);
      debounced('first');
      debounced('second');
      debounced('third');
      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledWith('third');
    });
  });

  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should call the callback immediately on first invocation', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should ignore calls within the delay window', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);
      throttled();
      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should call again after the delay has elapsed', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);
      throttled();
      vi.advanceTimersByTime(100);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should pass arguments through to the callback', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 100);
      throttled('arg1', 'arg2');
      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should respect spacing between timed calls', () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 50);
      throttled();
      vi.advanceTimersByTime(30);
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(20);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
