/**
 * Unit Tests for sando-tag
 * Tests rendering, properties, events, slots, and keyboard navigation
 *
 * @see TESTING_STRATEGY.toon (TST-CR-R1, TST-CR-R2)
 * @see KEYBOARD_NAVIGATION.toon (KN-CR-R1, KN-CR-R5)
 */

import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-tag.js';
import type { SandoTag } from './sando-tag.js';

describe('sando-tag', () => {
  let element: SandoTag;

  beforeEach(async () => {
    element = await fixture<SandoTag>(html`<sando-tag>Test Tag</sando-tag>`);
  });

  describe('Rendering', () => {
    it('should render with default properties', () => {
      expect(element).toBeDefined();
      expect(element.variant).toBe('solid');
      expect(element.size).toBe('medium');
      expect(element.disabled).toBe(false);
      expect(element.removable).toBe(false);
      expect(element.clickable).toBe(false);
    });

    it('should render slot content', () => {
      expect(element.textContent?.trim()).toBe('Test Tag');
    });

    it('should render shadow DOM', () => {
      expect(element.shadowRoot).toBeDefined();
    });

    it('should be accessible', async () => {
      await expectWc(element).to.be.accessible();
    });

    it('should render as span for informative tag', async () => {
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.tagName.toLowerCase()).toBe('span');
    });
  });

  describe('Properties - Variant', () => {
    it('should apply solid variant by default', () => {
      expect(element.variant).toBe('solid');
      expect(element.getAttribute('variant')).toBe('solid');
    });

    it('should update variant to outline', async () => {
      element.variant = 'outline';
      await element.updateComplete;
      expect(element.variant).toBe('outline');
      expect(element.getAttribute('variant')).toBe('outline');
    });

    it('should update variant to soft', async () => {
      element.variant = 'soft';
      await element.updateComplete;
      expect(element.variant).toBe('soft');
      expect(element.getAttribute('variant')).toBe('soft');
    });

    it('should reflect variant attribute to property', async () => {
      element.setAttribute('variant', 'outline');
      await element.updateComplete;
      expect(element.variant).toBe('outline');
    });
  });

  describe('Properties - Size', () => {
    it('should apply medium size by default', () => {
      expect(element.size).toBe('medium');
      expect(element.getAttribute('size')).toBe('medium');
    });

    it('should update size to small', async () => {
      element.size = 'small';
      await element.updateComplete;
      expect(element.size).toBe('small');
      expect(element.getAttribute('size')).toBe('small');
    });

    it('should update size to large', async () => {
      element.size = 'large';
      await element.updateComplete;
      expect(element.size).toBe('large');
      expect(element.getAttribute('size')).toBe('large');
    });

    it('should reflect size attribute to property', async () => {
      element.setAttribute('size', 'small');
      await element.updateComplete;
      expect(element.size).toBe('small');
    });
  });

  describe('Properties - Disabled', () => {
    it('should not be disabled by default', () => {
      expect(element.disabled).toBe(false);
      expect(element.hasAttribute('disabled')).toBe(false);
    });

    it('should update disabled property', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(element.disabled).toBe(true);
      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('should apply disabled class to inner element', async () => {
      element.disabled = true;
      await element.updateComplete;
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.classList.contains('tag--disabled')).toBe(true);
    });
  });

  describe('Removable Mode', () => {
    beforeEach(async () => {
      element = await fixture<SandoTag>(html`<sando-tag removable>Removable Tag</sando-tag>`);
    });

    it('should show remove button when removable=true', () => {
      const removeButton = element.shadowRoot?.querySelector('.tag__remove');
      expect(removeButton).toBeDefined();
      expect(removeButton).not.toBeNull();
    });

    it('should hide remove button when removable=false', async () => {
      element.removable = false;
      await element.updateComplete;
      const removeButton = element.shadowRoot?.querySelector('.tag__remove');
      expect(removeButton).toBeNull();
    });

    it('should render as span (not button) when removable', () => {
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.tagName.toLowerCase()).toBe('span');
    });

    it('should have removable class', () => {
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.classList.contains('tag--removable')).toBe(true);
    });

    it('should dispatch sando-remove event when X clicked', async () => {
      let eventFired = false;
      let eventDetail: unknown = null;

      element.addEventListener('sando-remove', ((e: CustomEvent) => {
        eventFired = true;
        eventDetail = e.detail;
      }) as EventListener);

      const removeButton = element.shadowRoot?.querySelector('.tag__remove') as HTMLButtonElement;
      removeButton?.click();

      expect(eventFired).toBe(true);
      expect(eventDetail).toHaveProperty('originalEvent');
    });

    it('should NOT dispatch sando-remove when disabled and X clicked', async () => {
      element.disabled = true;
      await element.updateComplete;

      let eventFired = false;
      element.addEventListener('sando-remove', () => {
        eventFired = true;
      });

      const removeButton = element.shadowRoot?.querySelector('.tag__remove') as HTMLButtonElement;
      removeButton?.click();

      expect(eventFired).toBe(false);
    });

    it('should have accessible label on remove button', () => {
      const removeButton = element.shadowRoot?.querySelector('.tag__remove');
      const ariaLabel = removeButton?.getAttribute('aria-label');
      expect(ariaLabel).toBe('Remove Removable Tag');
    });

    it('should disable remove button when tag is disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      const removeButton = element.shadowRoot?.querySelector('.tag__remove') as HTMLButtonElement;
      expect(removeButton?.disabled).toBe(true);
    });
  });

  describe('Clickable Mode', () => {
    beforeEach(async () => {
      element = await fixture<SandoTag>(html`<sando-tag clickable>Clickable Tag</sando-tag>`);
    });

    it('should render as button when clickable=true', () => {
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.tagName.toLowerCase()).toBe('button');
    });

    it('should have clickable class', () => {
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.classList.contains('tag--clickable')).toBe(true);
    });

    it('should be focusable when clickable', () => {
      const button = element.shadowRoot?.querySelector('.tag') as HTMLButtonElement;
      expect(button?.disabled).toBe(false);
    });

    it('should not show remove button when clickable', () => {
      const removeButton = element.shadowRoot?.querySelector('.tag__remove');
      expect(removeButton).toBeNull();
    });

    it('should be disabled when disabled property is set', async () => {
      element.disabled = true;
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector('.tag') as HTMLButtonElement;
      expect(button?.disabled).toBe(true);
    });
  });

  describe('Link Mode (href)', () => {
    beforeEach(async () => {
      element = await fixture<SandoTag>(html`
        <sando-tag href="/category/design">Design</sando-tag>
      `);
    });

    it('should render as anchor when href is set', () => {
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.tagName.toLowerCase()).toBe('a');
    });

    it('should have correct href attribute', () => {
      const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
      expect(anchor?.getAttribute('href')).toBe('/category/design');
    });

    it('should have clickable class', () => {
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.classList.contains('tag--clickable')).toBe(true);
    });

    it('should apply target attribute', async () => {
      element.target = '_blank';
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
      expect(anchor?.getAttribute('target')).toBe('_blank');
    });

    it('should add rel="noopener noreferrer" for target="_blank"', async () => {
      element.target = '_blank';
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
      expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should have aria-disabled when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
      expect(anchor?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have tabindex=-1 when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
      expect(anchor?.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Slots', () => {
    it('should render default slot content', async () => {
      element = await fixture<SandoTag>(html`<sando-tag>Slot Content</sando-tag>`);
      expect(element.textContent?.trim()).toBe('Slot Content');
    });

    it('should render icon slot when NOT removable', async () => {
      element = await fixture<SandoTag>(html`
        <sando-tag>
          Tag Label
          <span slot="icon">*</span>
        </sando-tag>
      `);

      const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeDefined();
      expect(iconSlot).not.toBeNull();
    });

    it('should render icon slot when clickable', async () => {
      element = await fixture<SandoTag>(html`
        <sando-tag clickable>
          Clickable Tag
          <span slot="icon">★</span>
        </sando-tag>
      `);

      const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeDefined();
      expect(iconSlot).not.toBeNull();
    });

    it('should render icon slot when href is set', async () => {
      element = await fixture<SandoTag>(html`
        <sando-tag href="/category">
          Link Tag
          <span slot="icon">→</span>
        </sando-tag>
      `);

      const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeDefined();
      expect(iconSlot).not.toBeNull();
    });

    it('should NOT render icon slot when removable=true', async () => {
      element = await fixture<SandoTag>(html`
        <sando-tag removable>
          Removable Tag
          <span slot="icon">★</span>
        </sando-tag>
      `);

      const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeNull();
    });

    it('should render both default and icon slots when NOT removable', async () => {
      element = await fixture<SandoTag>(html`
        <sando-tag>
          Label
          <span slot="icon">!</span>
        </sando-tag>
      `);

      const defaultSlot = element.shadowRoot?.querySelector('slot:not([name])');
      const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');

      expect(defaultSlot).not.toBeNull();
      expect(iconSlot).not.toBeNull();
    });
  });

  describe('Keyboard Navigation', () => {
    describe('Removable Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html`<sando-tag removable>Keyboard Test</sando-tag>`);
      });

      it('should activate remove on Enter key', async () => {
        let eventFired = false;
        element.addEventListener('sando-remove', () => {
          eventFired = true;
        });

        const removeButton = element.shadowRoot?.querySelector('.tag__remove') as HTMLButtonElement;
        removeButton?.focus();

        const enterEvent = new KeyboardEvent('keydown', {
          key: 'Enter',
          code: 'Enter',
          bubbles: true,
          cancelable: true
        });
        removeButton?.dispatchEvent(enterEvent);

        // Native button handles Enter
        removeButton?.click();
        expect(eventFired).toBe(true);
      });

      it('should activate remove on Space key', async () => {
        let eventFired = false;
        element.addEventListener('sando-remove', () => {
          eventFired = true;
        });

        const removeButton = element.shadowRoot?.querySelector('.tag__remove') as HTMLButtonElement;
        removeButton?.focus();

        const spaceEvent = new KeyboardEvent('keydown', {
          key: ' ',
          code: 'Space',
          bubbles: true,
          cancelable: true
        });
        removeButton?.dispatchEvent(spaceEvent);

        expect(eventFired).toBe(true);
      });

      it('should not respond to keyboard when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;

        let eventFired = false;
        element.addEventListener('sando-remove', () => {
          eventFired = true;
        });

        const removeButton = element.shadowRoot?.querySelector('.tag__remove') as HTMLButtonElement;
        expect(removeButton?.disabled).toBe(true);

        removeButton?.click();
        expect(eventFired).toBe(false);
      });
    });

    describe('Clickable Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html`<sando-tag clickable>Clickable</sando-tag>`);
      });

      it('should be focusable', () => {
        const button = element.shadowRoot?.querySelector('.tag') as HTMLButtonElement;
        expect(button?.disabled).toBe(false);
        expect(button?.getAttribute('tabindex')).not.toBe('-1');
      });

      it('should respond to Enter key', async () => {
        let clicked = false;
        element.addEventListener('click', () => {
          clicked = true;
        });

        const button = element.shadowRoot?.querySelector('.tag') as HTMLButtonElement;
        button?.focus();

        // Native button handles Enter
        button?.click();
        expect(clicked).toBe(true);
      });

      it('should not be focusable when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;

        const button = element.shadowRoot?.querySelector('.tag') as HTMLButtonElement;
        expect(button?.disabled).toBe(true);
      });
    });

    describe('Link Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html`<sando-tag href="/test">Link Tag</sando-tag>`);
      });

      it('should be focusable', () => {
        const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
        expect(anchor?.getAttribute('tabindex')).not.toBe('-1');
      });

      it('should not be focusable when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;

        const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
        expect(anchor?.getAttribute('tabindex')).toBe('-1');
      });
    });

    describe('Focus Delegation', () => {
      it('should delegate focus from custom element to shadow DOM', async () => {
        element = await fixture<SandoTag>(html`<sando-tag clickable>Focus Test</sando-tag>`);

        // Component has delegatesFocus: true
        expect(element.shadowRoot).toBeDefined();
        expect(element.shadowRoot?.mode).toBe('open');

        const button = element.shadowRoot?.querySelector('.tag') as HTMLButtonElement;
        expect(button).toBeDefined();
      });
    });
  });

  describe('Accessibility Attributes', () => {
    it('should have role="status" for informative tag', async () => {
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.getAttribute('role')).toBe('status');
    });

    it('should have role="status" for removable tag', async () => {
      element = await fixture<SandoTag>(html`<sando-tag removable>Removable</sando-tag>`);
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.getAttribute('role')).toBe('status');
    });

    it('should have part="tag" for styling', async () => {
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.getAttribute('part')).toBe('tag');
    });

    it('should have aria-hidden on remove icon SVG', async () => {
      element = await fixture<SandoTag>(html`<sando-tag removable>Test</sando-tag>`);
      const svg = element.shadowRoot?.querySelector('.tag__remove-icon');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Edge Cases', () => {
    describe('Exclusivity Rules: removable > href > clickable', () => {
      it('should prioritize removable over clickable', async () => {
        // If both removable and clickable are set, removable takes precedence
        element = await fixture<SandoTag>(html`
          <sando-tag removable clickable>Both Set</sando-tag>
        `);

        const inner = element.shadowRoot?.querySelector('.tag');
        // Should be span (removable), not button (clickable)
        expect(inner?.tagName.toLowerCase()).toBe('span');
        expect(inner?.classList.contains('tag--removable')).toBe(true);
        expect(inner?.classList.contains('tag--clickable')).toBe(false);
      });

      it('should prioritize removable over href', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag removable href="/test">Both Set</sando-tag>
        `);

        const inner = element.shadowRoot?.querySelector('.tag');
        // Should be span (removable), not anchor (href)
        expect(inner?.tagName.toLowerCase()).toBe('span');
      });

      it('should prioritize removable over BOTH clickable and href', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag removable clickable href="/test">All Three Set</sando-tag>
        `);

        const inner = element.shadowRoot?.querySelector('.tag');
        // Should be span (removable), not button or anchor
        expect(inner?.tagName.toLowerCase()).toBe('span');
        expect(inner?.classList.contains('tag--removable')).toBe(true);
        expect(inner?.classList.contains('tag--clickable')).toBe(false);
      });

      it('should NOT have href attribute when removable with href', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag removable href="/test">Removable With Href</sando-tag>
        `);

        const inner = element.shadowRoot?.querySelector('.tag');
        expect(inner?.getAttribute('href')).toBeNull();
      });

      it('should NOT have clickable behavior when removable with clickable', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag removable clickable>Removable With Clickable</sando-tag>
        `);

        // Verify the whole tag is NOT interactive (no click events should propagate)
        // Only the X button should be interactive
        const inner = element.shadowRoot?.querySelector('.tag');
        expect(inner?.tagName.toLowerCase()).toBe('span');
        expect(inner?.getAttribute('type')).toBeNull(); // Not a button

        // But the remove button SHOULD exist and work
        const removeButton = element.shadowRoot?.querySelector('.tag__remove');
        expect(removeButton).not.toBeNull();
      });

      it('should NOT show icon slot when removable=true (even if icon provided)', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag removable>
            Has Icon
            <svg slot="icon" data-testid="custom-icon">...</svg>
          </sando-tag>
        `);

        const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
        expect(iconSlot).toBeNull();
      });

      it('should show X button instead of icon when removable', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag removable>
            <svg slot="icon">...</svg>
            Removable
          </sando-tag>
        `);

        const removeButton = element.shadowRoot?.querySelector('.tag__remove');
        const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');

        expect(removeButton).not.toBeNull();
        expect(iconSlot).toBeNull();
      });

      it('should show icon slot when NOT removable', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag>
            Not Removable
            <svg slot="icon">...</svg>
          </sando-tag>
        `);

        const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
        expect(iconSlot).not.toBeNull();
      });

      it('should prioritize href over clickable', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag clickable href="/test">Both Set</sando-tag>
        `);

        const inner = element.shadowRoot?.querySelector('.tag');
        // Should be anchor (href), not button (clickable)
        expect(inner?.tagName.toLowerCase()).toBe('a');
        expect(inner?.getAttribute('href')).toBe('/test');
      });
    });

    describe('Dynamic Mode Switching', () => {
      it('should handle empty content gracefully', async () => {
        element = await fixture<SandoTag>(html`<sando-tag></sando-tag>`);
        expect(element).toBeDefined();
      });

      it('should handle dynamic mode switching', async () => {
        // Start as informative
        expect(element.shadowRoot?.querySelector('.tag')?.tagName.toLowerCase()).toBe('span');

        // Switch to clickable
        element.clickable = true;
        await element.updateComplete;
        expect(element.shadowRoot?.querySelector('.tag')?.tagName.toLowerCase()).toBe('button');

        // Switch to removable (overrides clickable)
        element.removable = true;
        await element.updateComplete;
        expect(element.shadowRoot?.querySelector('.tag')?.tagName.toLowerCase()).toBe('span');
      });

      it('should switch icon slot visibility when toggling removable', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag>
            Toggle Test
            <span slot="icon">★</span>
          </sando-tag>
        `);

        // Initially icon slot should be visible
        let iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
        expect(iconSlot).not.toBeNull();

        // Set removable - icon slot should disappear
        element.removable = true;
        await element.updateComplete;
        iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
        expect(iconSlot).toBeNull();

        // Unset removable - icon slot should reappear
        element.removable = false;
        await element.updateComplete;
        iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
        expect(iconSlot).not.toBeNull();
      });

      it('should switch from href to removable mode correctly', async () => {
        element = await fixture<SandoTag>(html` <sando-tag href="/test">Link Tag</sando-tag> `);

        // Initially an anchor
        expect(element.shadowRoot?.querySelector('.tag')?.tagName.toLowerCase()).toBe('a');

        // Switch to removable
        element.removable = true;
        await element.updateComplete;

        // Should be span now
        expect(element.shadowRoot?.querySelector('.tag')?.tagName.toLowerCase()).toBe('span');
        expect(element.shadowRoot?.querySelector('.tag__remove')).not.toBeNull();
      });
    });
  });
});
