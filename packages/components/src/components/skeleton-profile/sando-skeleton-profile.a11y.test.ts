/**
 * Accessibility tests for sando-skeleton-profile component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-profile.js';
import type { SandoSkeletonProfile } from './sando-skeleton-profile.js';

describe('sando-skeleton-profile accessibility', () => {
  let element: SandoSkeletonProfile;

  // ============================================
  // AXE TESTS — DEFAULT STATE
  // ============================================

  describe('axe violations — default state', () => {
    it('passes axe for default skeleton profile', async () => {
      element = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe without bio', async () => {
      element = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile .showBio=${false}></sando-skeleton-profile>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with all optional sections shown', async () => {
      element = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile .showBio=${true} bio-lines="3"></sando-skeleton-profile>`
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
        element = await fixture<SandoSkeletonProfile>(
          html`<sando-skeleton-profile avatar-size="${size}"></sando-skeleton-profile>`
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
      element = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile effect="pulse"></sando-skeleton-profile>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile effect="none"></sando-skeleton-profile>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile effect="shimmer"></sando-skeleton-profile>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — BIO LINE COUNTS
  // ============================================

  describe('axe violations — bio line counts', () => {
    it('passes axe with 1 bio line', async () => {
      element = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile bio-lines="1"></sando-skeleton-profile>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with 3 bio lines', async () => {
      element = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile bio-lines="3"></sando-skeleton-profile>`
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
      element = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      await element.updateComplete;

      expect(element.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // REDUCED MOTION TESTS
  // ============================================

  describe('reduced motion support', () => {
    it('effect="none" with bio is accessible', async () => {
      element = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile effect="none" bio-lines="3"></sando-skeleton-profile>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('none');

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });
});
