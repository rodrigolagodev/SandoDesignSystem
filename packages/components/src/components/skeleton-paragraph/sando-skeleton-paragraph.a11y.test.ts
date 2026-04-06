/**
 * Accessibility tests for sando-skeleton-paragraph component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-paragraph.js';
import type { SandoSkeletonParagraph } from './sando-skeleton-paragraph.js';

describe('sando-skeleton-paragraph accessibility', () => {
  let element: SandoSkeletonParagraph;

  // ============================================
  // AXE TESTS
  // ============================================

  describe('axe violations', () => {
    it('passes axe for default skeleton paragraph', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for sm size', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph size="sm"></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for md size', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph size="md"></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for lg size', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph size="lg"></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with custom line count', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph lines="5"></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with single line', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph lines="1"></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for pulse effect', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph effect="pulse"></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph effect="none"></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph effect="shimmer"></sando-skeleton-paragraph>`
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
    it('all inner skeleton lines have aria-hidden="true" on their presentation div', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph lines="3"></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      const skeletons = element.shadowRoot?.querySelectorAll('sando-skeleton');
      expect(skeletons?.length).toBeGreaterThan(0);

      for (const skeleton of Array.from(skeletons ?? [])) {
        const skeletonEl = skeleton as Element & { updateComplete?: Promise<boolean> };
        await skeletonEl.updateComplete;
        const innerDiv = skeletonEl.shadowRoot?.querySelector('.skeleton');
        expect(innerDiv?.getAttribute('aria-hidden')).toBe('true');
      }
    });
  });

  // ============================================
  // DECORATIVE ELEMENT TESTS
  // ============================================

  describe('decorative element behavior', () => {
    it('host element is not focusable', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      expect(element.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // REDUCED MOTION TESTS
  // ============================================

  describe('reduced motion support', () => {
    it('effect="none" propagates to all skeleton lines', async () => {
      element = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph effect="none" lines="3"></sando-skeleton-paragraph>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('none');

      const skeletons = element.shadowRoot?.querySelectorAll('sando-skeleton');
      skeletons?.forEach((skeleton) => {
        expect(skeleton.getAttribute('effect')).toBe('none');
      });
    });
  });

  // ============================================
  // ALL SIZES ACCESSIBLE
  // ============================================

  describe('all sizes are accessible', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size is accessible`, async () => {
        element = await fixture<SandoSkeletonParagraph>(
          html`<sando-skeleton-paragraph size="${size}"></sando-skeleton-paragraph>`
        );
        await element.updateComplete;

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
        element = await fixture<SandoSkeletonParagraph>(
          html`<sando-skeleton-paragraph effect="${effect}"></sando-skeleton-paragraph>`
        );
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ============================================
  // ALL SPACINGS ACCESSIBLE
  // ============================================

  describe('all spacings are accessible', () => {
    const spacings = ['xs', 'sm', 'md', 'lg'] as const;

    spacings.forEach((spacing) => {
      it(`${spacing} spacing is accessible`, async () => {
        element = await fixture<SandoSkeletonParagraph>(
          html`<sando-skeleton-paragraph spacing="${spacing}"></sando-skeleton-paragraph>`
        );
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
