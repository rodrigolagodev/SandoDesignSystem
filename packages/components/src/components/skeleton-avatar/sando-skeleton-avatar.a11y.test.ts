/**
 * Accessibility tests for sando-skeleton-avatar component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-avatar.js';
import type { SandoSkeletonAvatar } from './sando-skeleton-avatar.js';

describe('sando-skeleton-avatar accessibility', () => {
  let element: SandoSkeletonAvatar;

  // ============================================
  // AXE TESTS
  // ============================================

  describe('axe violations', () => {
    it('passes axe for default skeleton avatar', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for xs size', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="xs"></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for sm size', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="sm"></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for md size', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="md"></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for lg size', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="lg"></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for xl size', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="xl"></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar effect="shimmer"></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for pulse effect', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar effect="pulse"></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar effect="none"></sando-skeleton-avatar>`
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
    it('has aria-hidden="true" on inner skeleton', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ============================================
  // DECORATIVE ELEMENT TESTS
  // ============================================

  describe('decorative element behavior', () => {
    it('skeleton avatar is properly marked as decorative', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
    });

    it('host element is not focusable', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      expect(element.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // REDUCED MOTION TESTS
  // ============================================

  describe('reduced motion support', () => {
    it('effect="none" provides static option for reduced motion users', async () => {
      element = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar effect="none"></sando-skeleton-avatar>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('none');

      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('effect')).toBe('none');
    });
  });

  // ============================================
  // ALL SIZES ACCESSIBLE
  // ============================================

  describe('all sizes are accessible', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`${size} size is accessible`, async () => {
        element = await fixture<SandoSkeletonAvatar>(
          html`<sando-skeleton-avatar size="${size}"></sando-skeleton-avatar>`
        );
        await element.updateComplete;

        const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
        expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
        expect(skeleton?.getAttribute('shape')).toBe('circular');

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
        element = await fixture<SandoSkeletonAvatar>(
          html`<sando-skeleton-avatar effect="${effect}"></sando-skeleton-avatar>`
        );
        await element.updateComplete;

        const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
        expect(skeleton?.getAttribute('aria-hidden')).toBe('true');

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
