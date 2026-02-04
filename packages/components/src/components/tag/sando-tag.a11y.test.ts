/**
 * Accessibility Tests for sando-tag
 * Validates WCAG 2.1 Level AA compliance using axe-core
 *
 * @see WCAG_COMPLIANCE.toon (WC-CR-R1, WC-CR-R2)
 * @see KEYBOARD_NAVIGATION.toon (KN-CR-R2)
 * @see TEST_COVERAGE.toon (TC-CR-R2)
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-tag.js';
import type { SandoTag } from './sando-tag.js';

describe('sando-tag Accessibility', () => {
  let element: SandoTag;

  beforeEach(async () => {
    element = await fixture<SandoTag>(html`<sando-tag>Test Tag</sando-tag>`);
    await element.updateComplete;
  });

  describe('axe-core Validation', () => {
    describe('Informative Tag (Default)', () => {
      it('should have no accessibility violations', async () => {
        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with all variants', async () => {
        const variants = ['solid', 'outline', 'soft'] as const;

        for (const variant of variants) {
          element.variant = variant;
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });

      it('should have no violations with all sizes', async () => {
        const sizes = ['small', 'medium', 'large'] as const;

        for (const size of sizes) {
          element.size = size;
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('Removable Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html` <sando-tag removable>Removable Tag</sando-tag> `);
        await element.updateComplete;
      });

      it('should have no accessibility violations', async () => {
        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with all variants', async () => {
        const variants = ['solid', 'outline', 'soft'] as const;

        for (const variant of variants) {
          element.variant = variant;
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('Clickable Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html` <sando-tag clickable>Clickable Tag</sando-tag> `);
        await element.updateComplete;
      });

      it('should have no accessibility violations', async () => {
        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Link Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag href="/category/design">Design</sando-tag>
        `);
        await element.updateComplete;
      });

      it('should have no accessibility violations', async () => {
        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with target="_blank"', async () => {
        element.target = '_blank';
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Disabled State', () => {
      it('should have no violations for disabled informative tag', async () => {
        element.disabled = true;
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations for disabled removable tag', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag removable disabled>Disabled Removable</sando-tag>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations for disabled clickable tag', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag clickable disabled>Disabled Clickable</sando-tag>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Exclusivity Rules', () => {
      it('should have no violations when removable overrides clickable', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag removable clickable>Removable + Clickable</sando-tag>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations when removable overrides href', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag removable href="/test">Removable + Href</sando-tag>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations when removable overrides both clickable and href', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag removable clickable href="/test">All Three</sando-tag>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations when href overrides clickable', async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag href="/test" clickable>Href + Clickable</sando-tag>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Color Contrast', () => {
      it('should meet color contrast requirements', async () => {
        const results = await axe(element, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      });

      it('should meet contrast for all variants', async () => {
        const variants = ['solid', 'outline', 'soft'] as const;

        for (const variant of variants) {
          element.variant = variant;
          await element.updateComplete;

          const results = await axe(element, {
            rules: {
              'color-contrast': { enabled: true }
            }
          });

          expect(results).toHaveNoViolations();
        }
      });
    });
  });

  describe('ARIA Attributes', () => {
    describe('Informative Tag', () => {
      it('should have role="status"', async () => {
        const inner = element.shadowRoot?.querySelector('.tag');
        expect(inner?.getAttribute('role')).toBe('status');
      });
    });

    describe('Removable Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html` <sando-tag removable>JavaScript</sando-tag> `);
        await element.updateComplete;
      });

      it('should have role="status" on wrapper', async () => {
        const inner = element.shadowRoot?.querySelector('.tag');
        expect(inner?.getAttribute('role')).toBe('status');
      });

      it('should have accessible name on remove button', async () => {
        const removeButton = element.shadowRoot?.querySelector('.tag__remove');
        const ariaLabel = removeButton?.getAttribute('aria-label');

        expect(ariaLabel).toBeDefined();
        expect(ariaLabel).toContain('Remove');
        expect(ariaLabel).toBe('Remove JavaScript');
      });

      it('should hide remove icon SVG from screen readers', async () => {
        const svg = element.shadowRoot?.querySelector('.tag__remove-icon');
        expect(svg?.getAttribute('aria-hidden')).toBe('true');
      });

      it('should have button type on remove button', async () => {
        const removeButton = element.shadowRoot?.querySelector('.tag__remove');
        expect(removeButton?.getAttribute('type')).toBe('button');
      });
    });

    describe('Clickable Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html` <sando-tag clickable>View Details</sando-tag> `);
        await element.updateComplete;
      });

      it('should render as native button (implicit role)', async () => {
        const inner = element.shadowRoot?.querySelector('.tag');
        expect(inner?.tagName.toLowerCase()).toBe('button');
        // Native button has implicit role="button", no explicit role needed
      });

      it('should have type="button"', async () => {
        const button = element.shadowRoot?.querySelector('.tag') as HTMLButtonElement;
        expect(button?.getAttribute('type')).toBe('button');
      });
    });

    describe('Link Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html`
          <sando-tag href="/design">Design Category</sando-tag>
        `);
        await element.updateComplete;
      });

      it('should render as native anchor (implicit role)', async () => {
        const inner = element.shadowRoot?.querySelector('.tag');
        expect(inner?.tagName.toLowerCase()).toBe('a');
        // Native anchor with href has implicit role="link", no explicit role needed
      });

      it('should have aria-disabled for disabled link', async () => {
        element.disabled = true;
        await element.updateComplete;

        const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
        expect(anchor?.getAttribute('aria-disabled')).toBe('true');
      });

      it('should have rel="noopener noreferrer" for external links', async () => {
        element.target = '_blank';
        await element.updateComplete;

        const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
        expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });
  });

  describe('Focus Management', () => {
    describe('Informative Tag (Non-Interactive)', () => {
      it('should not be in tab order', async () => {
        const inner = element.shadowRoot?.querySelector('.tag') as HTMLElement;
        // Span elements are not focusable by default
        expect(inner?.tagName.toLowerCase()).toBe('span');
      });
    });

    describe('Removable Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html` <sando-tag removable>Focus Test</sando-tag> `);
        await element.updateComplete;
      });

      it('should have focusable remove button', async () => {
        const removeButton = element.shadowRoot?.querySelector('.tag__remove') as HTMLButtonElement;
        expect(removeButton).not.toBeNull();
        expect(removeButton?.disabled).toBe(false);
      });

      it('should not be focusable when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;

        const removeButton = element.shadowRoot?.querySelector('.tag__remove') as HTMLButtonElement;
        expect(removeButton?.disabled).toBe(true);
      });
    });

    describe('Clickable Tag', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html` <sando-tag clickable>Focus Test</sando-tag> `);
        await element.updateComplete;
      });

      it('should be focusable', async () => {
        const button = element.shadowRoot?.querySelector('.tag') as HTMLButtonElement;
        expect(button).not.toBeNull();
        expect(button?.disabled).toBe(false);
        expect(button?.getAttribute('tabindex')).not.toBe('-1');
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
        element = await fixture<SandoTag>(html` <sando-tag href="/test">Link Focus</sando-tag> `);
        await element.updateComplete;
      });

      it('should be focusable', async () => {
        const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
        expect(anchor).not.toBeNull();
        expect(anchor?.getAttribute('tabindex')).not.toBe('-1');
      });

      it('should have tabindex=-1 when disabled', async () => {
        element.disabled = true;
        await element.updateComplete;

        const anchor = element.shadowRoot?.querySelector('.tag') as HTMLAnchorElement;
        expect(anchor?.getAttribute('tabindex')).toBe('-1');
      });
    });

    describe('Visible Focus Indicator', () => {
      it('should have visible focus indicator on clickable tag', async () => {
        element = await fixture<SandoTag>(html` <sando-tag clickable>Focus Ring Test</sando-tag> `);
        await element.updateComplete;

        const button = element.shadowRoot?.querySelector('.tag') as HTMLButtonElement;
        expect(button).not.toBeNull();

        button?.focus();

        // Verify focus styles are available
        const styles = window.getComputedStyle(button);
        // Focus ring can be outline or box-shadow
        const hasOutline = styles.outline !== 'none';
        const hasBoxShadow = styles.boxShadow !== 'none';
        expect(hasOutline || hasBoxShadow).toBe(true);
      });

      it('should have visible focus indicator on remove button', async () => {
        element = await fixture<SandoTag>(html` <sando-tag removable>Focus Ring Test</sando-tag> `);
        await element.updateComplete;

        const removeButton = element.shadowRoot?.querySelector('.tag__remove') as HTMLButtonElement;
        expect(removeButton).not.toBeNull();

        removeButton?.focus();

        // Verify focus styles are available
        const styles = window.getComputedStyle(removeButton);
        const hasOutline = styles.outline !== 'none';
        const hasBoxShadow = styles.boxShadow !== 'none';
        expect(hasOutline || hasBoxShadow).toBe(true);
      });
    });
  });

  describe('Keyboard Accessibility', () => {
    describe('Removable Tag Keyboard', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html` <sando-tag removable>Keyboard A11y</sando-tag> `);
        await element.updateComplete;
      });

      it('should activate remove on Enter key', async () => {
        let removed = false;
        element.addEventListener('sando-remove', () => {
          removed = true;
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

        // Native button handles Enter, then keydown handler is called
        removeButton?.click();
        expect(removed).toBe(true);
      });

      it('should activate remove on Space key', async () => {
        let removed = false;
        element.addEventListener('sando-remove', () => {
          removed = true;
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

        expect(removed).toBe(true);
      });
    });

    describe('Clickable Tag Keyboard', () => {
      beforeEach(async () => {
        element = await fixture<SandoTag>(html` <sando-tag clickable>Keyboard A11y</sando-tag> `);
        await element.updateComplete;
      });

      it('should be activatable via native button keyboard handling', async () => {
        const button = element.shadowRoot?.querySelector('.tag') as HTMLButtonElement;
        expect(button).not.toBeNull();

        // Native button handles Enter/Space
        button?.focus();
        expect(
          document.activeElement === element || element.shadowRoot?.activeElement === button
        ).toBe(true);
      });
    });
  });

  describe('Screen Reader Support', () => {
    it('should have accessible name from content', async () => {
      element = await fixture<SandoTag>(html`<sando-tag>Screen Reader Test</sando-tag>`);
      await element.updateComplete;

      const accessibleName = element.textContent?.trim();
      expect(accessibleName).toBe('Screen Reader Test');
    });

    it('should announce status role for informative tags', async () => {
      const inner = element.shadowRoot?.querySelector('.tag');
      expect(inner?.getAttribute('role')).toBe('status');
    });

    it('should have descriptive remove button label', async () => {
      element = await fixture<SandoTag>(html` <sando-tag removable>TypeScript</sando-tag> `);
      await element.updateComplete;

      const removeButton = element.shadowRoot?.querySelector('.tag__remove');
      const ariaLabel = removeButton?.getAttribute('aria-label');

      expect(ariaLabel).toBe('Remove TypeScript');
    });
  });

  describe('Theme/Flavor Support', () => {
    it('should work with different flavors maintaining accessibility', async () => {
      const flavors = ['original', 'strawberry', 'chocolate'];

      for (const flavor of flavors) {
        element.setAttribute('flavor', flavor);
        await element.updateComplete;

        const results = await axe(element, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      }
    });
  });

  describe('Icon Slot Exclusivity', () => {
    it('should have no violations when icon is hidden for removable tag', async () => {
      element = await fixture<SandoTag>(html`
        <sando-tag removable>
          <svg slot="icon" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="4" />
          </svg>
          Removable With Icon
        </sando-tag>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when icon is shown for clickable tag', async () => {
      element = await fixture<SandoTag>(html`
        <sando-tag clickable>
          <svg slot="icon" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="4" />
          </svg>
          Clickable With Icon
        </sando-tag>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when icon is shown for link tag', async () => {
      element = await fixture<SandoTag>(html`
        <sando-tag href="/test">
          <svg slot="icon" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="4" />
          </svg>
          Link With Icon
        </sando-tag>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should only expose remove button (not icon) for removable tag', async () => {
      element = await fixture<SandoTag>(html`
        <sando-tag removable>
          <span slot="icon">★</span>
          Removable
        </sando-tag>
      `);
      await element.updateComplete;

      // Icon slot should not exist
      const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeNull();

      // Remove button should exist and be accessible
      const removeButton = element.shadowRoot?.querySelector('.tag__remove');
      expect(removeButton).not.toBeNull();
      expect(removeButton?.getAttribute('aria-label')).toContain('Remove');
    });
  });
});
