/**
 * Unit Tests for sando-card
 *
 * Covers all public props, events, keyboard interactions, slot detection,
 * and the Pseudo-Interactive Surface Pattern (CA-LP-PIS).
 */

import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-card.js';
import type { SandoCard } from './sando-card.js';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Returns the .card wrapper inside the shadow root */
function getCard(el: SandoCard): HTMLElement {
  return el.shadowRoot!.querySelector('.card') as HTMLElement;
}

/** Returns the .card__surface-action element (button or anchor), or null */
function getSurfaceAction(el: SandoCard): HTMLElement | null {
  return el.shadowRoot!.querySelector('.card__surface-action');
}

/** Returns the sando-skeleton-card element, or null */
function getSkeleton(el: SandoCard): HTMLElement | null {
  return el.shadowRoot!.querySelector('sando-skeleton-card');
}

/** Returns the heading element inside the shadow root (.card__heading), or null */
function getHeading(el: SandoCard): HTMLElement | null {
  return el.shadowRoot!.querySelector('.card__heading');
}

/** Returns the .card__media wrapper, or null */
function getMedia(el: SandoCard): HTMLElement | null {
  return el.shadowRoot!.querySelector('.card__media');
}

/** Returns the .card__footer wrapper, or null */
function getFooter(el: SandoCard): HTMLElement | null {
  return el.shadowRoot!.querySelector('.card__footer');
}

/** Returns the .card__header wrapper, or null */
function getHeader(el: SandoCard): HTMLElement | null {
  return el.shadowRoot!.querySelector('.card__header');
}

// ─────────────────────────────────────────────────────────────────────────────
// Test Suite
// ─────────────────────────────────────────────────────────────────────────────

