/**
 * Accessibility tests for sando-skeleton-image component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-image.js';
import type { SandoSkeletonImage } from './sando-skeleton-image.js';

describe('sando-skeleton-image accessibility', () => {
  let element: SandoSkeletonImage;

  // ============================================
  // AXE TESTS
  // ============================================

  describe('axe violations', () => {
    it('passes axe for default skeleton image', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for ratio 1/1', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="1/1"></sando-skeleton-image>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for ratio 4/3', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="4/3"></sando-skeleton-image>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for ratio 16/9', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="16/9"></sando-skeleton-image>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for ratio 21/9', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="21/9"></sando-skeleton-image>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="shimmer"></sando-skeleton-image>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for pulse effect', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="pulse"></sando-skeleton-image>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="none"></sando-skeleton-image>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with fixed height override', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image height="200px"></sando-skeleton-image>`
      );
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
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');
      expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
    });

    it('has role="presentation" on skeleton container', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');
      expect(skeleton?.getAttribute('role')).toBe('presentation');
    });
  });

  // ============================================
  // DECORATIVE ELEMENT TESTS
  // ============================================

  describe('decorative element behavior', () => {
    it('skeleton image is properly marked as decorative', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');
      expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
      expect(skeleton?.getAttribute('role')).toBe('presentation');
    });

    it('host element is not focusable', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      await element.updateComplete;

      expect(element.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // REDUCED MOTION TESTS
  // ============================================

  describe('reduced motion support', () => {
    it('effect="none" disables shimmer element', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="none"></sando-skeleton-image>`
      );
      await element.updateComplete;

      const shimmer = element.shadowRoot?.querySelector('.skeleton__shimmer');
      expect(shimmer).toBeNull();
    });

    it('effect="shimmer" renders shimmer element', async () => {
      element = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="shimmer"></sando-skeleton-image>`
      );
      await element.updateComplete;

      const shimmer = element.shadowRoot?.querySelector('.skeleton__shimmer');
      expect(shimmer).not.toBeNull();
    });
  });

  // ============================================
  // ALL RATIOS ACCESSIBLE
  // ============================================

  describe('all ratios are accessible', () => {
    const ratios = ['1/1', '4/3', '16/9', '21/9'] as const;

    ratios.forEach((ratio) => {
      it(`${ratio} ratio is accessible`, async () => {
        element = await fixture<SandoSkeletonImage>(
          html`<sando-skeleton-image ratio="${ratio}"></sando-skeleton-image>`
        );
        await element.updateComplete;

        const skeleton = element.shadowRoot?.querySelector('.skeleton');
        expect(skeleton?.getAttribute('aria-hidden')).toBe('true');

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
        element = await fixture<SandoSkeletonImage>(
          html`<sando-skeleton-image effect="${effect}"></sando-skeleton-image>`
        );
        await element.updateComplete;

        const skeleton = element.shadowRoot?.querySelector('.skeleton');
        expect(skeleton?.getAttribute('aria-hidden')).toBe('true');

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
