import { fixture } from '@open-wc/testing';
import {
  isFocusable,
  getFocusableElements,
  trapFocus,
  getSlotTextContent,
  hasSlotContent
} from './dom-helpers.js';

describe('dom-helpers', () => {
  describe('isFocusable', () => {
    it('should return true for a focusable element (anchor with href)', () => {
      const el = document.createElement('a');
      el.setAttribute('href', 'https://example.com');
      expect(isFocusable(el)).toBe(true);
    });

    it('should return true for a button without disabled', () => {
      const el = document.createElement('button');
      expect(isFocusable(el)).toBe(true);
    });

    it('should return true for an input without disabled', () => {
      const el = document.createElement('input');
      expect(isFocusable(el)).toBe(true);
    });

    it('should return true for an element with positive tabindex', () => {
      const el = document.createElement('div');
      el.setAttribute('tabindex', '0');
      expect(isFocusable(el)).toBe(true);
    });

    it('should return true for element with contenteditable', () => {
      const el = document.createElement('div');
      el.setAttribute('contenteditable', 'true');
      expect(isFocusable(el)).toBe(true);
    });

    it('should return false for a disabled button', () => {
      const el = document.createElement('button');
      el.setAttribute('disabled', '');
      expect(isFocusable(el)).toBe(false);
    });

    it('should return false for an element with tabindex="-1"', () => {
      const el = document.createElement('button');
      el.setAttribute('tabindex', '-1');
      expect(isFocusable(el)).toBe(false);
    });

    it('should return false for a non-focusable element', () => {
      const el = document.createElement('div');
      expect(isFocusable(el)).toBe(false);
    });

    it('should return false for a disabled input', () => {
      const el = document.createElement('input');
      el.setAttribute('disabled', '');
      expect(isFocusable(el)).toBe(false);
    });

    it('should return false for a disabled textarea', () => {
      const el = document.createElement('textarea');
      el.setAttribute('disabled', '');
      expect(isFocusable(el)).toBe(false);
    });

    it('should return false for a disabled select', () => {
      const el = document.createElement('select');
      el.setAttribute('disabled', '');
      expect(isFocusable(el)).toBe(false);
    });
  });

  describe('getFocusableElements', () => {
    it('should return all focusable elements in a container', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button>One</button>
        <input />
        <a href="#">Link</a>
        <span>Not focusable</span>
        <textarea></textarea>
      `;
      const result = getFocusableElements(container);
      expect(result).toHaveLength(4);
    });

    it('should exclude disabled elements', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button disabled>Disabled</button>
        <button>Enabled</button>
        <input disabled />
      `;
      const result = getFocusableElements(container);
      expect(result).toHaveLength(1);
      expect(result[0].textContent).toBe('Enabled');
    });

    it('should include elements with tabindex="-1" that match other selectors', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button>One</button>
        <button tabindex="-1">Skip</button>
      `;
      const result = getFocusableElements(container);
      // getFocusableElements uses CSS selectors only; it matches
      // button:not([disabled]) regardless of tabindex
      expect(result).toHaveLength(2);
    });

    it('should return empty array for container with no focusable elements', () => {
      const container = document.createElement('div');
      container.innerHTML = `<span>Not focusable</span><div>Also not</div>`;
      const result = getFocusableElements(container);
      expect(result).toEqual([]);
    });

    it('should handle ShadowRoot as container', () => {
      const host = document.createElement('div');
      const shadow = host.attachShadow({ mode: 'open' });
      shadow.innerHTML = `<button>Shadow</button><input /><span>Nope</span>`;
      const result = getFocusableElements(shadow);
      expect(result).toHaveLength(2);
    });
  });

  describe('trapFocus', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
      container = document.createElement('div');
      container.innerHTML = `
        <button id="first">First</button>
        <button id="second">Second</button>
        <button id="last">Last</button>
      `;
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should focus the first element on initialization', () => {
      const cleanup = trapFocus(container);
      expect(document.activeElement?.id).toBe('first');
      cleanup();
    });

    it('should wrap Tab from last to first', () => {
      const cleanup = trapFocus(container);
      const lastEl = container.querySelector<HTMLElement>('#last')!;
      lastEl.focus();

      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true
      });
      lastEl.dispatchEvent(event);

      expect(document.activeElement?.id).toBe('first');
      cleanup();
    });

    it('should wrap Shift+Tab from first to last', () => {
      const cleanup = trapFocus(container);
      const firstEl = container.querySelector<HTMLElement>('#first')!;
      firstEl.focus();

      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true
      });
      firstEl.dispatchEvent(event);

      expect(document.activeElement?.id).toBe('last');
      cleanup();
    });

    it('should not trap focus when activeElement is not first or last', () => {
      const cleanup = trapFocus(container);
      const secondEl = container.querySelector<HTMLElement>('#second')!;
      secondEl.focus();

      const tabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true
      });
      const shiftTabEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true
      });

      const secondFocus = document.activeElement;
      secondEl.dispatchEvent(tabEvent);
      expect(document.activeElement?.id).toBe(secondFocus?.id);

      secondEl.dispatchEvent(shiftTabEvent);
      expect(document.activeElement?.id).toBe(secondFocus?.id);

      cleanup();
    });

    it('should ignore non-Tab key events', () => {
      const cleanup = trapFocus(container);
      const firstEl = container.querySelector<HTMLElement>('#first')!;
      firstEl.focus();

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true
      });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      firstEl.dispatchEvent(event);
      expect(preventDefaultSpy).not.toHaveBeenCalled();

      cleanup();
    });

    it('should cleanup event listener when returned function is called', () => {
      const cleanup = trapFocus(container);
      const removeSpy = vi.spyOn(container, 'removeEventListener');
      cleanup();
      expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('should handle container with no focusable elements gracefully', () => {
      const emptyContainer = document.createElement('div');
      emptyContainer.innerHTML = `<span>Not focusable</span>`;
      const cleanup = trapFocus(emptyContainer);
      expect(document.activeElement).not.toBeNull();
      cleanup();
    });
  });

  describe('getSlotTextContent', () => {
    it('should return text content from assigned nodes', async () => {
      const host = await fixture<HTMLDivElement>('<div><span>Hello</span></div>');
      const slot = document.createElement('slot');
      const span = host.querySelector('span')!;
      Object.defineProperty(slot, 'assignedNodes', {
        value: () => [span],
        configurable: true
      });
      expect(getSlotTextContent(slot)).toBe('Hello');
    });

    it('should return concatenated text from multiple assigned nodes', async () => {
      const slot = document.createElement('slot');
      const text1 = document.createTextNode('Hello ');
      const text2 = document.createTextNode('World');
      Object.defineProperty(slot, 'assignedNodes', {
        value: () => [text1, text2],
        configurable: true
      });
      expect(getSlotTextContent(slot)).toBe('Hello World');
    });

    it('should return empty string for empty slot', () => {
      const slot = document.createElement('slot');
      Object.defineProperty(slot, 'assignedNodes', {
        value: () => [],
        configurable: true
      });
      expect(getSlotTextContent(slot)).toBe('');
    });
  });

  describe('hasSlotContent', () => {
    it('should return true when slot has assigned nodes', () => {
      const slot = document.createElement('slot');
      const node = document.createTextNode('content');
      Object.defineProperty(slot, 'assignedNodes', {
        value: () => [node],
        configurable: true
      });
      expect(hasSlotContent(slot)).toBe(true);
    });

    it('should return false when slot has no assigned nodes', () => {
      const slot = document.createElement('slot');
      Object.defineProperty(slot, 'assignedNodes', {
        value: () => [],
        configurable: true
      });
      expect(hasSlotContent(slot)).toBe(false);
    });
  });
});
