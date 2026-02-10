/**
 * Unit tests for sando-skeleton component
 */

import { fixture, html } from '@open-wc/testing';
import './sando-skeleton.js';
import type { SandoSkeleton } from './sando-skeleton.js';

describe('sando-skeleton', () => {
  let element: SandoSkeleton;

  // ============================================
  // RENDERING TESTS
  // ============================================

  describe('rendering', () => {
    it('renders with default props', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      expect(element).toBeDefined();
      expect(element.shape).toBe('text');
      expect(element.effect).toBe('shimmer');
      expect(element.width).toBe('100%');
      expect(element.height).toBe('1em');
    });

    it('renders skeleton container', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');
      expect(skeleton).toBeDefined();
      expect(skeleton).not.toBeNull();
    });

    it('renders shimmer element when effect is shimmer', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton effect="shimmer"></sando-skeleton>`
      );
      await element.updateComplete;

      const shimmer = element.shadowRoot?.querySelector('.skeleton__shimmer');
      expect(shimmer).toBeDefined();
      expect(shimmer).not.toBeNull();
    });

    it('does not render shimmer element when effect is pulse', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton effect="pulse"></sando-skeleton>`
      );
      await element.updateComplete;

      const shimmer = element.shadowRoot?.querySelector('.skeleton__shimmer');
      expect(shimmer).toBeNull();
    });

    it('does not render shimmer element when effect is none', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton effect="none"></sando-skeleton>`);
      await element.updateComplete;

      const shimmer = element.shadowRoot?.querySelector('.skeleton__shimmer');
      expect(shimmer).toBeNull();
    });
  });

  // ============================================
  // SHAPE TESTS
  // ============================================

  describe('shapes', () => {
    it('applies text shape attribute', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton shape="text"></sando-skeleton>`);
      await element.updateComplete;

      expect(element.shape).toBe('text');
      expect(element.getAttribute('shape')).toBe('text');
    });

    it('applies circular shape attribute', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton shape="circular"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.shape).toBe('circular');
      expect(element.getAttribute('shape')).toBe('circular');
    });

    it('applies rectangular shape attribute', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton shape="rectangular"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.shape).toBe('rectangular');
      expect(element.getAttribute('shape')).toBe('rectangular');
    });

    it('applies rounded shape attribute', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton shape="rounded"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.shape).toBe('rounded');
      expect(element.getAttribute('shape')).toBe('rounded');
    });

    it('reflects shape property to attribute', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      element.shape = 'circular';
      await element.updateComplete;

      expect(element.getAttribute('shape')).toBe('circular');
    });
  });

  // ============================================
  // EFFECT TESTS
  // ============================================

  describe('effects', () => {
    it('applies shimmer effect attribute', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton effect="shimmer"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('shimmer');
      expect(element.getAttribute('effect')).toBe('shimmer');
    });

    it('applies pulse effect attribute', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton effect="pulse"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('pulse');
      expect(element.getAttribute('effect')).toBe('pulse');
    });

    it('applies none effect attribute', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton effect="none"></sando-skeleton>`);
      await element.updateComplete;

      expect(element.effect).toBe('none');
      expect(element.getAttribute('effect')).toBe('none');
    });

    it('reflects effect property to attribute', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      element.effect = 'pulse';
      await element.updateComplete;

      expect(element.getAttribute('effect')).toBe('pulse');
    });
  });

  // ============================================
  // DIMENSION TESTS
  // ============================================

  describe('dimensions', () => {
    it('applies custom width', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton width="200px"></sando-skeleton>`);
      await element.updateComplete;

      expect(element.width).toBe('200px');
      const skeleton = element.shadowRoot?.querySelector('.skeleton') as HTMLElement;
      expect(skeleton.style.getPropertyValue('--skeleton-width')).toBe('200px');
    });

    it('applies custom height', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton height="24px"></sando-skeleton>`);
      await element.updateComplete;

      expect(element.height).toBe('24px');
      const skeleton = element.shadowRoot?.querySelector('.skeleton') as HTMLElement;
      expect(skeleton.style.getPropertyValue('--skeleton-height')).toBe('24px');
    });

    it('applies both width and height', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton width="100px" height="50px"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.width).toBe('100px');
      expect(element.height).toBe('50px');
    });

    it('accepts percentage values', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton width="50%" height="2em"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.width).toBe('50%');
      expect(element.height).toBe('2em');
    });

    it('updates dimensions dynamically', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      element.width = '300px';
      element.height = '48px';
      await element.updateComplete;

      expect(element.width).toBe('300px');
      expect(element.height).toBe('48px');
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================

  describe('accessibility', () => {
    it('has aria-hidden="true"', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');
      expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
    });

    it('has role="presentation"', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');
      expect(skeleton?.getAttribute('role')).toBe('presentation');
    });

    it('skeleton is not focusable', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');
      expect(skeleton?.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // PARTS TESTS
  // ============================================

  describe('parts', () => {
    it('exposes skeleton part', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('[part="skeleton"]');
      expect(skeleton).not.toBeNull();
    });

    it('exposes shimmer part when effect is shimmer', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton effect="shimmer"></sando-skeleton>`
      );
      await element.updateComplete;

      const shimmer = element.shadowRoot?.querySelector('[part="shimmer"]');
      expect(shimmer).not.toBeNull();
    });
  });

  // ============================================
  // FLAVOR SYSTEM TESTS
  // ============================================

  describe('flavor system', () => {
    it('allows explicit flavor to be set', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton flavor="strawberry"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.flavor).toBe('strawberry');
      expect(element.effectiveFlavor).toBe('strawberry');
    });

    it('uses default flavor when none specified', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      expect(element.effectiveFlavor).toBe('original');
    });

    it('reflects flavor attribute', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);
      await element.updateComplete;

      element.flavor = 'chocolate';
      await element.updateComplete;

      expect(element.getAttribute('flavor')).toBe('chocolate');
    });
  });

  // ============================================
  // SNAPSHOT TESTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot for text shape', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton shape="text"></sando-skeleton>`);
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('matches snapshot for circular shape', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton shape="circular" width="40px" height="40px"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('matches snapshot for rectangular shape', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton shape="rectangular" width="200px" height="100px"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('matches snapshot for rounded shape', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton shape="rounded" width="100%" height="80px"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('matches snapshot for pulse effect', async () => {
      element = await fixture<SandoSkeleton>(
        html`<sando-skeleton effect="pulse"></sando-skeleton>`
      );
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('matches snapshot for none effect', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton effect="none"></sando-skeleton>`);
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });
  });

  // ============================================
  // EDGE CASES
  // ============================================

  describe('edge cases', () => {
    it('handles multiple rapid property changes', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);

      element.shape = 'circular';
      element.shape = 'rectangular';
      element.shape = 'rounded';
      element.shape = 'text';
      await element.updateComplete;

      expect(element.shape).toBe('text');
      expect(element.getAttribute('shape')).toBe('text');
    });

    it('handles multiple rapid effect changes', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);

      element.effect = 'pulse';
      element.effect = 'none';
      element.effect = 'shimmer';
      await element.updateComplete;

      expect(element.effect).toBe('shimmer');
      expect(element.getAttribute('effect')).toBe('shimmer');
    });

    it('maintains accessibility after property updates', async () => {
      element = await fixture<SandoSkeleton>(html`<sando-skeleton></sando-skeleton>`);

      element.shape = 'circular';
      element.effect = 'pulse';
      element.width = '64px';
      element.height = '64px';
      await element.updateComplete;

      const skeleton = element.shadowRoot?.querySelector('.skeleton');
      expect(skeleton?.getAttribute('aria-hidden')).toBe('true');
      expect(skeleton?.getAttribute('role')).toBe('presentation');
    });
  });
});
