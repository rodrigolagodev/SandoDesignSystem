/**
 * Unit tests for sando-skeleton-image component
 */

import { fixture, expect, html } from '@open-wc/testing';
import './sando-skeleton-image.js';
import type { SandoSkeletonImage } from './sando-skeleton-image.js';

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

    it('renders inner .skeleton div in shadow root', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      const skeletonDiv = el.shadowRoot!.querySelector('.skeleton');
      expect(skeletonDiv).to.exist;
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

    it('applies 1/1 aspect-ratio to host style', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="1/1"></sando-skeleton-image>`
      );
      expect(el.style.getPropertyValue('aspect-ratio')).to.equal('1 / 1');
    });

    it('renders 4/3 ratio correctly', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="4/3"></sando-skeleton-image>`
      );
      expect(el.ratio).to.equal('4/3');
      expect(el.getAttribute('ratio')).to.equal('4/3');
    });

    it('applies 4/3 aspect-ratio to host style', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="4/3"></sando-skeleton-image>`
      );
      expect(el.style.getPropertyValue('aspect-ratio')).to.equal('4 / 3');
    });

    it('renders 16/9 ratio correctly', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="16/9"></sando-skeleton-image>`
      );
      expect(el.ratio).to.equal('16/9');
      expect(el.getAttribute('ratio')).to.equal('16/9');
    });

    it('applies 16/9 aspect-ratio to host style', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="16/9"></sando-skeleton-image>`
      );
      expect(el.style.getPropertyValue('aspect-ratio')).to.equal('16 / 9');
    });

    it('renders 21/9 ratio correctly', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="21/9"></sando-skeleton-image>`
      );
      expect(el.ratio).to.equal('21/9');
      expect(el.getAttribute('ratio')).to.equal('21/9');
    });

    it('applies 21/9 aspect-ratio to host style', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="21/9"></sando-skeleton-image>`
      );
      expect(el.style.getPropertyValue('aspect-ratio')).to.equal('21 / 9');
    });
  });

  describe('fixed height', () => {
    it('respects fixed height prop', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image height="200px"></sando-skeleton-image>`
      );
      expect(el.height).to.equal('200px');
      expect(el.style.height).to.equal('200px');
    });

    it('fixed height overrides aspect ratio (aspect-ratio removed from host)', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="1/1" height="150px"></sando-skeleton-image>`
      );
      // When height is set, aspect-ratio must be removed from inline style
      expect(el.style.height).to.equal('150px');
      expect(el.style.getPropertyValue('aspect-ratio')).to.equal('');
    });
  });

  describe('width prop', () => {
    it('respects width prop', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image width="300px"></sando-skeleton-image>`
      );
      expect(el.width).to.equal('300px');
      expect(el.style.width).to.equal('300px');
    });

    it('respects percentage width', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image width="50%"></sando-skeleton-image>`
      );
      expect(el.width).to.equal('50%');
      expect(el.style.width).to.equal('50%');
    });
  });

  describe('rounded shape', () => {
    it('renders .skeleton div with correct structure for border-radius token', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      const skeletonDiv = el.shadowRoot!.querySelector('.skeleton') as HTMLElement;
      expect(skeletonDiv).to.exist;
      // border-radius is applied via CSS custom property (--sando-skeleton-borderRadius-rounded).
      // jsdom doesn't resolve Shadow DOM styles via getComputedStyle, so we verify
      // the div has the expected CSS part attribute that ties it to the token.
      expect(skeletonDiv.getAttribute('part')).to.equal('skeleton');
      // Also confirm the shimmer child exists as a sibling structure
      // (both share the .skeleton container that owns the border-radius rule)
      const shimmerDiv = skeletonDiv.querySelector('.skeleton__shimmer');
      expect(shimmerDiv).to.exist;
    });
  });

  describe('effect variants', () => {
    it('respects shimmer effect on host property', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="shimmer"></sando-skeleton-image>`
      );
      expect(el.effect).to.equal('shimmer');
    });

    it('renders .skeleton__shimmer div when effect is shimmer', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="shimmer"></sando-skeleton-image>`
      );
      const shimmer = el.shadowRoot!.querySelector('.skeleton__shimmer');
      expect(shimmer).to.exist;
    });

    it('respects pulse effect on host property', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="pulse"></sando-skeleton-image>`
      );
      expect(el.effect).to.equal('pulse');
    });

    it('does NOT render .skeleton__shimmer div when effect is pulse', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="pulse"></sando-skeleton-image>`
      );
      const shimmer = el.shadowRoot!.querySelector('.skeleton__shimmer');
      expect(shimmer).to.not.exist;
    });

    it('respects none effect on host property', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="none"></sando-skeleton-image>`
      );
      expect(el.effect).to.equal('none');
    });

    it('does NOT render .skeleton__shimmer div when effect is none', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="none"></sando-skeleton-image>`
      );
      const shimmer = el.shadowRoot!.querySelector('.skeleton__shimmer');
      expect(shimmer).to.not.exist;
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
    it('updates ratio dynamically and reflects to attribute', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="16/9"></sando-skeleton-image>`
      );
      expect(el.ratio).to.equal('16/9');

      el.ratio = '1/1';
      await el.updateComplete;
      expect(el.ratio).to.equal('1/1');
      expect(el.getAttribute('ratio')).to.equal('1/1');
    });

    it('updates aspect-ratio on host style when ratio changes', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image ratio="16/9"></sando-skeleton-image>`
      );

      el.ratio = '1/1';
      await el.updateComplete;
      expect(el.style.getPropertyValue('aspect-ratio')).to.equal('1 / 1');
    });

    it('updates width dynamically', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image width="100%"></sando-skeleton-image>`
      );
      expect(el.width).to.equal('100%');

      el.width = '50%';
      await el.updateComplete;
      expect(el.width).to.equal('50%');
      expect(el.style.width).to.equal('50%');
    });

    it('updates height dynamically and removes aspect-ratio', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image></sando-skeleton-image>`
      );
      expect(el.height).to.be.undefined;

      el.height = '200px';
      await el.updateComplete;
      expect(el.height).to.equal('200px');
      expect(el.style.height).to.equal('200px');
      expect(el.style.getPropertyValue('aspect-ratio')).to.equal('');
    });

    it('updates effect dynamically and reflects to attribute', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="shimmer"></sando-skeleton-image>`
      );
      expect(el.effect).to.equal('shimmer');

      el.effect = 'pulse';
      await el.updateComplete;
      expect(el.effect).to.equal('pulse');
      expect(el.getAttribute('effect')).to.equal('pulse');
    });

    it('removes .skeleton__shimmer when effect changes from shimmer to pulse', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="shimmer"></sando-skeleton-image>`
      );
      expect(el.shadowRoot!.querySelector('.skeleton__shimmer')).to.exist;

      el.effect = 'pulse';
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('.skeleton__shimmer')).to.not.exist;
    });

    it('adds .skeleton__shimmer when effect changes from pulse to shimmer', async () => {
      const el = await fixture<SandoSkeletonImage>(
        html`<sando-skeleton-image effect="pulse"></sando-skeleton-image>`
      );
      expect(el.shadowRoot!.querySelector('.skeleton__shimmer')).to.not.exist;

      el.effect = 'shimmer';
      await el.updateComplete;
      expect(el.shadowRoot!.querySelector('.skeleton__shimmer')).to.exist;
    });
  });
});
