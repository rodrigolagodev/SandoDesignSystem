/**
 * Unit tests for sando-skeleton-stack component
 */

import { fixture, expect, html } from '@open-wc/testing';
import { SandoSkeletonStack } from './sando-skeleton-stack.js';
import './sando-skeleton-stack.js';

describe('sando-skeleton-stack', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with default props', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack></sando-skeleton-stack>`
    );

    expect(el).to.exist;
    expect(el).to.be.instanceOf(SandoSkeletonStack);
  });

  it('renders with slot content', async () => {
    const el = await fixture<SandoSkeletonStack>(html`
      <sando-skeleton-stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </sando-skeleton-stack>
    `);

    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).to.exist;

    const assignedNodes = slot?.assignedNodes({ flatten: true }) ?? [];
    const elementNodes = assignedNodes.filter((node) => node.nodeType === Node.ELEMENT_NODE);
    expect(elementNodes.length).to.equal(2);
  });

  it('should be defined as a custom element', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack></sando-skeleton-stack>`
    );

    expect(el.tagName.toLowerCase()).to.equal('sando-skeleton-stack');
    expect(customElements.get('sando-skeleton-stack')).to.exist;
  });

  // ============================================
  // GAP PROPERTY
  // ============================================

  it('has gap="md" by default', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack></sando-skeleton-stack>`
    );

    expect(el.gap).to.equal('md');
  });

  it('applies gap="xs" attribute', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack gap="xs"></sando-skeleton-stack>`
    );

    expect(el.gap).to.equal('xs');
    expect(el.hasAttribute('gap')).to.be.true;
    expect(el.getAttribute('gap')).to.equal('xs');
  });

  it('applies gap="sm" attribute', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack gap="sm"></sando-skeleton-stack>`
    );

    expect(el.gap).to.equal('sm');
    expect(el.getAttribute('gap')).to.equal('sm');
  });

  it('applies gap="md" attribute', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack gap="md"></sando-skeleton-stack>`
    );

    expect(el.gap).to.equal('md');
    expect(el.getAttribute('gap')).to.equal('md');
  });

  it('applies gap="lg" attribute', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack gap="lg"></sando-skeleton-stack>`
    );

    expect(el.gap).to.equal('lg');
    expect(el.getAttribute('gap')).to.equal('lg');
  });

  it('updates gap via property', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack></sando-skeleton-stack>`
    );

    el.gap = 'lg';
    await el.updateComplete;

    expect(el.getAttribute('gap')).to.equal('lg');
  });

  // ============================================
  // ALIGN PROPERTY
  // ============================================

  it('has align="stretch" by default', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack></sando-skeleton-stack>`
    );

    expect(el.align).to.equal('stretch');
  });

  it('applies align="start" attribute', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack align="start"></sando-skeleton-stack>`
    );

    expect(el.align).to.equal('start');
    expect(el.getAttribute('align')).to.equal('start');
  });

  it('applies align="center" attribute', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack align="center"></sando-skeleton-stack>`
    );

    expect(el.align).to.equal('center');
    expect(el.getAttribute('align')).to.equal('center');
  });

  it('applies align="end" attribute', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack align="end"></sando-skeleton-stack>`
    );

    expect(el.align).to.equal('end');
    expect(el.getAttribute('align')).to.equal('end');
  });

  it('applies align="stretch" attribute', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack align="stretch"></sando-skeleton-stack>`
    );

    expect(el.align).to.equal('stretch');
    expect(el.getAttribute('align')).to.equal('stretch');
  });

  it('updates align via property', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack></sando-skeleton-stack>`
    );

    el.align = 'center';
    await el.updateComplete;

    expect(el.getAttribute('align')).to.equal('center');
  });

  // ============================================
  // COMPOSITION
  // ============================================

  it('works with skeleton elements', async () => {
    await import('../skeleton/sando-skeleton-text.js');

    const el = await fixture<SandoSkeletonStack>(html`
      <sando-skeleton-stack gap="sm">
        <sando-skeleton-text></sando-skeleton-text>
        <sando-skeleton-text width="80%"></sando-skeleton-text>
        <sando-skeleton-text width="60%"></sando-skeleton-text>
      </sando-skeleton-stack>
    `);

    const slot = el.shadowRoot?.querySelector('slot');
    const assignedNodes = slot?.assignedNodes({ flatten: true }) ?? [];
    const skeletons = assignedNodes.filter(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node as Element).tagName.toLowerCase() === 'sando-skeleton-text'
    );

    expect(skeletons.length).to.equal(3);
  });

  // ============================================
  // FLAVOR SUPPORT
  // ============================================

  it('supports flavor property from mixin', async () => {
    const el = await fixture<SandoSkeletonStack>(
      html`<sando-skeleton-stack flavor="kawaii"></sando-skeleton-stack>`
    );

    expect(el.flavor).to.equal('kawaii');
    expect(el.getAttribute('flavor')).to.equal('kawaii');
  });
});
