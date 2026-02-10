/**
 * Accessibility tests for sando-skeleton component
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton.js';
import type { SandoSkeleton } from './sando-skeleton.js';

describe('sando-skeleton accessibility', () => {
  let element: SandoSkeleton;

  // ============================================
  // AXE TESTS
  // ============================================

  describe('axe violations', () => {
    it('passes axe for default skeleton', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for text shape', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton shape="text"></sando-skeleton>`);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for circular shape', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton shape="circular" width="40px" height="40px"></sando-skeleton>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for rectangular shape', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton shape="rectangular" width="200px" height="100px"></sando-skeleton>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for rounded shape', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton shape="rounded" width="100%" height="80px"></sando-skeleton>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton effect="shimmer"></sando-skeleton>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for pulse effect', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton effect="pulse"></sando-skeleton>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton effect="none"></sando-skeleton>`);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // ARIA ATTRIBUTE TESTS
  // ============================================

  describe('aria attributes', () => {
    it('has aria-hidden="true" on skeleton container', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');
      expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
    });

    it('has role="presentation" on skeleton container', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('div');
      expect(skeleton?.getAttribute('role')).toBe('presentation');
    });
  });

  // ============================================
  // REDUCED MOTION TESTS
  // ============================================

  describe('reduced motion support', () => {
    it('skeleton has animation styles that can be disabled', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton effect="shimmer"></sando-skeleton>`
      );
      await element.updateComplete;

      const shimmer = element.shadowRoot?.querySelector('.skeleton__shimmer');
      expect(shimmer).not.toBeNull();
    });

    it('effect="none" disables animation without media query', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton effect="none"></sando-skeleton>`);
      await element.updateComplete;

      const shimmer = element.shadowRoot?.querySelector('.skeleton__shimmer');
      expect(shimmer).toBeNull();
    });
  });

  // ============================================
  // DECORATIVE ELEMENT TESTS
  // ============================================

  describe('decorative element behavior', () => {
    it('skeleton is properly marked as decorative', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');

      expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
      expect(skeleton?.getAttribute('role')).toBe('presentation');
    });

    it('skeleton is not focusable', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');

      expect(skeleton?.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // ALL SHAPES ACCESSIBLE
  // ============================================

  describe('all shapes are accessible', () => {
    const shapes = ['text', 'circular', 'rectangular', 'rounded'] as const;

    shapes.forEach((shape) => {
      it(`${shape} shape is accessible`, async () => {
        element = await fixture<SandoSkeleton>(
          html`<sando-skeleton shape="${shape}"></sando-skeleton>`
        );
        await element.updateComplete;

        const skeleton = element.shadowRoot?.querySelector('.skeleton');
        expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
        expect(skeleton?.getAttribute('role')).toBe('presentation');

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ============================================
  // ALL EFFECTS ACCESSIBLE
  // ============================================

  describe('all effects are accessible', () => {
    const effects = ['shimmer', 'pulse', 'none'] as const;

    effects.forEach((effect) => {
      it(`${effect} effect is accessible`, async () => {
        element = await fixture<SandoSkeleton>(
          html`<sando-skeleton effect="${effect}"></sando-skeleton>`
        );
        await element.updateComplete;

        const skeleton = element.shadowRoot?.querySelector('.skeleton');
        expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
        expect(skeleton?.getAttribute('role')).toBe('presentation');

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
