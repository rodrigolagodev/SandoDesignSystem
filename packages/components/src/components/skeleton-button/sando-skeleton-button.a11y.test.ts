/**
 * Accessibility tests for sando-skeleton-button component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-button.js';
import type { SandoSkeletonButton } from './sando-skeleton-button.js';

describe('sando-skeleton-button accessibility', () => {
  let element: SandoSkeletonButton;

  // ============================================
  // AXE TESTS
  // ============================================

  describe('axe violations', () => {
    it('passes axe for default skeleton button', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button></sando-skeleton-button>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for sm size', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button size="sm"></sando-skeleton-button>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for md size', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button size="md"></sando-skeleton-button>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for lg size', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button size="lg"></sando-skeleton-button>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for full width', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button width="full"></sando-skeleton-button>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for icon-only variant', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button icon-only></sando-skeleton-button>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button effect="shimmer"></sando-skeleton-button>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for pulse effect', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button effect="pulse"></sando-skeleton-button>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button effect="none"></sando-skeleton-button>`
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
    it('has aria-hidden="true" on inner skeleton presentation div', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button></sando-skeleton-button>`
      );
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('sando-skeleton') as
        | (Element & { updateComplete?: Promise<boolean> })
        | null;
      await skeleton?.updateComplete;
      const innerDiv = skeleton?.shadowRoot?.querySelector('.skeleton');
      expect(innerDiv?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ============================================
  // DECORATIVE ELEMENT TESTS
  // ============================================

  describe('decorative element behavior', () => {
    it('skeleton button is properly marked as decorative via inner skeleton', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button></sando-skeleton-button>`
      );
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('sando-skeleton') as
        | (Element & { updateComplete?: Promise<boolean> })
        | null;
      await skeleton?.updateComplete;
      const innerDiv = skeleton?.shadowRoot?.querySelector('.skeleton');
      expect(innerDiv?.getAttribute('aria-hidden')).toBe('true');
    });

    it('host element is not focusable', async () => {
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button></sando-skeleton-button>`
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
      element = await fixture<SandoSkeletonButton>(
        html`<sando-skeleton-button effect="none"></sando-skeleton-button>`
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
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`${size} size is accessible`, async () => {
        element = await fixture<SandoSkeletonButton>(
          html`<sando-skeleton-button size="${size}"></sando-skeleton-button>`
        );
        await element.updateComplete;

        const skeleton = element.shadowRoot?.querySelector('sando-skeleton') as
          | (Element & { updateComplete?: Promise<boolean> })
          | null;
        await skeleton?.updateComplete;
        const innerDiv = skeleton?.shadowRoot?.querySelector('.skeleton');
        expect(innerDiv?.getAttribute('aria-hidden')).toBe('true');

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
        element = await fixture<SandoSkeletonButton>(
          html`<sando-skeleton-button effect="${effect}"></sando-skeleton-button>`
        );
        await element.updateComplete;

        const skeleton = element.shadowRoot?.querySelector('sando-skeleton') as
          | (Element & { updateComplete?: Promise<boolean> })
          | null;
        await skeleton?.updateComplete;
        const innerDiv = skeleton?.shadowRoot?.querySelector('.skeleton');
        expect(innerDiv?.getAttribute('aria-hidden')).toBe('true');

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
