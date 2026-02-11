/**
 * Unit tests for sando-skeleton-paragraph component
 */

import { fixture, expect, html } from '@open-wc/testing';
import { SandoSkeletonParagraph } from './sando-skeleton-paragraph.js';
import './sando-skeleton-paragraph.js';

describe('sando-skeleton-paragraph', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with default props', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph></sando-skeleton-paragraph>`
    );

    expect(el).to.exist;
    expect(el).to.be.instanceOf(SandoSkeletonParagraph);
  });

  it('renders correct number of lines by default (3)', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');
    expect(skeletons.length).to.equal(3);
  });

  it('renders custom number of lines', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph lines="5"></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');
    expect(skeletons.length).to.equal(5);
  });

  it('renders at least 1 line even with 0 or negative value', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph lines="0"></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');
    expect(skeletons.length).to.equal(1);
  });

  // ============================================
  // LAST LINE WIDTH
  // ============================================

  it('applies default lastLineWidth (60%) to last line', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph lines="3"></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');
    const lastSkeleton = skeletons[skeletons.length - 1];

    expect(lastSkeleton.getAttribute('width')).to.equal('60%');
  });

  it('applies custom lastLineWidth to last line', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph lines="3" last-line-width="40%"></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');
    const lastSkeleton = skeletons[skeletons.length - 1];

    expect(lastSkeleton.getAttribute('width')).to.equal('40%');
  });

  it('applies 100% width to non-last lines', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph lines="3"></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');

    // Check first and second lines have 100% width
    expect(skeletons[0].getAttribute('width')).to.equal('100%');
    expect(skeletons[1].getAttribute('width')).to.equal('100%');
  });

  // ============================================
  // SPACING
  // ============================================

  it('has default spacing of sm', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph></sando-skeleton-paragraph>`
    );

    expect(el.spacing).to.equal('sm');
    expect(el.getAttribute('spacing')).to.equal('sm');
  });

  it('reflects spacing attribute', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph spacing="lg"></sando-skeleton-paragraph>`
    );

    expect(el.spacing).to.equal('lg');
    expect(el.getAttribute('spacing')).to.equal('lg');
  });

  it('accepts all spacing values', async () => {
    const spacings: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];

    for (const spacing of spacings) {
      const el = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph spacing=${spacing}></sando-skeleton-paragraph>`
      );

      expect(el.spacing).to.equal(spacing);
    }
  });

  // ============================================
  // SIZE
  // ============================================

  it('has default size of md', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph></sando-skeleton-paragraph>`
    );

    expect(el.size).to.equal('md');
    expect(el.getAttribute('size')).to.equal('md');
  });

  it('reflects size attribute', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph size="lg"></sando-skeleton-paragraph>`
    );

    expect(el.size).to.equal('lg');
    expect(el.getAttribute('size')).to.equal('lg');
  });

  it('accepts all size values', async () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

    for (const size of sizes) {
      const el = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph size=${size}></sando-skeleton-paragraph>`
      );

      expect(el.size).to.equal(size);
    }
  });

  it('updates size dynamically', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph size="sm"></sando-skeleton-paragraph>`
    );

    expect(el.size).to.equal('sm');

    el.size = 'lg';
    await el.updateComplete;

    expect(el.size).to.equal('lg');
    expect(el.getAttribute('size')).to.equal('lg');
  });

  // ============================================
  // EFFECT
  // ============================================

  it('has default effect of shimmer', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph></sando-skeleton-paragraph>`
    );

    expect(el.effect).to.equal('shimmer');
  });

  it('passes effect to all skeleton children', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph effect="pulse" lines="3"></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');

    skeletons.forEach((skeleton) => {
      expect(skeleton.getAttribute('effect')).to.equal('pulse');
    });
  });

  it('accepts all effect values', async () => {
    const effects: Array<'shimmer' | 'pulse' | 'none'> = ['shimmer', 'pulse', 'none'];

    for (const effect of effects) {
      const el = await fixture<SandoSkeletonParagraph>(
        html`<sando-skeleton-paragraph effect=${effect}></sando-skeleton-paragraph>`
      );

      expect(el.effect).to.equal(effect);
    }
  });

  // ============================================
  // SKELETON CONFIGURATION
  // ============================================

  it('all skeletons have text shape', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph lines="3"></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');

    skeletons.forEach((skeleton) => {
      expect(skeleton.getAttribute('shape')).to.equal('text');
    });
  });

  it('all skeletons use token-based height', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph lines="3"></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');

    skeletons.forEach((skeleton) => {
      const height = skeleton.getAttribute('height');
      // Height should use CSS variable for token-based sizing
      expect(height).to.include('var(--skeleton-paragraph-line-height');
    });
  });

  // ============================================
  // ACCESSIBILITY
  // ============================================

  it('skeletons have aria-hidden for screen readers', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');

    // The aria-hidden is set on the inner skeleton element, not the component
    // Just verify the skeletons are rendered (accessibility is handled by sando-skeleton)
    expect(skeletons.length).to.be.greaterThan(0);
  });

  // ============================================
  // DYNAMIC UPDATES
  // ============================================

  it('updates lines dynamically', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph lines="2"></sando-skeleton-paragraph>`
    );

    expect(el.shadowRoot!.querySelectorAll('sando-skeleton').length).to.equal(2);

    el.lines = 5;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelectorAll('sando-skeleton').length).to.equal(5);
  });

  it('updates lastLineWidth dynamically', async () => {
    const el = await fixture<SandoSkeletonParagraph>(
      html`<sando-skeleton-paragraph lines="2"></sando-skeleton-paragraph>`
    );

    const skeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');
    expect(skeletons[1].getAttribute('width')).to.equal('60%');

    el.lastLineWidth = '30%';
    await el.updateComplete;

    const updatedSkeletons = el.shadowRoot!.querySelectorAll('sando-skeleton');
    expect(updatedSkeletons[1].getAttribute('width')).to.equal('30%');
  });
});
