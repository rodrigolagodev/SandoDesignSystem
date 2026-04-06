/**
 * Unit tests for sando-skeleton-composer component
 */

import { fixture, expect, html } from '@open-wc/testing';
import { SandoSkeletonComposer } from './sando-skeleton-composer.js';
import './sando-skeleton-composer.js';

describe('sando-skeleton-composer', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with default props', async () => {
    const el = await fixture<SandoSkeletonComposer>(
      html`<sando-skeleton-composer></sando-skeleton-composer>`
    );

    expect(el).to.exist;
    expect(el).to.be.instanceOf(SandoSkeletonComposer);
  });

  it('renders with slot content', async () => {
    const el = await fixture<SandoSkeletonComposer>(html`
      <sando-skeleton-composer>
        <div>Item 1</div>
        <div>Item 2</div>
      </sando-skeleton-composer>
    `);

    const slot = el.shadowRoot?.querySelector('slot');
    expect(slot).to.exist;

    const assignedNodes = slot?.assignedNodes({ flatten: true }) ?? [];
    const elementNodes = assignedNodes.filter((node) => node.nodeType === Node.ELEMENT_NODE);
    expect(elementNodes.length).to.equal(2);
  });

  it('should be defined as a custom element', async () => {
    const el = await fixture<SandoSkeletonComposer>(
      html`<sando-skeleton-composer></sando-skeleton-composer>`
    );

    expect(el.tagName.toLowerCase()).to.equal('sando-skeleton-composer');
    expect(customElements.get('sando-skeleton-composer')).to.exist;
  });

  // ============================================
  // STAGGER PROP — no stagger (default)
  // ============================================

  it('has no stagger by default', async () => {
    const el = await fixture<SandoSkeletonComposer>(
      html`<sando-skeleton-composer></sando-skeleton-composer>`
    );

    expect(el.stagger).to.be.undefined;
  });

  it('does not set delay on children when stagger is not defined', async () => {
    await import('../skeleton/sando-skeleton-text.js');

    const el = await fixture<SandoSkeletonComposer>(html`
      <sando-skeleton-composer>
        <sando-skeleton-text></sando-skeleton-text>
        <sando-skeleton-text></sando-skeleton-text>
      </sando-skeleton-composer>
    `);

    const children = el.querySelectorAll('sando-skeleton-text');
    children.forEach((child) => {
      expect((child as HTMLElement).style.getPropertyValue('--skeleton-animation-delay')).to.equal(
        ''
      );
    });
  });

  // ============================================
  // STAGGER PROP — with stagger
  // ============================================

  it('applies stagger delays to children when stagger is set', async () => {
    await import('../skeleton/sando-skeleton-text.js');

    const el = await fixture<SandoSkeletonComposer>(html`
      <sando-skeleton-composer stagger="50ms">
        <sando-skeleton-text></sando-skeleton-text>
        <sando-skeleton-text></sando-skeleton-text>
        <sando-skeleton-text></sando-skeleton-text>
      </sando-skeleton-composer>
    `);

    const children = Array.from(el.querySelectorAll('sando-skeleton-text'));
    expect(
      (children[0] as HTMLElement).style.getPropertyValue('--skeleton-animation-delay')
    ).to.equal('0ms');
    expect(
      (children[1] as HTMLElement).style.getPropertyValue('--skeleton-animation-delay')
    ).to.equal('50ms');
    expect(
      (children[2] as HTMLElement).style.getPropertyValue('--skeleton-animation-delay')
    ).to.equal('100ms');
  });

  it('removes delays when stagger is cleared', async () => {
    await import('../skeleton/sando-skeleton-text.js');

    const el = await fixture<SandoSkeletonComposer>(html`
      <sando-skeleton-composer stagger="50ms">
        <sando-skeleton-text></sando-skeleton-text>
        <sando-skeleton-text></sando-skeleton-text>
      </sando-skeleton-composer>
    `);

    // Confirm delays were applied
    const children = Array.from(el.querySelectorAll('sando-skeleton-text'));
    expect(
      (children[0] as HTMLElement).style.getPropertyValue('--skeleton-animation-delay')
    ).to.equal('0ms');

    // Clear stagger
    el.stagger = undefined;
    await el.updateComplete;

    children.forEach((child) => {
      expect((child as HTMLElement).style.getPropertyValue('--skeleton-animation-delay')).to.equal(
        ''
      );
    });
  });

  // ============================================
  // STAGGER PARSING
  // ============================================

  it('parses stagger value in ms (50ms)', async () => {
    await import('../skeleton/sando-skeleton-text.js');

    const el = await fixture<SandoSkeletonComposer>(html`
      <sando-skeleton-composer stagger="50ms">
        <sando-skeleton-text></sando-skeleton-text>
        <sando-skeleton-text></sando-skeleton-text>
      </sando-skeleton-composer>
    `);

    const children = Array.from(el.querySelectorAll('sando-skeleton-text'));
    expect(
      (children[1] as HTMLElement).style.getPropertyValue('--skeleton-animation-delay')
    ).to.equal('50ms');
  });

  it('parses stagger value in seconds (0.1s)', async () => {
    await import('../skeleton/sando-skeleton-text.js');

    const el = await fixture<SandoSkeletonComposer>(html`
      <sando-skeleton-composer stagger="0.1s">
        <sando-skeleton-text></sando-skeleton-text>
        <sando-skeleton-text></sando-skeleton-text>
      </sando-skeleton-composer>
    `);

    const children = Array.from(el.querySelectorAll('sando-skeleton-text'));
    // 0.1s = 100ms, so second child gets 100ms delay
    expect(
      (children[1] as HTMLElement).style.getPropertyValue('--skeleton-animation-delay')
    ).to.equal('100ms');
  });

  it('parses stagger value without unit (100)', async () => {
    await import('../skeleton/sando-skeleton-text.js');

    const el = await fixture<SandoSkeletonComposer>(html`
      <sando-skeleton-composer stagger="100">
        <sando-skeleton-text></sando-skeleton-text>
        <sando-skeleton-text></sando-skeleton-text>
      </sando-skeleton-composer>
    `);

    const children = Array.from(el.querySelectorAll('sando-skeleton-text'));
    // No unit defaults to ms, so second child gets 100ms delay
    expect(
      (children[1] as HTMLElement).style.getPropertyValue('--skeleton-animation-delay')
    ).to.equal('100ms');
  });

  // ============================================
  // DYNAMIC CHILDREN — observer
  // ============================================

  it('applies stagger delays to dynamically added children', async () => {
    await import('../skeleton/sando-skeleton-text.js');

    const el = await fixture<SandoSkeletonComposer>(html`
      <sando-skeleton-composer stagger="50ms">
        <sando-skeleton-text></sando-skeleton-text>
      </sando-skeleton-composer>
    `);

    // Add a second child dynamically
    const newChild = document.createElement('sando-skeleton-text');
    el.appendChild(newChild);

    // Wait for the MutationObserver callback to fire
    await new Promise((resolve) => setTimeout(resolve, 0));

    const children = Array.from(el.querySelectorAll('sando-skeleton-text'));
    expect(children.length).to.equal(2);
    expect(
      (children[1] as HTMLElement).style.getPropertyValue('--skeleton-animation-delay')
    ).to.equal('50ms');
  });

  // ============================================
  // CLEANUP — disconnectedCallback
  // ============================================

  it('disconnects observer on disconnectedCallback', async () => {
    const el = await fixture<SandoSkeletonComposer>(
      html`<sando-skeleton-composer></sando-skeleton-composer>`
    );

    // Spy on the observer's disconnect method
    const observer = (el as unknown as { _observer?: MutationObserver })._observer;
    expect(observer).to.exist;

    let disconnectCalled = false;
    const originalDisconnect = observer!.disconnect.bind(observer);
    observer!.disconnect = () => {
      disconnectCalled = true;
      originalDisconnect();
    };

    el.remove();

    expect(disconnectCalled).to.be.true;
  });

  // ============================================
  // FLAVOR SUPPORT
  // ============================================

  it('supports flavor property from mixin', async () => {
    const el = await fixture<SandoSkeletonComposer>(
      html`<sando-skeleton-composer flavor="kawaii"></sando-skeleton-composer>`
    );

    expect(el.flavor).to.equal('kawaii');
    expect(el.getAttribute('flavor')).to.equal('kawaii');
  });
});
