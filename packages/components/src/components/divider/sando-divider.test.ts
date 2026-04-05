/**
 * Unit Tests for sando-divider
 *
 * Tests written by sando-quality.
 * Covers: rendering, props, orientation variants, label pattern, part attributes.
 */

import { fixture, expect as expectWc } from '@open-wc/testing';
import { html } from 'lit';
import './sando-divider.js';
import type { SandoDivider } from './sando-divider.js';

describe('sando-divider', () => {
  // ─── Rendering ─────────────────────────────────────────────────────────────

  describe('Rendering', () => {
    it('should render with default props', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      expect(el).toBeDefined();
      expect(el.shadowRoot).toBeDefined();
    });

    it('should have default property values', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      expect(el.orientation).toBe('horizontal');
      expect(el.weight).toBe('medium');
      expect(el.variant).toBe('solid');
      expect(el.spacing).toBe('md');
      expect(el.label).toBeUndefined();
    });

    it('should render an <hr> for horizontal bare (default)', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const hr = el.shadowRoot?.querySelector('hr');
      expect(hr).not.toBeNull();
    });

    it('should NOT render a <div> for horizontal bare', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div).toBeNull();
    });

    it('should render a <div> for vertical orientation', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div).not.toBeNull();

      const hr = el.shadowRoot?.querySelector('hr');
      expect(hr).toBeNull();
    });

    it('should render a <div> wrapper for horizontal with label', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="OR"></sando-divider>`);
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div).not.toBeNull();

      const hr = el.shadowRoot?.querySelector('hr');
      expect(hr).toBeNull();
    });

    it('should render .divider__label span when label is set', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="Section"></sando-divider>`);
      await el.updateComplete;

      const labelSpan = el.shadowRoot?.querySelector('.divider__label');
      expect(labelSpan).not.toBeNull();
      expect(labelSpan?.textContent?.trim()).toBe('Section');
    });

    it('should NOT render .divider__label when no label', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const labelSpan = el.shadowRoot?.querySelector('.divider__label');
      expect(labelSpan).toBeNull();
    });

    it('should NOT render .divider__label for vertical orientation without label', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      const labelSpan = el.shadowRoot?.querySelector('.divider__label');
      expect(labelSpan).toBeNull();
    });
  });

  // ─── Part Attributes ───────────────────────────────────────────────────────

  describe('Part Attributes', () => {
    it('should have part="divider" on the <hr> element', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const hr = el.shadowRoot?.querySelector('hr');
      expect(hr?.getAttribute('part')).toBe('divider');
    });

    it('should have part="divider" on the vertical <div>', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.getAttribute('part')).toBe('divider');
    });

    it('should have part="divider" on the labeled <div>', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="OR"></sando-divider>`);
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.getAttribute('part')).toBe('divider');
    });

    it('should have part="label" on the label span', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="OR"></sando-divider>`);
      await el.updateComplete;

      const labelSpan = el.shadowRoot?.querySelector('.divider__label');
      expect(labelSpan?.getAttribute('part')).toBe('label');
    });

    it('should NOT have a label part when no label is set', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const partLabel = el.shadowRoot?.querySelector('[part="label"]');
      expect(partLabel).toBeNull();
    });
  });

  // ─── Property & Attribute Reflection ───────────────────────────────────────

  describe('Properties', () => {
    it('should reflect orientation="vertical" as attribute', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      expect(el.orientation).toBe('vertical');
      expect(el.getAttribute('orientation')).toBe('vertical');
    });

    it('should reflect orientation back to "horizontal" when changed', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      el.orientation = 'horizontal';
      await el.updateComplete;

      expect(el.orientation).toBe('horizontal');
      expect(el.getAttribute('orientation')).toBe('horizontal');
    });

    it('should reflect weight="thin" as attribute', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider weight="thin"></sando-divider>`);
      await el.updateComplete;

      expect(el.weight).toBe('thin');
      expect(el.getAttribute('weight')).toBe('thin');
    });

    it('should reflect weight="thick" as attribute', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider weight="thick"></sando-divider>`);
      await el.updateComplete;

      expect(el.weight).toBe('thick');
      expect(el.getAttribute('weight')).toBe('thick');
    });

    it('should update weight property dynamically', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      el.weight = 'thin';
      await el.updateComplete;

      expect(el.weight).toBe('thin');
      expect(el.getAttribute('weight')).toBe('thin');
    });

    it('should reflect variant="dashed" as attribute', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider variant="dashed"></sando-divider>`
      );
      await el.updateComplete;

      expect(el.variant).toBe('dashed');
      expect(el.getAttribute('variant')).toBe('dashed');
    });

    it('should reflect variant="dotted" as attribute', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider variant="dotted"></sando-divider>`
      );
      await el.updateComplete;

      expect(el.variant).toBe('dotted');
      expect(el.getAttribute('variant')).toBe('dotted');
    });

    it('should update variant property dynamically', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      el.variant = 'dashed';
      await el.updateComplete;

      expect(el.variant).toBe('dashed');
      expect(el.getAttribute('variant')).toBe('dashed');
    });

    it('should reflect spacing="sm" as attribute', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider spacing="sm"></sando-divider>`);
      await el.updateComplete;

      expect(el.spacing).toBe('sm');
      expect(el.getAttribute('spacing')).toBe('sm');
    });

    it('should reflect spacing="lg" as attribute', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider spacing="lg"></sando-divider>`);
      await el.updateComplete;

      expect(el.spacing).toBe('lg');
      expect(el.getAttribute('spacing')).toBe('lg');
    });

    it('should update spacing property dynamically', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      el.spacing = 'lg';
      await el.updateComplete;

      expect(el.spacing).toBe('lg');
      expect(el.getAttribute('spacing')).toBe('lg');
    });

    it('should update label property dynamically — adds label span', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      // No label initially
      expect(el.shadowRoot?.querySelector('.divider__label')).toBeNull();

      el.label = 'New Label';
      await el.updateComplete;

      const labelSpan = el.shadowRoot?.querySelector('.divider__label');
      expect(labelSpan).not.toBeNull();
      expect(labelSpan?.textContent?.trim()).toBe('New Label');
    });

    it('should remove label span when label is cleared', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider label="Remove me"></sando-divider>`
      );
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('.divider__label')).not.toBeNull();

      el.label = undefined;
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('.divider__label')).toBeNull();
    });
  });

  // ─── Element Type Switching ─────────────────────────────────────────────────

  describe('Element type switching', () => {
    it('horizontal (default) → renders <hr>', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('hr')).not.toBeNull();
      expect(el.shadowRoot?.querySelector('div')).toBeNull();
    });

    it('vertical → renders <div>', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('div')).not.toBeNull();
      expect(el.shadowRoot?.querySelector('hr')).toBeNull();
    });

    it('horizontal + label → renders <div> (not <hr>)', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="OR"></sando-divider>`);
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('div')).not.toBeNull();
      expect(el.shadowRoot?.querySelector('hr')).toBeNull();
    });

    it('switching from horizontal to vertical re-renders as <div>', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('hr')).not.toBeNull();

      el.orientation = 'vertical';
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('hr')).toBeNull();
      expect(el.shadowRoot?.querySelector('div')).not.toBeNull();
    });

    it('switching from vertical back to horizontal re-renders as <hr>', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('div')).not.toBeNull();

      el.orientation = 'horizontal';
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('hr')).not.toBeNull();
      expect(el.shadowRoot?.querySelector('div')).toBeNull();
    });
  });

  // ─── CSS Classes ───────────────────────────────────────────────────────────

  describe('CSS classes', () => {
    it('<hr> should have class "divider"', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await el.updateComplete;

      const hr = el.shadowRoot?.querySelector('hr');
      expect(hr?.classList.contains('divider')).toBe(true);
    });

    it('vertical <div> should have class "divider--vertical"', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider orientation="vertical"></sando-divider>`
      );
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.classList.contains('divider--vertical')).toBe(true);
    });

    it('horizontal labeled <div> should NOT have class "divider--vertical"', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider label="OR"></sando-divider>`);
      await el.updateComplete;

      const div = el.shadowRoot?.querySelector('div');
      expect(div?.classList.contains('divider--vertical')).toBe(false);
    });
  });

  // ─── Accessibility (basic — full coverage in a11y file) ────────────────────

  describe('Accessibility (basic)', () => {
    it('should be accessible by default', async () => {
      const el = await fixture<SandoDivider>(html`<sando-divider></sando-divider>`);
      await expectWc(el).to.be.accessible();
    });

    it('should be accessible with label', async () => {
      const el = await fixture<SandoDivider>(
        html`<sando-divider label="Section divider"></sando-divider>`
      );
      await expectWc(el).to.be.accessible();
    });
  });
});
