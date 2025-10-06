/**
 * Event Helper Utilities
 * Type-safe event dispatching and handling utilities
 */

import type { CustomEventDetail } from '../types/index.js';

/**
 * Creates a type-safe custom event
 *
 * @param eventName - Name of the event (should be prefixed with component name)
 * @param detail - Event detail payload
 * @param options - Additional event options
 * @returns CustomEvent instance
 *
 * @example
 * const event = createCustomEvent('sando-button-click', {
 *   originalEvent: clickEvent,
 *   data: { buttonId: 'submit-btn' }
 * });
 * this.dispatchEvent(event);
 */
export function createCustomEvent<T extends CustomEventDetail = CustomEventDetail>(
  eventName: string,
  detail: T = {} as T,
  options: EventInit = {}
): CustomEvent<T> {
  return new CustomEvent(eventName, {
    bubbles: true,
    composed: true,
    cancelable: true,
    detail,
    ...options
  });
}

/**
 * Dispatch a custom event from an element
 *
 * @param element - Element to dispatch from
 * @param eventName - Name of the event
 * @param detail - Event detail payload
 * @returns Whether the event was not cancelled
 *
 * @example
 * dispatchCustomEvent(this, 'sando-change', {
 *   data: { value: 'new-value' }
 * });
 */
export function dispatchCustomEvent<T extends CustomEventDetail = CustomEventDetail>(
  element: EventTarget,
  eventName: string,
  detail: T = {} as T
): boolean {
  const event = createCustomEvent(eventName, detail);
  return element.dispatchEvent(event);
}

/**
 * Create a debounced version of an event handler
 *
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * const debouncedInput = debounce((e: Event) => {
 *   console.log('Input:', (e.target as HTMLInputElement).value);
 * }, 300);
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function debounced(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

/**
 * Create a throttled version of an event handler
 *
 * @param callback - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 *
 * @example
 * const throttledScroll = throttle((e: Event) => {
 *   console.log('Scroll position:', window.scrollY);
 * }, 100);
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return function throttled(...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}
