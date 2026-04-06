/**
 * Accessibility tests for sando-skeleton-list-item component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-list-item.js';
import type { SandoSkeletonListItem } from './sando-skeleton-list-item.js';

describe('sando-skeleton-list-item accessibility', () => {
  let element: SandoSkeletonListItem;

  // ============================================
  // AXE TESTS — DEFAULT STATE
  // ============================================

  describe('axe violations — default state', () => {
    it('passes axe for default skeleton list item', async () => {
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item></sando-skeleton-list-item>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with show-action', async () => {
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item show-action></sando-skeleton-list-item>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe without avatar', async () => {
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item .showAvatar=${false}></sando-skeleton-list-item>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with all optional sections shown', async () => {
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item show-action lines="3"></sando-skeleton-list-item>`
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
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item lines="1"></sando-skeleton-list-item>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with 2 lines', async () => {
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item lines="2"></sando-skeleton-list-item>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with 3 lines', async () => {
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item lines="3"></sando-skeleton-list-item>`
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
        element = await fixture<SandoSkeletonListItem>(
          html`<sando-skeleton-list-item avatar-size="${size}"></sando-skeleton-list-item>`
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
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item effect="pulse"></sando-skeleton-list-item>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item effect="none"></sando-skeleton-list-item>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item effect="shimmer"></sando-skeleton-list-item>`
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
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item></sando-skeleton-list-item>`
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
      element = await fixture<SandoSkeletonListItem>(
        html`<sando-skeleton-list-item
          effect="none"
          show-action
          lines="3"
        ></sando-skeleton-list-item>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('none');

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });
});
