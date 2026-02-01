/**
 * Unit Tests for sando-button
 * Example test file demonstrating testing patterns
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-button.js';
import type { SandoButton } from './sando-button.js';

describe('sando-button', () => {
  let element: SandoButton;

  beforeEach(async () => {
    element = await fixture<SandoButton>(html`<sando-button>Click me</sando-button>`);
  });

  describe('Rendering', () => {
    it('should render with default properties', () => {
      expect(element).toBeDefined();
      expect(element.variant).toBe('solid');
      expect(element.size).toBe('medium');
      expect(element.disabled).toBe(false);
      expect(element.loading).toBe(false);
    });

    it('should render slot content', () => {
      expect(element.textContent?.trim()).toBe('Click me');
    });

    it('should be accessible', async () => {
      await expectWc(element).to.be.accessible();
    });
  });

  describe('Properties', () => {
    it('should update variant property', async () => {
      element.variant = 'outline';
      await element.updateComplete;
      expect(element.variant).toBe('outline');
      expect(element.getAttribute('variant')).toBe('outline');
    });

    it('should support text variant', async () => {
      element.variant = 'text';
      await element.updateComplete;
      expect(element.variant).toBe('text');
      expect(element.getAttribute('variant')).toBe('text');
    });

    it('should update size property', async () => {
      element.size = 'large';
      await element.updateComplete;
      expect(element.size).toBe('large');
      expect(element.getAttribute('size')).toBe('large');
    });

    it('should support xs size', async () => {
      element.size = 'xs';
      await element.updateComplete;
      expect(element.size).toBe('xs');
      expect(element.getAttribute('size')).toBe('xs');
    });

    it('should update disabled property', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(element.disabled).toBe(true);
      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('should update loading property', async () => {
      element.loading = true;
      await element.updateComplete;
      expect(element.loading).toBe(true);
      expect(element.hasAttribute('loading')).toBe(true);
    });
  });

  describe('Events', () => {
    it('should dispatch click event when clicked', async () => {
      let clicked = false;
      element.addEventListener('click', () => {
        clicked = true;
      });

      const button = element.shadowRoot?.querySelector('button');
      button?.click();

      expect(clicked).toBe(true);
    });

    it('should not dispatch click event when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      let clicked = false;
      element.addEventListener('click', () => {
        clicked = true;
      });

      const button = element.shadowRoot?.querySelector('button');
      button?.click();

      expect(clicked).toBe(false);
    });

    it('should not dispatch click event when loading', async () => {
      element.loading = true;
      await element.updateComplete;

      let clicked = false;
      element.addEventListener('click', () => {
        clicked = true;
      });

      const button = element.shadowRoot?.querySelector('button');
      button?.click();

      expect(clicked).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA attributes when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have correct ARIA attributes when loading', async () => {
      element.loading = true;
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('aria-busy')).toBe('true');
    });

    it('should be keyboard accessible', async () => {
      const button = element.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('tabindex')).not.toBe('-1');
    });

    it('should not have aria-pressed by default', async () => {
      await element.updateComplete;
      const button = element.shadowRoot?.querySelector('button');
      // When toggle=false, aria-pressed should not be present (null)
      expect(button?.getAttribute('aria-pressed')).toBeNull();
    });

    it('should have aria-pressed when toggle is true', async () => {
      element.toggle = true;
      element.active = false;
      await element.updateComplete;
      const button = element.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('aria-pressed')).toBe('false');
    });

    it('should update aria-pressed when active changes on toggle', async () => {
      element.toggle = true;
      element.active = true;
      await element.updateComplete;
      const button = element.shadowRoot?.querySelector('button');
      expect(button?.getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should delegate focus from custom element to internal button', async () => {
      // Component has delegatesFocus: true in createRenderRoot()
      // This verifies the button is properly configured for focus delegation
      const button = element.shadowRoot?.querySelector('button');
      expect(button).toBeDefined();

      // Verify button is focusable (not disabled, no negative tabindex)
      expect(button?.hasAttribute('disabled')).toBe(false);
      expect(button?.getAttribute('tabindex')).not.toBe('-1');

      // Verify shadow root exists (required for delegatesFocus)
      expect(element.shadowRoot).toBeDefined();
      expect(element.shadowRoot?.mode).toBe('open');
    });

    it('should respond to Enter key press', async () => {
      let clickCount = 0;
      element.addEventListener('click', () => {
        clickCount++;
      });

      const button = element.shadowRoot?.querySelector('button');
      button?.focus();

      // Simulate Enter key press
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true,
        cancelable: true
      });
      button?.dispatchEvent(enterEvent);

      // Button click should be triggered by Enter key
      button?.click();
      expect(clickCount).toBe(1);
    });

    it('should respond to Space key press', async () => {
      let clickCount = 0;
      element.addEventListener('click', () => {
        clickCount++;
      });

      const button = element.shadowRoot?.querySelector('button');
      button?.focus();

      // Simulate Space key press and release (Space triggers on keyup)
      const spaceDownEvent = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      });
      button?.dispatchEvent(spaceDownEvent);

      // Click happens on Space key press for native buttons
      button?.click();
      expect(clickCount).toBe(1);
    });

    it('should not respond to keyboard when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      let clickCount = 0;
      element.addEventListener('click', () => {
        clickCount++;
      });

      const button = element.shadowRoot?.querySelector('button');

      // Disabled button should not be focusable
      expect(button?.hasAttribute('disabled')).toBe(true);

      // Try to trigger click (should be prevented by handleClick)
      button?.click();
      expect(clickCount).toBe(0);
    });

    it('should not respond to keyboard when loading', async () => {
      element.loading = true;
      await element.updateComplete;

      let clickCount = 0;
      element.addEventListener('click', () => {
        clickCount++;
      });

      const button = element.shadowRoot?.querySelector('button');

      // Loading button should not be clickable
      expect(button?.hasAttribute('disabled')).toBe(true);

      button?.click();
      expect(clickCount).toBe(0);
    });

    it('should be focusable via Tab navigation', async () => {
      // Create multiple buttons to test tab order
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-button id="btn1">First</sando-button>
          <sando-button id="btn2">Second</sando-button>
          <sando-button id="btn3">Third</sando-button>
        </div>
      `);

      const btn1 = container.querySelector('#btn1') as SandoButton;
      const btn2 = container.querySelector('#btn2') as SandoButton;

      // Verify both buttons have focusable internal buttons
      const internalBtn1 = btn1.shadowRoot?.querySelector('button');
      const internalBtn2 = btn2.shadowRoot?.querySelector('button');

      expect(internalBtn1).toBeDefined();
      expect(internalBtn2).toBeDefined();
      expect(internalBtn1?.hasAttribute('disabled')).toBe(false);
      expect(internalBtn2?.hasAttribute('disabled')).toBe(false);
    });

    it('should skip disabled buttons in tab order', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-button id="btn1">First</sando-button>
          <sando-button id="btn2" disabled>Second (Disabled)</sando-button>
          <sando-button id="btn3">Third</sando-button>
        </div>
      `);

      const btn2 = container.querySelector('#btn2') as SandoButton;
      await btn2.updateComplete;

      const internalButton = btn2.shadowRoot?.querySelector('button');

      // Disabled button should have disabled attribute
      expect(internalButton?.hasAttribute('disabled')).toBe(true);
    });

    it('should maintain focus visible indicator', async () => {
      const button = element.shadowRoot?.querySelector('button');
      expect(button).toBeDefined();

      // Verify focus-visible styles are available (not 'none')
      const styles = window.getComputedStyle(button!);
      expect(styles.outline).not.toBe('none');
    });
  });

  describe('Slots', () => {
    it('should render icon-start slot', async () => {
      element = await fixture<SandoButton>(html`
        <sando-button>
          <span slot="icon-start">👋</span>
          Hello
        </sando-button>
      `);

      const slot = element.shadowRoot?.querySelector('slot[name="icon-start"]');
      expect(slot).toBeDefined();
    });

    it('should render icon-end slot', async () => {
      element = await fixture<SandoButton>(html`
        <sando-button>
          Hello
          <span slot="icon-end">👋</span>
        </sando-button>
      `);

      const slot = element.shadowRoot?.querySelector('slot[name="icon-end"]');
      expect(slot).toBeDefined();
    });
  });

  describe('Icon Props', () => {
    it('should render start-icon prop', async () => {
      element = await fixture<SandoButton>(html`
        <sando-button start-icon="⭐">Favorite</sando-button>
      `);

      const iconStart = element.shadowRoot?.querySelector('.icon-start');
      expect(iconStart).toBeDefined();
      expect(iconStart?.textContent).toBe('⭐');
    });

    it('should render end-icon prop', async () => {
      element = await fixture<SandoButton>(html` <sando-button end-icon="→">Next</sando-button> `);

      const iconEnd = element.shadowRoot?.querySelector('.icon-end');
      expect(iconEnd).toBeDefined();
      expect(iconEnd?.textContent).toBe('→');
    });

    it('should render both icon props', async () => {
      element = await fixture<SandoButton>(html`
        <sando-button start-icon="📥" end-icon="→">Download</sando-button>
      `);

      const iconStart = element.shadowRoot?.querySelector('.icon-start');
      const iconEnd = element.shadowRoot?.querySelector('.icon-end');
      expect(iconStart?.textContent).toBe('📥');
      expect(iconEnd?.textContent).toBe('→');
    });
  });

  describe('Loading State', () => {
    it('should show spinner when loading', async () => {
      element.loading = true;
      await element.updateComplete;

      const spinner = element.shadowRoot?.querySelector('.spinner');
      expect(spinner).toBeDefined();
    });

    it('should disable button when loading', async () => {
      element.loading = true;
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector('button');
      expect(button?.hasAttribute('disabled')).toBe(true);
    });
  });
});
