/**
 * Accessibility Tests for sando-card
 *
 * Validates WCAG 2.1 Level AA compliance for all card states and variants
 * using axe-core via jest-axe. Tests the Pseudo-Interactive Surface Pattern
 * (CA-LP-PIS) for interactive card accessibility.
 */

import { fixture, html, expect as expectWc } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-card.js';
import type { SandoCard } from './sando-card.js';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getSurfaceAction(el: SandoCard): HTMLElement | null {
  return el.shadowRoot!.querySelector('.card__surface-action');
}

function getCard(el: SandoCard): HTMLElement {
  return el.shadowRoot!.querySelector('.card') as HTMLElement;
}

// ─────────────────────────────────────────────────────────────────────────────
// Suite
// ─────────────────────────────────────────────────────────────────────────────

describe('sando-card accessibility', () => {
  // ──────────────────────────────────────────────────────────────────────────
  // 1. axe-core — static card (no interaction)
  // ──────────────────────────────────────────────────────────────────────────
  describe('axe-core: static card', () => {
    it('has no violations in default state', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Card title">Body content</sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with just body content (no heading)', async () => {
      const el = await fixture<SandoCard>(html` <sando-card>Card body content</sando-card> `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should be accessible via @open-wc expectWc().to.be.accessible()', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Accessible card">Content</sando-card>
      `);
      await expectWc(el).to.be.accessible();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 2. axe-core — all variants
  // ──────────────────────────────────────────────────────────────────────────
  describe('axe-core: all variants', () => {
    for (const variant of ['elevated', 'outlined', 'filled'] as const) {
      it(`has no violations for variant="${variant}"`, async () => {
        const el = await fixture<SandoCard>(html`
          <sando-card variant="${variant}" heading="Card">Body</sando-card>
        `);
        await el.updateComplete;
        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 3. axe-core — all flavors (theming)
  // ──────────────────────────────────────────────────────────────────────────
  describe('axe-core: flavors', () => {
    const flavors = ['sando', 'original', 'strawberry', 'nori', 'egg-salad', 'kiwi', 'tonkatsu'];

    for (const flavor of flavors) {
      it(`has no violations with flavor="${flavor}"`, async () => {
        const el = await fixture<SandoCard>(html`
          <div flavor="${flavor}">
            <sando-card heading="Flavored card">Body content</sando-card>
          </div>
        `);
        await el.updateComplete;
        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 4. axe-core — clickable card
  // ──────────────────────────────────────────────────────────────────────────
  describe('axe-core: clickable card', () => {
    it('has no violations for clickable card with heading (labelledby)', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Click me" clickable> This whole card is interactive </sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('has no violations for clickable card with explicit aria-label', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card clickable aria-label="Open card details"> Card body content </sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should be accessible (expectWc) when clickable', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Click me" clickable>Body</sando-card>
      `);
      await expectWc(el).to.be.accessible();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 5. axe-core — link card (href)
  // ──────────────────────────────────────────────────────────────────────────
  describe('axe-core: link card (href)', () => {
    it('has no violations for href card with heading', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Visit us" href="https://example.com"> Click to navigate </sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('has no violations for href card with explicit aria-label', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card href="https://example.com" aria-label="Visit example site">
          Content
        </sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('has no violations for href card with target="_blank"', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="External link" href="https://example.com" target="_blank">
          Opens in new tab
        </sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should be accessible (expectWc) when href is set', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Link card" href="https://example.com">Body</sando-card>
      `);
      await expectWc(el).to.be.accessible();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 6. axe-core — disabled card
  // ──────────────────────────────────────────────────────────────────────────
  describe('axe-core: disabled card', () => {
    it('has no violations when disabled (uses aria-disabled, not native)', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Disabled card" clickable disabled>Body</sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('has no violations for disabled href card', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Disabled link" href="https://example.com" disabled>Body</sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should be accessible (expectWc) when disabled', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Disabled" clickable disabled>Body</sando-card>
      `);
      await expectWc(el).to.be.accessible();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 7. axe-core — loading card
  // ──────────────────────────────────────────────────────────────────────────
  describe('axe-core: loading card', () => {
    it('has no violations when loading', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Loading card" loading>Body</sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should be accessible (expectWc) when loading', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Loading" loading>Body</sando-card>
      `);
      await expectWc(el).to.be.accessible();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 8. axe-core — heading levels h2–h6
  // ──────────────────────────────────────────────────────────────────────────
  describe('axe-core: heading levels', () => {
    for (const level of [2, 3, 4, 5, 6] as const) {
      it(`has no violations with heading-level="${level}"`, async () => {
        const el = await fixture<SandoCard>(html`
          <sando-card heading="Card Title" heading-level="${level}">Body</sando-card>
        `);
        await el.updateComplete;
        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 9. ARIA attributes — aria-busy
  // ──────────────────────────────────────────────────────────────────────────
  describe('ARIA: aria-busy', () => {
    it('sets aria-busy="true" on .card when loading', async () => {
      const el = await fixture<SandoCard>(html` <sando-card loading>Body</sando-card> `);
      await el.updateComplete;
      expect(getCard(el)?.getAttribute('aria-busy')).toBe('true');
    });

    it('sets aria-busy="false" on .card when not loading', async () => {
      const el = await fixture<SandoCard>(html` <sando-card>Body</sando-card> `);
      await el.updateComplete;
      expect(getCard(el)?.getAttribute('aria-busy')).toBe('false');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 10. ARIA: aria-labelledby references heading id
  // ──────────────────────────────────────────────────────────────────────────
  describe('ARIA: aria-labelledby', () => {
    it('surface-action aria-labelledby references the heading id', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="My Card" clickable>Body</sando-card>
      `);
      await el.updateComplete;

      const heading = el.shadowRoot!.querySelector('.card__heading');
      const sa = getSurfaceAction(el);

      expect(heading?.id).toBeTruthy();
      expect(sa?.getAttribute('aria-labelledby')).toBe(heading?.id);
    });

    it('anchor surface-action aria-labelledby references heading id', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Visit us" href="https://example.com">Body</sando-card>
      `);
      await el.updateComplete;

      const heading = el.shadowRoot!.querySelector('.card__heading');
      const sa = getSurfaceAction(el);

      expect(sa?.getAttribute('aria-labelledby')).toBe(heading?.id);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 11. ARIA: aria-label prop overrides aria-labelledby
  // ──────────────────────────────────────────────────────────────────────────
  describe('ARIA: aria-label prop', () => {
    it('surface-action uses aria-label instead of aria-labelledby when ariaLabel is set', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="My Card" clickable aria-label="Custom accessible name"
          >Body</sando-card
        >
      `);
      await el.updateComplete;

      const sa = getSurfaceAction(el);
      expect(sa?.getAttribute('aria-label')).toBe('Custom accessible name');
      expect(sa?.getAttribute('aria-labelledby')).toBeNull();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 12. ARIA: aria-disabled on surface-action
  // ──────────────────────────────────────────────────────────────────────────
  describe('ARIA: aria-disabled', () => {
    it('surface-action has aria-disabled="true" when disabled', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="My Card" clickable disabled>Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('aria-disabled')).toBe('true');
    });

    it('surface-action has aria-disabled="false" when enabled', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="My Card" clickable>Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('aria-disabled')).toBe('false');
    });

    it('disabled card is still in the DOM (not hidden) — uses aria-disabled pattern', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="My Card" clickable disabled>Body</sando-card>
      `);
      await el.updateComplete;

      // The element should exist in the DOM (discoverable by screen readers)
      const sa = getSurfaceAction(el);
      expect(sa).not.toBeNull();
      // But removed from tab order
      expect(sa?.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 13. Focus management — surface-action keyboard reachability
  // ──────────────────────────────────────────────────────────────────────────
  describe('Focus management', () => {
    it('surface-action is reachable via keyboard (tabindex=0) when clickable and enabled', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Click me" clickable>Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('tabindex')).toBe('0');
    });

    it('surface-action is removed from tab order (tabindex=-1) when disabled', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Click me" clickable disabled>Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('tabindex')).toBe('-1');
    });

    it('no surface-action rendered during loading (nothing to focus)', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Click me" clickable loading>Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)).toBeNull();
    });

    it('static card has no surface-action (nothing interactive to focus)', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Static card">Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)).toBeNull();
    });

    it('href anchor surface-action is focusable when not disabled', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Link" href="https://example.com">Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('tabindex')).toBe('0');
    });

    it('href anchor surface-action is removed from tab order when disabled', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Link" href="https://example.com" disabled>Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 14. Semantic HTML — surface-action element types
  // ──────────────────────────────────────────────────────────────────────────
  describe('Semantic HTML', () => {
    it('surface-action is <button> for clickable card', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Click me" clickable>Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)?.tagName.toLowerCase()).toBe('button');
    });

    it('surface-action <button> has type="button" to prevent accidental form submission', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Click me" clickable>Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('type')).toBe('button');
    });

    it('surface-action is <a> for href card', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Link" href="https://example.com">Body</sando-card>
      `);
      await el.updateComplete;
      expect(getSurfaceAction(el)?.tagName.toLowerCase()).toBe('a');
    });

    it('host element is always a <div> (never button or anchor)', async () => {
      // The host is sando-card (a custom element), internally uses a .card div
      const el = await fixture<SandoCard>(html` <sando-card clickable>Body</sando-card> `);
      await el.updateComplete;
      const cardEl = el.shadowRoot!.querySelector('.card');
      expect(cardEl?.tagName.toLowerCase()).toBe('div');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 15. axe-core — with slotted content
  // ──────────────────────────────────────────────────────────────────────────
  describe('axe-core: slotted content', () => {
    it('has no violations with media slot', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Media Card">
          <img slot="media" src="https://example.com/img.jpg" alt="Descriptive alt text" />
          Body content
        </sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with footer slot', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Card with footer">
          Body
          <button slot="footer" type="button">Take action</button>
        </sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with header slot override', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card>
          <h3 slot="header">Custom Header</h3>
          Body content
        </sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 16. axe-core — orientations and padding
  // ──────────────────────────────────────────────────────────────────────────
  describe('axe-core: layout props', () => {
    it('has no violations with orientation="horizontal"', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Horizontal" orientation="horizontal">Body</sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with padding="none"', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="No padding" padding="none">Body</sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('has no violations with radius="full"', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Full radius" radius="full">Body</sando-card>
      `);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });
});
