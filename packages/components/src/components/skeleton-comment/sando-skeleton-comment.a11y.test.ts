/**
 * Accessibility tests for sando-skeleton-comment component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-comment.js';
import type { SandoSkeletonComment } from './sando-skeleton-comment.js';

describe('sando-skeleton-comment accessibility', () => {
  let element: SandoSkeletonComment;

  // ============================================
  // AXE TESTS — DEFAULT STATE
  // ============================================

  describe('axe violations — default state', () => {
    it('passes axe for default skeleton comment', async () => {
      element = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe without timestamp', async () => {
      element = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment .showTimestamp=${false}></sando-skeleton-comment>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with all optional sections shown', async () => {
      element = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment .showTimestamp=${true} lines="4"></sando-skeleton-comment>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — AVATAR SIZES
  // ============================================

  describe('axe violations — avatar sizes', () => {
    const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    avatarSizes.forEach((size) => {
      it(`passes axe for avatar-size="${size}"`, async () => {
        element = await fixture<SandoSkeletonComment>(
          html`<sando-skeleton-comment avatar-size="${size}"></sando-skeleton-comment>`
        );
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ============================================
  // AXE TESTS — TEXT SIZES
  // ============================================

  describe('axe violations — text sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`passes axe for size="${size}"`, async () => {
        element = await fixture<SandoSkeletonComment>(
          html`<sando-skeleton-comment size="${size}"></sando-skeleton-comment>`
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
      element = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment effect="pulse"></sando-skeleton-comment>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment effect="none"></sando-skeleton-comment>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment effect="shimmer"></sando-skeleton-comment>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — LINE COUNTS
  // ============================================

  describe('axe violations — line counts', () => {
    it('passes axe with 1 line', async () => {
      element = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment lines="1"></sando-skeleton-comment>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with 4 lines', async () => {
      element = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment lines="4"></sando-skeleton-comment>`
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
      element = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
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
      element = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment effect="none" lines="4"></sando-skeleton-comment>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('none');

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });
});
