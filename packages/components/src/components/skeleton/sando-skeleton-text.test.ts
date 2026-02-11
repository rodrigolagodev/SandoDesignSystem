/**
 * Unit tests for sando-skeleton-text component
 */

import { fixture, html } from '@open-wc/testing';
import './sando-skeleton-text.js';
import type { SandoSkeletonText } from './sando-skeleton-text.js';
import type { SandoSkeleton } from './sando-skeleton.js';

describe('sando-skeleton-text', () => {
  let element: SandoSkeletonText;

  /**
   * Helper to get the inner sando-skeleton element
   */
  const getInnerSkeleton = (): SandoSkeleton | null => {
    return element.shadowRoot?.querySelector('sando-skeleton') ?? null;
  };

  // ============================================
  // RENDERING TESTS
  // ============================================

  describe('rendering', () => {
    it('renders with default props', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      expect(element).toBeDefined();
      expect(element.size).toBe('md');
      expect(element.width).toBe('auto');
      expect(element.effect).toBe('shimmer');
    });

    it('renders inner sando-skeleton element', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      const skeleton = getInnerSkeleton();
      expect(skeleton).not.toBeNull();
    });

    it('passes shape="text" to inner skeleton', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      const skeleton = getInnerSkeleton();
      expect(skeleton?.shape).toBe('text');
    });
  });

  // ============================================
  // SIZE TESTS
  // ============================================

  describe('sizes', () => {
    it('renders size="sm" with token-based height', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text size="sm"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.size).toBe('sm');
      expect(element.getAttribute('size')).toBe('sm');

      const skeleton = getInnerSkeleton();
      expect(skeleton?.height).toBe('var(--sando-skeleton-size-text-height-sm)');
    });

    it('renders size="md" with token-based height', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text size="md"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.size).toBe('md');
      expect(element.getAttribute('size')).toBe('md');

      const skeleton = getInnerSkeleton();
      expect(skeleton?.height).toBe('var(--sando-skeleton-size-text-height-md)');
    });

    it('renders size="lg" with token-based height', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text size="lg"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.size).toBe('lg');
      expect(element.getAttribute('size')).toBe('lg');

      const skeleton = getInnerSkeleton();
      expect(skeleton?.height).toBe('var(--sando-skeleton-size-text-height-lg)');
    });

    it('reflects size property to attribute', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      element.size = 'lg';
      await element.updateComplete;

      expect(element.getAttribute('size')).toBe('lg');
    });
  });

  // ============================================
  // WIDTH TESTS
  // ============================================

  describe('width', () => {
    it('width="auto" sets host to 100% and inner skeleton to 100%', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text width="auto"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.width).toBe('auto');
      // 'auto' now sets host width to 100% via inline style
      expect(element.style.width).toBe('100%');

      // Inner skeleton always fills the host
      const skeleton = getInnerSkeleton();
      expect(skeleton?.width).toBe('100%');
    });

    it('width="full" sets host to 100% and inner skeleton to 100%', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text width="full"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.width).toBe('full');
      // 'full' also sets host width to 100% via inline style
      expect(element.style.width).toBe('100%');

      // Inner skeleton always fills the host
      const skeleton = getInnerSkeleton();
      expect(skeleton?.width).toBe('100%');
    });

    it('custom width percentage applies to host, inner skeleton fills host', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text width="80%"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.width).toBe('80%');
      expect(element.style.width).toBe('80%');

      // Inner skeleton always fills the host (100%)
      const skeleton = getInnerSkeleton();
      expect(skeleton?.width).toBe('100%');
    });

    it('custom width pixels applies to host, inner skeleton fills host', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text width="200px"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.width).toBe('200px');
      expect(element.style.width).toBe('200px');

      // Inner skeleton always fills the host (100%)
      const skeleton = getInnerSkeleton();
      expect(skeleton?.width).toBe('100%');
    });

    it('custom width em units applies to host, inner skeleton fills host', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text width="15em"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.width).toBe('15em');
      expect(element.style.width).toBe('15em');

      // Inner skeleton always fills the host (100%)
      const skeleton = getInnerSkeleton();
      expect(skeleton?.width).toBe('100%');
    });

    it('updates width dynamically from auto to custom', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      element.width = '50%';
      await element.updateComplete;

      expect(element.style.width).toBe('50%');

      // Inner skeleton always fills the host (100%)
      const skeleton = getInnerSkeleton();
      expect(skeleton?.width).toBe('100%');
    });

    it('reflects width property to attribute', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      element.width = 'full';
      await element.updateComplete;

      expect(element.getAttribute('width')).toBe('full');
    });
  });

  // ============================================
  // EFFECT TESTS
  // ============================================

  describe('effects', () => {
    it('passes shimmer effect to base skeleton', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text effect="shimmer"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('shimmer');

      const skeleton = getInnerSkeleton();
      expect(skeleton?.effect).toBe('shimmer');
    });

    it('passes pulse effect to base skeleton', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text effect="pulse"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('pulse');

      const skeleton = getInnerSkeleton();
      expect(skeleton?.effect).toBe('pulse');
    });

    it('passes none effect to base skeleton', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text effect="none"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('none');

      const skeleton = getInnerSkeleton();
      expect(skeleton?.effect).toBe('none');
    });

    it('reflects effect property to attribute', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      element.effect = 'pulse';
      await element.updateComplete;

      expect(element.getAttribute('effect')).toBe('pulse');
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================

  describe('accessibility', () => {
    it('has aria-hidden inherited from base skeleton', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      const skeleton = getInnerSkeleton();
      await skeleton?.updateComplete;

      const innerSkeleton = skeleton?.shadowRoot?.querySelector('.skeleton');
      expect(innerSkeleton?.getAttribute('aria-hidden')).toBe('true');
    });

    it('has role="presentation" inherited from base skeleton', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      const skeleton = getInnerSkeleton();
      await skeleton?.updateComplete;

      const innerSkeleton = skeleton?.shadowRoot?.querySelector('.skeleton');
      expect(innerSkeleton?.getAttribute('role')).toBe('presentation');
    });
  });

  // ============================================
  // COMBINED PROPS TESTS
  // ============================================

  describe('combined props', () => {
    it('handles all props together', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text size="lg" width="75%" effect="pulse"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.size).toBe('lg');
      expect(element.width).toBe('75%');
      expect(element.effect).toBe('pulse');
      expect(element.style.width).toBe('75%');

      const skeleton = getInnerSkeleton();
      expect(skeleton?.shape).toBe('text');
      expect(skeleton?.height).toBe('var(--sando-skeleton-size-text-height-lg)');
      expect(skeleton?.width).toBe('100%'); // Inner skeleton always fills host
      expect(skeleton?.effect).toBe('pulse');
    });

    it('updates multiple props dynamically', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      element.size = 'sm';
      element.width = '60%';
      element.effect = 'none';
      await element.updateComplete;

      expect(element.style.width).toBe('60%');

      const skeleton = getInnerSkeleton();
      expect(skeleton?.height).toBe('var(--sando-skeleton-size-text-height-sm)');
      expect(skeleton?.width).toBe('100%'); // Inner skeleton always fills host
      expect(skeleton?.effect).toBe('none');
    });
  });

  // ============================================
  // SNAPSHOT TESTS
  // ============================================

  describe('snapshots', () => {
    it('matches snapshot for default state', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('matches snapshot for size="sm"', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text size="sm"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('matches snapshot for size="lg"', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text size="lg"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('matches snapshot for custom width', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text width="80%"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    it('matches snapshot for pulse effect', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text effect="pulse"></sando-skeleton-text>`
      );
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });
  });

  // ============================================
  // EDGE CASES
  // ============================================

  describe('edge cases', () => {
    it('handles rapid size changes', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);

      element.size = 'sm';
      element.size = 'lg';
      element.size = 'md';
      await element.updateComplete;

      expect(element.size).toBe('md');

      const skeleton = getInnerSkeleton();
      expect(skeleton?.height).toBe('var(--sando-skeleton-size-text-height-md)');
    });

    it('handles rapid effect changes', async () => {
      element = await fixture<SandoSkeletonText>(html`<sando-skeleton-text></sando-skeleton-text>`);

      element.effect = 'pulse';
      element.effect = 'none';
      element.effect = 'shimmer';
      await element.updateComplete;

      expect(element.effect).toBe('shimmer');

      const skeleton = getInnerSkeleton();
      expect(skeleton?.effect).toBe('shimmer');
    });

    it('always passes shape="text" regardless of other props', async () => {
      element = await fixture<SandoSkeletonText>(
        html`<sando-skeleton-text size="lg" width="50%" effect="pulse"></sando-skeleton-text>`
      );
      await element.updateComplete;

      const skeleton = getInnerSkeleton();
      expect(skeleton?.shape).toBe('text');
    });
  });
});
