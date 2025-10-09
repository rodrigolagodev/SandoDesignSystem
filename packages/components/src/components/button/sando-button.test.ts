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
      expect(button?.getAttribute('aria-pressed')).toBe('');
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
      element = await fixture<SandoButton>(html`
        <sando-button end-icon="→">Next</sando-button>
      `);

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
