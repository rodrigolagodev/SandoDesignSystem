/**
 * Accessibility tests for sando-skeleton-article component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-article.js';
import type { SandoSkeletonArticle } from './sando-skeleton-article.js';

describe('sando-skeleton-article accessibility', () => {
  let element: SandoSkeletonArticle;

  // ============================================
  // AXE TESTS — DEFAULT STATE
  // ============================================

  describe('axe violations — default state', () => {
    it('passes axe for default skeleton article', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with hero image', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article show-hero-image></sando-skeleton-article>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe without meta', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article .showMeta=${false}></sando-skeleton-article>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with all optional sections shown', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article
          show-hero-image
          .showMeta=${true}
          paragraphs="3"
        ></sando-skeleton-article>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — SIZES
  // ============================================

  describe('axe violations — sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`passes axe for size="${size}"`, async () => {
        element = await fixture<SandoSkeletonArticle>(
          html`<sando-skeleton-article size="${size}"></sando-skeleton-article>`
        );
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ============================================
  // AXE TESTS — EFFECTS
  // ============================================

  describe('axe violations — effects', () => {
    it('passes axe for pulse effect', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article effect="pulse"></sando-skeleton-article>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article effect="none"></sando-skeleton-article>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article effect="shimmer"></sando-skeleton-article>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — PARAGRAPH COUNTS
  // ============================================

  describe('axe violations — paragraph counts', () => {
    it('passes axe with 1 paragraph', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article paragraphs="1"></sando-skeleton-article>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with 5 paragraphs', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article paragraphs="5"></sando-skeleton-article>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // DECORATIVE ELEMENT TESTS
  // ============================================

  describe('decorative element behavior', () => {
    it('host element is not focusable', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      await element.updateComplete;

      expect(element.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // REDUCED MOTION TESTS
  // ============================================

  describe('reduced motion support', () => {
    it('effect="none" with all sections is accessible', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article
          effect="none"
          show-hero-image
          paragraphs="3"
        ></sando-skeleton-article>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('none');

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('pulse effect with hero image is accessible', async () => {
      element = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article effect="pulse" show-hero-image></sando-skeleton-article>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });
});