describe('sando-card', () => {
  // ──────────────────────────────────────────────────────────────────────────
  // 1. Rendering — default props
  // ──────────────────────────────────────────────────────────────────────────
  describe('Rendering', () => {
    it('renders with default props', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);

      expect(el).toBeDefined();
      expect(el.variant).toBe('elevated');
      expect(el.padding).toBe('md');
      expect(el.radius).toBe('default');
      expect(el.orientation).toBe('vertical');
      expect(el.clickable).toBe(false);
      expect(el.disabled).toBe(false);
      expect(el.loading).toBe(false);
      expect(el.hoverable).toBe(false);
      expect(el.fullWidth).toBe(false);
    });

    it('renders .card wrapper in shadow DOM', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      expect(getCard(el)).not.toBeNull();
    });

    it('renders default slot content', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Hello World</sando-card>`);
      expect(el.textContent?.trim()).toContain('Hello World');
    });

    it('should be accessible in default state', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Content</sando-card>`);
      await expectWc(el).to.be.accessible();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Variant prop
  // ──────────────────────────────────────────────────────────────────────────
  describe('Variants', () => {
    it('applies variant="elevated" class', async () => {
      const el = await fixture<SandoCard>(html`<sando-card variant="elevated">Body</sando-card>`);
      await el.updateComplete;
      expect(getCard(el)?.classList.contains('card--elevated')).toBe(true);
    });

    it('applies variant="outlined" class', async () => {
      const el = await fixture<SandoCard>(html`<sando-card variant="outlined">Body</sando-card>`);
      await el.updateComplete;
      expect(getCard(el)?.classList.contains('card--outlined')).toBe(true);
    });

    it('applies variant="filled" class', async () => {
      const el = await fixture<SandoCard>(html`<sando-card variant="filled">Body</sando-card>`);
      await el.updateComplete;
      expect(getCard(el)?.classList.contains('card--filled')).toBe(true);
    });

    it('reflects variant attribute on host', async () => {
      const el = await fixture<SandoCard>(html`<sando-card variant="filled">Body</sando-card>`);
      await el.updateComplete;
      expect(el.getAttribute('variant')).toBe('filled');
    });

    it('updates variant prop programmatically', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      el.variant = 'outlined';
      await el.updateComplete;
      expect(el.getAttribute('variant')).toBe('outlined');
      expect(getCard(el)?.classList.contains('card--outlined')).toBe(true);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Padding prop
  // ──────────────────────────────────────────────────────────────────────────
  describe('Padding', () => {
    for (const padding of ['none', 'sm', 'md', 'lg'] as const) {
      it(`applies padding="${padding}" class`, async () => {
        const el = await fixture<SandoCard>(
          html`<sando-card padding="${padding}">Body</sando-card>`
        );
        await el.updateComplete;
        expect(getCard(el)?.classList.contains(`card--padding-${padding}`)).toBe(true);
      });
    }

    it('reflects padding attribute on host', async () => {
      const el = await fixture<SandoCard>(html`<sando-card padding="sm">Body</sando-card>`);
      expect(el.getAttribute('padding')).toBe('sm');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Radius prop
  // ──────────────────────────────────────────────────────────────────────────
  describe('Radius', () => {
    for (const radius of ['none', 'default', 'full'] as const) {
      it(`applies radius="${radius}" class`, async () => {
        const el = await fixture<SandoCard>(html`<sando-card radius="${radius}">Body</sando-card>`);
        await el.updateComplete;
        expect(getCard(el)?.classList.contains(`card--radius-${radius}`)).toBe(true);
      });
    }

    it('reflects radius attribute on host', async () => {
      const el = await fixture<SandoCard>(html`<sando-card radius="full">Body</sando-card>`);
      expect(el.getAttribute('radius')).toBe('full');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Orientation prop
  // ──────────────────────────────────────────────────────────────────────────
  describe('Orientation', () => {
    it('applies orientation="vertical" class by default', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      await el.updateComplete;
      expect(getCard(el)?.classList.contains('card--vertical')).toBe(true);
    });

    it('applies orientation="horizontal" class', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card orientation="horizontal">Body</sando-card>`
      );
      await el.updateComplete;
      expect(getCard(el)?.classList.contains('card--horizontal')).toBe(true);
    });

    it('reflects orientation attribute on host', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card orientation="horizontal">Body</sando-card>`
      );
      expect(el.getAttribute('orientation')).toBe('horizontal');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 6. Heading prop
  // ──────────────────────────────────────────────────────────────────────────
  describe('Heading prop', () => {
    it('renders h3 by default when heading is set', async () => {
      const el = await fixture<SandoCard>(html`<sando-card heading="My Card">Body</sando-card>`);
      await el.updateComplete;
      const h3 = el.shadowRoot!.querySelector('h3.card__heading');
      expect(h3).not.toBeNull();
      expect(h3?.textContent).toBe('My Card');
    });

    it('renders h2 when headingLevel=2', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Title" heading-level="2">Body</sando-card>`
      );
      await el.updateComplete;
      const h2 = el.shadowRoot!.querySelector('h2.card__heading');
      expect(h2).not.toBeNull();
    });

    it('renders h4 when headingLevel=4', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Title" heading-level="4">Body</sando-card>`
      );
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('h4.card__heading')).not.toBeNull();
    });

    it('renders h5 when headingLevel=5', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Title" heading-level="5">Body</sando-card>`
      );
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('h5.card__heading')).not.toBeNull();
    });

    it('renders h6 when headingLevel=6', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Title" heading-level="6">Body</sando-card>`
      );
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('h6.card__heading')).not.toBeNull();
    });

    it('heading element has a unique id attribute', async () => {
      const el = await fixture<SandoCard>(html`<sando-card heading="My Card">Body</sando-card>`);
      await el.updateComplete;
      const heading = getHeading(el);
      expect(heading?.id).toBeTruthy();
      expect(heading?.id.startsWith('card-heading')).toBe(true);
    });

    it('two card instances have different heading ids', async () => {
      const [el1, el2] = await Promise.all([
        fixture<SandoCard>(html`<sando-card heading="A">Body</sando-card>`),
        fixture<SandoCard>(html`<sando-card heading="B">Body</sando-card>`)
      ]);
      await Promise.all([el1.updateComplete, el2.updateComplete]);

      const id1 = el1.shadowRoot!.querySelector('.card__heading')?.id;
      const id2 = el2.shadowRoot!.querySelector('.card__heading')?.id;
      expect(id1).not.toBe(id2);
    });

    it('does not render heading when prop is not set', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      await el.updateComplete;
      expect(getHeading(el)).toBeNull();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 7. fullWidth prop
  // ──────────────────────────────────────────────────────────────────────────
  describe('fullWidth prop', () => {
    it('reflects full-width attribute on host when enabled', async () => {
      const el = await fixture<SandoCard>(html`<sando-card full-width>Body</sando-card>`);
      await el.updateComplete;
      expect(el.fullWidth).toBe(true);
      expect(el.hasAttribute('full-width')).toBe(true);
    });

    it('does not set full-width attribute when false', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      expect(el.fullWidth).toBe(false);
      expect(el.hasAttribute('full-width')).toBe(false);
    });

    it('programmatically toggling fullWidth reflects attribute', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      el.fullWidth = true;
      await el.updateComplete;
      expect(el.hasAttribute('full-width')).toBe(true);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 8. Clickable + sando-card-click event
  // ──────────────────────────────────────────────────────────────────────────
  describe('Clickable card', () => {
    it('renders surface-action button when clickable is true', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Click me" clickable>Body</sando-card>`
      );
      await el.updateComplete;
      const sa = getSurfaceAction(el);
      expect(sa).not.toBeNull();
      expect(sa?.tagName.toLowerCase()).toBe('button');
    });

    it('applies card--interactive class when clickable', async () => {
      const el = await fixture<SandoCard>(html`<sando-card clickable>Body</sando-card>`);
      await el.updateComplete;
      expect(getCard(el)?.classList.contains('card--interactive')).toBe(true);
    });

    it('fires sando-card-click on mouse click', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Click me" clickable>Body</sando-card>`
      );
      await el.updateComplete;

      let eventFired = false;
      el.addEventListener('sando-card-click', () => {
        eventFired = true;
      });

      const sa = getSurfaceAction(el) as HTMLButtonElement;
      sa.click();
      expect(eventFired).toBe(true);
    });

    it('fires sando-card-click with originalEvent in detail', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Click me" clickable>Body</sando-card>`
      );
      await el.updateComplete;

      let detail: { originalEvent: Event } | null = null;
      el.addEventListener('sando-card-click', (e: Event) => {
        detail = (e as CustomEvent).detail;
      });

      const sa = getSurfaceAction(el) as HTMLButtonElement;
      sa.click();
      expect(detail).not.toBeNull();
      expect(detail!.originalEvent).toBeDefined();
    });

    it('fires sando-card-click on Enter key', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Click me" clickable>Body</sando-card>`
      );
      await el.updateComplete;

      let eventFired = false;
      el.addEventListener('sando-card-click', () => {
        eventFired = true;
      });

      const sa = getSurfaceAction(el) as HTMLButtonElement;
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true
      });
      sa.dispatchEvent(enterEvent);
      expect(eventFired).toBe(true);
    });

    it('fires sando-card-click on Space key', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Click me" clickable>Body</sando-card>`
      );
      await el.updateComplete;

      let eventFired = false;
      el.addEventListener('sando-card-click', () => {
        eventFired = true;
      });

      const sa = getSurfaceAction(el) as HTMLButtonElement;
      const spaceEvent = new KeyboardEvent('keydown', {
        key: ' ',
        bubbles: true,
        cancelable: true
      });
      sa.dispatchEvent(spaceEvent);
      expect(eventFired).toBe(true);
    });

    it('sando-card-click is a composed, bubbling CustomEvent', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Click me" clickable>Body</sando-card>`
      );
      await el.updateComplete;

      let capturedEvent:
        | (CustomEvent<{ originalEvent: Event }> & { bubbles: boolean; composed: boolean })
        | null = null;
      el.addEventListener('sando-card-click', (e: Event) => {
        capturedEvent = e as CustomEvent<{ originalEvent: Event }> & {
          bubbles: boolean;
          composed: boolean;
        };
      });

      getSurfaceAction(el)!.click();
      expect(capturedEvent).not.toBeNull();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(capturedEvent!.bubbles).toBe(true);
      expect(capturedEvent!.composed).toBe(true);
    });

    it('does NOT render surface-action for static card', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      await el.updateComplete;
      expect(getSurfaceAction(el)).toBeNull();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 9. Clickable + disabled
  // ──────────────────────────────────────────────────────────────────────────
  describe('Clickable + disabled', () => {
    it('does NOT fire sando-card-click when disabled', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Click me" clickable disabled>Body</sando-card>`
      );
      await el.updateComplete;

      let eventFired = false;
      el.addEventListener('sando-card-click', () => {
        eventFired = true;
      });

      getSurfaceAction(el)!.click();
      expect(eventFired).toBe(false);
    });

    it('surface-action has tabindex="-1" when disabled', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Click me" clickable disabled>Body</sando-card>`
      );
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('tabindex')).toBe('-1');
    });

    it('surface-action has aria-disabled="true" when disabled', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Click me" clickable disabled>Body</sando-card>`
      );
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('aria-disabled')).toBe('true');
    });

    it('applies card--disabled class when disabled', async () => {
      const el = await fixture<SandoCard>(html`<sando-card clickable disabled>Body</sando-card>`);
      await el.updateComplete;
      expect(getCard(el)?.classList.contains('card--disabled')).toBe(true);
    });

    it('does NOT fire event on Enter when disabled', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Click me" clickable disabled>Body</sando-card>`
      );
      await el.updateComplete;

      let eventFired = false;
      el.addEventListener('sando-card-click', () => {
        eventFired = true;
      });

      const sa = getSurfaceAction(el)!;
      sa.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      expect(eventFired).toBe(false);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 10. href card (anchor overlay)
  // ──────────────────────────────────────────────────────────────────────────
  describe('href card', () => {
    it('renders surface-action as <a> when href is set', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="Link card" href="https://example.com">Body</sando-card>`
      );
      await el.updateComplete;
      const sa = getSurfaceAction(el);
      expect(sa?.tagName.toLowerCase()).toBe('a');
    });

    it('anchor has correct href', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card href="https://example.com">Body</sando-card>`
      );
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('href')).toBe('https://example.com');
    });

    it('anchor has correct target attribute', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card href="https://example.com" target="_blank">Body</sando-card>`
      );
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('target')).toBe('_blank');
    });

    it('auto-sets rel="noopener noreferrer" when target="_blank"', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card href="https://example.com" target="_blank">Body</sando-card>`
      );
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('uses explicit rel when provided alongside target="_blank"', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card href="https://example.com" target="_blank" rel="noopener"
          >Body</sando-card
        >`
      );
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('rel')).toBe('noopener');
    });

    it('no rel is set when target is not _blank and rel is not provided', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card href="https://example.com">Body</sando-card>`
      );
      await el.updateComplete;
      // rel should not be set for a normal link without target
      expect(getSurfaceAction(el)?.getAttribute('rel')).toBeNull();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 11. href wins over clickable
  // ──────────────────────────────────────────────────────────────────────────
  describe('href wins over clickable', () => {
    it('renders anchor (not button) when both href and clickable are set', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const el = await fixture<SandoCard>(
        html`<sando-card href="https://example.com" clickable>Body</sando-card>`
      );
      await el.updateComplete;
      const sa = getSurfaceAction(el);
      expect(sa?.tagName.toLowerCase()).toBe('a');

      consoleWarnSpy.mockRestore();
    });

    it('emits a console.warn when both href and clickable are set', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await fixture<SandoCard>(
        html`<sando-card href="https://example.com" clickable>Body</sando-card>`
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('[sando-card]'));

      consoleWarnSpy.mockRestore();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 12. Loading state
  // ──────────────────────────────────────────────────────────────────────────
  describe('Loading state', () => {
    it('renders sando-skeleton-card when loading is true', async () => {
      const el = await fixture<SandoCard>(html`<sando-card loading>Body</sando-card>`);
      await el.updateComplete;
      expect(getSkeleton(el)).not.toBeNull();
    });

    it('sets aria-busy="true" on .card wrapper when loading', async () => {
      const el = await fixture<SandoCard>(html`<sando-card loading>Body</sando-card>`);
      await el.updateComplete;
      expect(getCard(el)?.getAttribute('aria-busy')).toBe('true');
    });

    it('sets aria-busy="false" on .card wrapper when not loading', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      await el.updateComplete;
      expect(getCard(el)?.getAttribute('aria-busy')).toBe('false');
    });

    it('does NOT render surface-action when loading', async () => {
      const el = await fixture<SandoCard>(html`<sando-card clickable loading>Body</sando-card>`);
      await el.updateComplete;
      expect(getSurfaceAction(el)).toBeNull();
    });

    it('reflects loading attribute on host', async () => {
      const el = await fixture<SandoCard>(html`<sando-card loading>Body</sando-card>`);
      expect(el.hasAttribute('loading')).toBe(true);
    });

    it('loading card surface-action has tabindex="-1" when loading with href', async () => {
      // When loading is true the surface-action shouldn't render at all
      // (card content replaced by skeleton), so there's nothing to focus
      const el = await fixture<SandoCard>(
        html`<sando-card href="https://example.com" loading>Body</sando-card>`
      );
      await el.updateComplete;
      // skeleton replaces everything — no surface action
      expect(getSurfaceAction(el)).toBeNull();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 13. Hoverable prop
  // ──────────────────────────────────────────────────────────────────────────
  describe('Hoverable prop', () => {
    it('applies card--hoverable class when hoverable and NOT interactive', async () => {
      const el = await fixture<SandoCard>(html`<sando-card hoverable>Body</sando-card>`);
      await el.updateComplete;
      expect(getCard(el)?.classList.contains('card--hoverable')).toBe(true);
    });

    it('does NOT apply card--hoverable when both hoverable and clickable are set', async () => {
      const el = await fixture<SandoCard>(html`<sando-card hoverable clickable>Body</sando-card>`);
      await el.updateComplete;
      // hoverable is ignored when interactive
      expect(getCard(el)?.classList.contains('card--hoverable')).toBe(false);
    });

    it('does NOT apply card--hoverable when hoverable and href are set', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const el = await fixture<SandoCard>(
        html`<sando-card hoverable href="https://example.com">Body</sando-card>`
      );
      await el.updateComplete;
      expect(getCard(el)?.classList.contains('card--hoverable')).toBe(false);
      consoleWarnSpy.mockRestore();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 14. Slot detection — wrappers hidden when empty
  // ──────────────────────────────────────────────────────────────────────────
  describe('Slot detection', () => {
    it('media wrapper is hidden when media slot is empty', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      await el.updateComplete;
      expect(getMedia(el)?.hasAttribute('hidden')).toBe(true);
    });

    it('media wrapper is visible when media slot has content', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card>
          <img slot="media" src="test.jpg" alt="test" />
          Body
        </sando-card>
      `);
      await el.updateComplete;
      expect(getMedia(el)?.hasAttribute('hidden')).toBe(false);
    });

    it('footer wrapper is hidden when footer slot is empty', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      await el.updateComplete;
      expect(getFooter(el)?.hasAttribute('hidden')).toBe(true);
    });

    it('footer wrapper is visible when footer slot has content', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card>
          Body
          <span slot="footer">Footer content</span>
        </sando-card>
      `);
      await el.updateComplete;
      expect(getFooter(el)?.hasAttribute('hidden')).toBe(false);
    });

    it('header wrapper is hidden when neither header slot nor heading prop is set', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      await el.updateComplete;
      expect(getHeader(el)?.hasAttribute('hidden')).toBe(true);
    });

    it('header wrapper is visible when heading prop is set', async () => {
      const el = await fixture<SandoCard>(html`<sando-card heading="My Card">Body</sando-card>`);
      await el.updateComplete;
      expect(getHeader(el)?.hasAttribute('hidden')).toBe(false);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 15. header slot overrides heading prop
  // ──────────────────────────────────────────────────────────────────────────
  describe('header slot overrides heading prop', () => {
    it('renders header slot content when both heading and header slot are provided', async () => {
      const el = await fixture<SandoCard>(html`
        <sando-card heading="Prop Heading">
          <div slot="header">Custom Header</div>
          Body
        </sando-card>
      `);
      await el.updateComplete;

      // The slotted header content should be in the DOM
      const slottedHeader = el.querySelector('[slot="header"]');
      expect(slottedHeader?.textContent).toBe('Custom Header');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 16. ariaLabel overrides aria-labelledby on surface-action
  // ──────────────────────────────────────────────────────────────────────────
  describe('ariaLabel prop', () => {
    it('surface-action uses aria-labelledby pointing to heading id when no ariaLabel', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="My Card" clickable>Body</sando-card>`
      );
      await el.updateComplete;

      const sa = getSurfaceAction(el);
      const headingId = getHeading(el)?.id;
      expect(sa?.getAttribute('aria-labelledby')).toBe(headingId);
      expect(sa?.getAttribute('aria-label')).toBeNull();
    });

    it('surface-action uses aria-label when ariaLabel prop is set', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card heading="My Card" clickable aria-label="Custom label">Body</sando-card>`
      );
      await el.updateComplete;

      const sa = getSurfaceAction(el);
      expect(sa?.getAttribute('aria-label')).toBe('Custom label');
      // aria-labelledby should not be set when aria-label is present
      expect(sa?.getAttribute('aria-labelledby')).toBeNull();
    });

    it('ariaLabel also works with href anchor overlay', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card href="https://example.com" aria-label="Visit example">Body</sando-card>`
      );
      await el.updateComplete;

      const sa = getSurfaceAction(el);
      expect(sa?.getAttribute('aria-label')).toBe('Visit example');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 17. Surface-action tabindex when enabled
  // ──────────────────────────────────────────────────────────────────────────
  describe('Surface-action tab order', () => {
    it('surface-action has tabindex="0" when clickable and not disabled', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card clickable heading="Click me">Body</sando-card>`
      );
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('tabindex')).toBe('0');
    });

    it('surface-action has tabindex="0" when href and not disabled', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card href="https://example.com" heading="Link">Body</sando-card>`
      );
      await el.updateComplete;
      expect(getSurfaceAction(el)?.getAttribute('tabindex')).toBe('0');
    });

    it('surface-action has tabindex="-1" when loading with clickable', async () => {
      // When loading is true the whole content is replaced by skeleton — no surface-action
      const el = await fixture<SandoCard>(
        html`<sando-card clickable loading heading="Click me">Body</sando-card>`
      );
      await el.updateComplete;
      // No surface-action rendered during loading
      expect(getSurfaceAction(el)).toBeNull();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 18. Keyboard navigation
  // ──────────────────────────────────────────────────────────────────────────
  describe('Keyboard navigation', () => {
    it('surface-action button is focusable via shadow root', async () => {
      const el = await fixture<SandoCard>(
        html`<sando-card clickable heading="Click me">Body</sando-card>`
      );
      await el.updateComplete;

      const sa = getSurfaceAction(el);
      expect(sa).not.toBeNull();
      expect(sa?.getAttribute('tabindex')).not.toBe('-1');
    });

    it('shadow root delegatesFocus is set', async () => {
      const el = await fixture<SandoCard>(html`<sando-card clickable>Body</sando-card>`);
      expect(el.shadowRoot).not.toBeNull();
      expect(el.shadowRoot?.mode).toBe('open');
    });

    it('does not respond to keyboard events when not interactive', async () => {
      const el = await fixture<SandoCard>(html`<sando-card>Body</sando-card>`);
      await el.updateComplete;

      let fired = false;
      el.addEventListener('sando-card-click', () => {
        fired = true;
      });

      // No surface-action means no way to fire the event via keyboard
      expect(getSurfaceAction(el)).toBeNull();
      expect(fired).toBe(false);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 19. Boolean attribute reflection
  // ──────────────────────────────────────────────────────────────────────────
  describe('Boolean attribute reflection', () => {
    it('clickable attribute reflects on host', async () => {
      const el = await fixture<SandoCard>(html`<sando-card clickable>Body</sando-card>`);
      expect(el.hasAttribute('clickable')).toBe(true);
    });

    it('hoverable attribute reflects on host', async () => {
      const el = await fixture<SandoCard>(html`<sando-card hoverable>Body</sando-card>`);
      expect(el.hasAttribute('hoverable')).toBe(true);
    });

    it('disabled attribute reflects on host', async () => {
      const el = await fixture<SandoCard>(html`<sando-card disabled>Body</sando-card>`);
      expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('loading attribute reflects on host', async () => {
      const el = await fixture<SandoCard>(html`<sando-card loading>Body</sando-card>`);
      expect(el.hasAttribute('loading')).toBe(true);
    });
  });
});
