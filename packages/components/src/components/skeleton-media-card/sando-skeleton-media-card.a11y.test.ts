/**
 * Accessibility tests for sando-skeleton-media-card component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-media-card.js';
import type { SandoSkeletonMediaCard } from './sando-skeleton-media-card.js';

describe('sando-skeleton-media-card accessibility', () => {
  let element: SandoSkeletonMediaCard;

  // ============================================
  // AXE TESTS — DEFAULT STATE
  // ============================================

  describe('axe violations — default state', () => {
    it('passes axe for default skeleton media card', async () => {
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe without description', async () => {
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card .showDescription=${false}></sando-skeleton-media-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe without actions', async () => {
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card .showActions=${false}></sando-skeleton-media-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with all optional sections shown', async () => {
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card
          .showDescription=${true}
          .showActions=${true}
        ></sando-skeleton-media-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — IMAGE RATIOS
  // ============================================

  describe('axe violations — image ratios', () => {
    const ratios = ['1/1', '4/3', '16/9', '21/9'] as const;

    ratios.forEach((ratio) => {
      it(`passes axe for image-ratio="${ratio}"`, async () => {
        element = await fixture<SandoSkeletonMediaCard>(
          html`<sando-skeleton-media-card image-ratio="${ratio}"></sando-skeleton-media-card>`
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
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card effect="pulse"></sando-skeleton-media-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card effect="none"></sando-skeleton-media-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card effect="shimmer"></sando-skeleton-media-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — DESCRIPTION LINES
  // ============================================

  describe('axe violations — description line counts', () => {
    it('passes axe with 1 description line', async () => {
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card description-lines="1"></sando-skeleton-media-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with 3 description lines', async () => {
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card description-lines="3"></sando-skeleton-media-card>`
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
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
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
      element = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card effect="none"></sando-skeleton-media-card>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('none');

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });
});
