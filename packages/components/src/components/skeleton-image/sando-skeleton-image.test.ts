/**
 * Unit tests for sando-skeleton-image component
 */

import { fixture, expect, html } from '@open-wc/testing';
import './sando-skeleton-image.js';
import type { SandoSkeletonImage } from './sando-skeleton-image.js';
import type { SandoSkeleton } from '../skeleton/sando-skeleton.js';

describe('sando-skeleton-image', () => {
  describe('rendering', () => {
    it('renders with default props', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      expect(el).to.exist;
      expect(el.shadowRoot).to.exist;
    });

    it('renders with default ratio (16/9)', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      expect(el.ratio).to.equal('16/9');
    });

    it('renders with default width (100%)', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      expect(el.width).to.equal('100%');
    });

    it('renders with default effect (shimmer)', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      expect(el.effect).to.equal('shimmer');
    });

    it('renders with undefined height by default', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      expect(el.height).to.be.undefined;
    });
  });

  describe('aspect ratio variants', () => {
    it('renders 1/1 ratio correctly', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="1/1"></sando-skeleton-image>`
      );
      expect(el.ratio).to.equal('1/1');
      expect(el.getAttribute('ratio')).to.equal('1/1');
    });

    it('renders 4/3 ratio correctly', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="4/3"></sando-skeleton-image>`
      );
      expect(el.ratio).to.equal('4/3');
      expect(el.getAttribute('ratio')).to.equal('4/3');
    });

    it('renders 16/9 ratio correctly', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="16/9"></sando-skeleton-image>`
      );
      expect(el.ratio).to.equal('16/9');
      expect(el.getAttribute('ratio')).to.equal('16/9');
    });

    it('renders 21/9 ratio correctly', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="21/9"></sando-skeleton-image>`
      );
      expect(el.ratio).to.equal('21/9');
      expect(el.getAttribute('ratio')).to.equal('21/9');
    });
  });

  describe('fixed height', () => {
    it('respects fixed height prop', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image height="200px"></sando-skeleton-image>`
      );
      expect(el.height).to.equal('200px');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.height).to.equal('200px');
    });

    it('fixed height overrides aspect ratio', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="1/1" height="150px"></sando-skeleton-image>`
      );

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      // When height is provided, it should use that value, not 100% from aspect ratio
      expect(skeleton.height).to.equal('150px');
    });
  });

  describe('width prop', () => {
    it('respects width prop', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image width="300px"></sando-skeleton-image>`
      );
      expect(el.width).to.equal('300px');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.width).to.equal('300px');
    });

    it('respects percentage width', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image width="50%"></sando-skeleton-image>`
      );
      expect(el.width).to.equal('50%');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.width).to.equal('50%');
    });
  });

  describe('rounded shape', () => {
    it('uses rounded shape for the inner skeleton', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.shape).to.equal('rounded');
    });
  });

  describe('effect variants', () => {
    it('respects shimmer effect', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="shimmer"></sando-skeleton-image>`
      );
      expect(el.effect).to.equal('shimmer');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.effect).to.equal('shimmer');
    });

    it('respects pulse effect', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="pulse"></sando-skeleton-image>`
      );
      expect(el.effect).to.equal('pulse');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.effect).to.equal('pulse');
    });

    it('respects none effect', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="none"></sando-skeleton-image>`
      );
      expect(el.effect).to.equal('none');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.effect).to.equal('none');
    });
  });

  describe('attributes', () => {
    it('reflects ratio attribute', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="4/3"></sando-skeleton-image>`
      );
      expect(el.getAttribute('ratio')).to.equal('4/3');
    });

    it('reflects effect attribute', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="pulse"></sando-skeleton-image>`
      );
      expect(el.getAttribute('effect')).to.equal('pulse');
    });
  });

  describe('dynamic updates', () => {
    it('updates ratio dynamically', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="16/9"></sando-skeleton-image>`
      );
      expect(el.ratio).to.equal('16/9');

      el.ratio = '1/1';
      await el.updateComplete;
      expect(el.ratio).to.equal('1/1');
      expect(el.getAttribute('ratio')).to.equal('1/1');
    });

    it('updates width dynamically', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image width="100%"></sando-skeleton-image>`
      );
      expect(el.width).to.equal('100%');

      el.width = '50%';
      await el.updateComplete;
      expect(el.width).to.equal('50%');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.width).to.equal('50%');
    });

    it('updates height dynamically', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      expect(el.height).to.be.undefined;

      el.height = '200px';
      await el.updateComplete;
      expect(el.height).to.equal('200px');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.height).to.equal('200px');
    });

    it('updates effect dynamically', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="shimmer"></sando-skeleton-image>`
      );
      expect(el.effect).to.equal('shimmer');

      el.effect = 'pulse';
      await el.updateComplete;
      expect(el.effect).to.equal('pulse');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.effect).to.equal('pulse');
    });
  });
});
