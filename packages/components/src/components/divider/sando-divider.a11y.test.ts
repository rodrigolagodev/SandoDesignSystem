/**
 * Accessibility Tests for sando-divider
 *
 * Tests written by sando-quality.
 * Covers: axe-core violations, semantic HTML, ARIA attributes, all prop combos.
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-divider.js';
import type { SandoDivider } from './sando-divider.js';

describe('sando-divider Accessibility', () => {
  // ─── axe-core: Core configurations ────────────────────────────────────────

  describe('axe-core: core configurations', () => {
    it('passes axe on horizontal bare (default)', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('passes axe on horizontal with label', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="OR"></sando-divider>`);
      await el.updateComplete;

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('passes axe on vertical', async () => {
      const el = await fixture<HTMLDivElement>(
        html`<div style="display:flex;height:2rem;">
          <sando-divider orientation="vertical"></sando-divider>
        </div>`
      );
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  // ─── axe-core: weight × variant combos ─────────────────────────────────────

  describe('axe-core: weight variants', () => {
    const weights = ['thin', 'medium', 'thick'] as const;

    for (const weight of weights) {
      it(`passes axe with weight="${weight}"`, async () => {
        const el = await fixture<SandoDivider>(
          html`<sando-divider weight=${weight}></sando-divider>`
        );
        await el.updateComplete;

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    }
  });

  describe('axe-core: visual variants', () => {
    const variants = ['solid', 'dashed', 'dotted'] as const;

    for (const variant of variants) {
      it(`passes axe with variant="${variant}"`, async () => {
        const el = await fixture<SandoDivider>(
          html`<sando-divider variant=${variant}></sando-divider>`
        );
        await el.updateComplete;

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    }
  });

  describe('axe-core: spacing variants', () => {
    const spacings = ['sm', 'md', 'lg'] as const;

    for (const spacing of spacings) {
      it(`passes axe with spacing="${spacing}"`, async () => {
        const el = await fixture<SandoDivider>(
          html`<sando-divider spacing=${spacing}></sando-divider>`
        );
        await el.updateComplete;

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    }
  });

  describe('axe-core: labeled divider with all variants', () => {
    const variants = ['solid', 'dashed', 'dotted'] as const;

    for (const variant of variants) {
      it(`passes axe on labeled divider with variant="${variant}"`, async () => {
        const el = await fixture<SandoDivider>(
          html`<sando-divider label="Section" variant=${variant}></sando-divider>`
        );
        await el.updateComplete;

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    }
  });

  // ─── ARIA: horizontal bare (<hr>) ──────────────────────────────────────────

  describe('ARIA: horizontal bare (<hr>)', () => {
    it('should render a native <hr> (implicit role="separator")', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const hr = el.shadowRoot?.querySelector('hr');
      expect(hr).not.toBeNull();
    });

    it('should NOT have explicit role on the <hr> (native semantics)', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const hr = el.shadowRoot?.querySelector('hr');
      // Native <hr> should not override its own implicit role
      expect(hr?.hasAttribute('role')).toBe(false);
    });

    it('should NOT have aria-label when no label is set', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const hr = el.shadowRoot?.querySelector('hr');
      expect(hr?.hasAttribute('aria-label')).toBe(false);
    });

    it('should NOT have aria-orientation on the <hr>', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const hr = el.shadowRoot?.querySelector('hr');
      expect(hr?.hasAttribute('aria-orientation')).toBe(false);
    });
  });

  // ─── ARIA: horizontal with label ────────────────────────────────────────────

  describe('ARIA: horizontal with label', () => {
    it('should have role="separator" on the wrapper <div>', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="OR"></sando-divider>`);
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.getAttribute('role')).toBe('separator');
    });

    it('should have aria-label matching the label prop', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="OR"></sando-divider>`);
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.getAttribute('aria-label')).toBe('OR');
    });

    it('should update aria-label when label prop changes', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="OR"></sando-divider>`);
      await el.updateComplete;

      el.label = 'AND';
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.getAttribute('aria-label')).toBe('AND');
    });

    it('should NOT have aria-orientation on labeled horizontal', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="OR"></sando-divider>`);
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.hasAttribute('aria-orientation')).toBe(false);
    });
  });

  // ─── ARIA: vertical ────────────────────────────────────────────────────────

  describe('ARIA: vertical', () => {
    it('should have role="separator" on the vertical <div>', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.getAttribute('role')).toBe('separator');
    });

    it('should have aria-orientation="vertical"', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.getAttribute('aria-orientation')).toBe('vertical');
    });

    it('should NOT have aria-label on bare vertical divider', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.hasAttribute('aria-label')).toBe(false);
    });
  });

  // ─── ARIA: no-label invariants ─────────────────────────────────────────────

  describe('ARIA: no aria-label when no label', () => {
    it('horizontal bare: no aria-label anywhere in shadow DOM', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const ariaLabeled = el.shadowRoot?.querySelector('[aria-label]');
      expect(ariaLabeled).toBeNull();
    });

    it('vertical: no aria-label anywhere in shadow DOM', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      const ariaLabeled = el.shadowRoot?.querySelector('[aria-label]');
      expect(ariaLabeled).toBeNull();
    });
  });
});
