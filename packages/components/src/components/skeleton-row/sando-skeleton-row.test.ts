/**
 * Unit tests for sando-skeleton-row component
 */

import { fixture, expect, html } from '@open-wc/testing';
import { SandoSkeletonRow } from './sando-skeleton-row.js';
import './sando-skeleton-row.js';

describe('sando-skeleton-row', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with default props', async () => {
    const el = await fixture<SandoSkeletonRow>(html`<sando-skeleton-row></sando-skeleton-row>`);

    expect(el).to.exist;
    expect(el).to.be.instanceOf(SandoSkeletonRow);
  });

  it('renders with slot content', async () => {
    const el = await fixture<SandoSkeletonRow>(html`
      <sando-skeleton-row>
        <div>Item 1</div>
        <div>Item 2</div>
      </sando-skeleton-row>
    `);

    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).to.exist;

    const assignedNodes = slot?.assignedNodes({ flatten: true }) ?? [];
    const elementNodes = assignedNodes.filter((node) => node.nodeType === Node.ELEMENT_NODE);
    expect(elementNodes.length).to.equal(2);
  });

  it('should be defined as a custom element', async () => {
    const el = await fixture<SandoSkeletonRow>(html`<sando-skeleton-row></sando-skeleton-row>`);

    expect(el.tagName.toLowerCase()).to.equal('sando-skeleton-row');
    expect(customElements.get('sando-skeleton-row')).to.exist;
  });

  // ============================================
  // GAP PROPERTY
  // ============================================

  it('has gap="md" by default', async () => {
    const el = await fixture<SandoSkeletonRow>(html`<sando-skeleton-row></sando-skeleton-row>`);

    expect(el.gap).to.equal('md');
  });

  it('applies gap="xs" attribute', async () => {
    const el = await fixture<SandoSkeletonRow>(
      html`<sando-skeleton-row gap="xs"></sando-skeleton-row>`
    );

    expect(el.gap).to.equal('xs');
    expect(el.hasAttribute('gap')).to.be.true;
    expect(el.getAttribute('gap')).to.equal('xs');
  });

  it('applies gap="sm" attribute', async () => {
    const el = await fixture<SandoSkeletonRow>(
      html`<sando-skeleton-row gap="sm"></sando-skeleton-row>`
    );

    expect(el.gap).to.equal('sm');
    expect(el.getAttribute('gap')).to.equal('sm');
  });

  it('applies gap="lg" attribute', async () => {
    const el = await fixture<SandoSkeletonRow>(
      html`<sando-skeleton-row gap="lg"></sando-skeleton-row>`
    );

    expect(el.gap).to.equal('lg');
    expect(el.getAttribute('gap')).to.equal('lg');
  });

  it('updates gap via property', async () => {
    const el = await fixture<SandoSkeletonRow>(html`<sando-skeleton-row></sando-skeleton-row>`);

    el.gap = 'lg';
    await el.updateComplete;

    expect(el.getAttribute('gap')).to.equal('lg');
  });

  // ============================================
  // ALIGN PROPERTY
  // ============================================

  it('has align="center" by default', async () => {
    const el = await fixture<SandoSkeletonRow>(html`<sando-skeleton-row></sando-skeleton-row>`);

    expect(el.align).to.equal('center');
  });

  it('applies align="start" attribute', async () => {
    const el = await fixture<SandoSkeletonRow>(
      html`<sando-skeleton-row align="start"></sando-skeleton-row>`
    );

    expect(el.align).to.equal('start');
    expect(el.getAttribute('align')).to.equal('start');
  });

  it('applies align="end" attribute', async () => {
    const el = await fixture<SandoSkeletonRow>(
      html`<sando-skeleton-row align="end"></sando-skeleton-row>`
    );

    expect(el.align).to.equal('end');
    expect(el.getAttribute('align')).to.equal('end');
  });

  it('applies align="stretch" attribute', async () => {
    const el = await fixture<SandoSkeletonRow>(
      html`<sando-skeleton-row align="stretch"></sando-skeleton-row>`
    );

    expect(el.align).to.equal('stretch');
    expect(el.getAttribute('align')).to.equal('stretch');
  });

  it('updates align via property', async () => {
    const el = await fixture<SandoSkeletonRow>(html`<sando-skeleton-row></sando-skeleton-row>`);

    el.align = 'end';
    await el.updateComplete;

    expect(el.getAttribute('align')).to.equal('end');
  });

  // ============================================
  // COMPOSITION
  // ============================================

  it('works with skeleton elements', async () => {
    await import('../skeleton/sando-skeleton.js');

    const el = await fixture<SandoSkeletonRow>(html`
      <sando-skeleton-row gap="md" align="center">
        <sando-skeleton shape="circular" width="40px" height="40px"></sando-skeleton>
        <sando-skeleton shape="text" width="200px" height="1em"></sando-skeleton>
      </sando-skeleton-row>
    `);

    const slot = el.shadowRoot?.querySelector('slot');
    const assignedNodes = slot?.assignedNodes({ flatten: true }) ?? [];
    const skeletons = assignedNodes.filter(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node as Element).tagName.toLowerCase() === 'sando-skeleton'
    );

    expect(skeletons.length).to.equal(2);
  });

  // ============================================
  // FLAVOR SUPPORT
  // ============================================

  it('supports flavor property from mixin', async () => {
    const el = await fixture<SandoSkeletonRow>(
      html`<sando-skeleton-row flavor="kawaii"></sando-skeleton-row>`
    );

    expect(el.flavor).to.equal('kawaii');
    expect(el.getAttribute('flavor')).to.equal('kawaii');
  });
});
