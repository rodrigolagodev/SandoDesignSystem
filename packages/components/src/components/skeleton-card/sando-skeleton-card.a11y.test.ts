/**
 * Accessibility tests for sando-skeleton-card component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-card.js';
import type { SandoSkeletonCard } from './sando-skeleton-card.js';

describe('sando-skeleton-card accessibility', () => {
  let element: SandoSkeletonCard;

  // ============================================
  // AXE TESTS — DEFAULT STATE
  // ============================================

  describe('axe violations — default state', () => {
    it('passes axe for default skeleton card', async () => {
      element = await fixture<SandoSkeletonCard>(html`<sando-skeleton-card></sando-skeleton-card>`);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with show-image', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-image></sando-skeleton-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with show-actions', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-actions></sando-skeleton-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with show-avatar', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-avatar></sando-skeleton-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with all optional sections shown', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-image show-actions show-avatar></sando-skeleton-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — ORIENTATION
  // ============================================

  describe('axe violations — orientations', () => {
    it('passes axe for vertical orientation (default)', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card orientation="vertical" show-image></sando-skeleton-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for horizontal orientation', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card orientation="horizontal" show-image></sando-skeleton-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for horizontal orientation with all sections', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card
          orientation="horizontal"
          show-image
          show-actions
        ></sando-skeleton-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — EFFECTS
  // ============================================

  describe('axe violations — effects', () => {
    it('passes axe for pulse effect', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card effect="pulse"></sando-skeleton-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card effect="none"></sando-skeleton-card>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card effect="shimmer"></sando-skeleton-card>`
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
        element = await fixture<SandoSkeletonCard>(
          html`<sando-skeleton-card show-image image-ratio="${ratio}"></sando-skeleton-card>`
        );
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ============================================
  // DECORATIVE ELEMENT TESTS
  // ============================================

  describe('decorative element behavior', () => {
    it('host element is not focusable', async () => {
      element = await fixture<SandoSkeletonCard>(html`<sando-skeleton-card></sando-skeleton-card>`);
      await element.updateComplete;

      expect(element.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // REDUCED MOTION TESTS
  // ============================================

  describe('reduced motion support', () => {
    it('effect="none" with all sections is accessible', async () => {
      element = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card
          effect="none"
          show-image
          show-actions
          show-avatar
        ></sando-skeleton-card>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('none');

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });
});
