/**
 * Unit tests for sando-skeleton-list-item component
 */

import { fixture, expect, html } from '@open-wc/testing';
import { SandoSkeletonListItem } from './sando-skeleton-list-item.js';
import './sando-skeleton-list-item.js';

describe('sando-skeleton-list-item', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with default props', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item></sando-skeleton-list-item>`
    );

    expect(el).to.exist;
    expect(el).to.be.instanceOf(SandoSkeletonListItem);
  });

  it('should be defined as a custom element', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item></sando-skeleton-list-item>`
    );

    expect(el.tagName.toLowerCase()).to.equal('sando-skeleton-list-item');
    expect(customElements.get('sando-skeleton-list-item')).to.exist;
  });

  it('renders skeleton-composer wrapper', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item></sando-skeleton-list-item>`
    );

    const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
    expect(composer).to.exist;
  });

  it('renders skeleton-row for layout', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item></sando-skeleton-list-item>`
    );

    const row = el.shadowRoot?.querySelector('sando-skeleton-row');
    expect(row).to.exist;
    expect(row?.getAttribute('gap')).to.equal('md');
    expect(row?.getAttribute('align')).to.equal('center');
  });

  // ============================================
  // SHOW AVATAR PROPERTY
  // ============================================

  it('has showAvatar=true by default', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item></sando-skeleton-list-item>`
    );

    expect(el.showAvatar).to.be.true;
  });

  it('renders avatar when showAvatar is true', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item show-avatar></sando-skeleton-list-item>`
    );

    const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
    expect(avatar).to.exist;
  });

  it('hides avatar when showAvatar is false', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item .showAvatar=${false}></sando-skeleton-list-item>`
    );

    const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
    expect(avatar).to.not.exist;
  });

  // ============================================
  // SHOW ACTION PROPERTY
  // ============================================

  it('has showAction=false by default', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item></sando-skeleton-list-item>`
    );

    expect(el.showAction).to.be.false;
  });

  it('hides action button by default', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item></sando-skeleton-list-item>`
    );

    const button = el.shadowRoot?.querySelector('sando-skeleton-button');
    expect(button).to.not.exist;
  });

  it('shows action button when showAction is true', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item show-action></sando-skeleton-list-item>`
    );

    const button = el.shadowRoot?.querySelector('sando-skeleton-button');
    expect(button).to.exist;
    expect(button?.getAttribute('size')).to.equal('sm');
  });

  // ============================================
  // LINES PROPERTY
  // ============================================

  it('has lines=2 by default', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item></sando-skeleton-list-item>`
    );

    expect(el.lines).to.equal(2);
  });

  it('renders 2 text lines by default', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item></sando-skeleton-list-item>`
    );

    const textElements = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
    expect(textElements?.length).to.equal(2);
  });

  it('renders 1 text line when lines=1', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item lines="1"></sando-skeleton-list-item>`
    );

    const textElements = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
    expect(textElements?.length).to.equal(1);
  });

  it('renders 3 text lines when lines=3', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item lines="3"></sando-skeleton-list-item>`
    );

    const textElements = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
    expect(textElements?.length).to.equal(3);
  });

  it('clamps lines to minimum of 1', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item lines="0"></sando-skeleton-list-item>`
    );

    const textElements = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
    expect(textElements?.length).to.equal(1);
  });

  it('clamps lines to maximum of 3', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item lines="5"></sando-skeleton-list-item>`
    );

    const textElements = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
    expect(textElements?.length).to.equal(3);
  });

  // ============================================
  // AVATAR SIZE PROPERTY
  // ============================================

  it('has avatarSize="md" by default', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item></sando-skeleton-list-item>`
    );

    expect(el.avatarSize).to.equal('md');
  });

  it('applies avatarSize to skeleton-avatar', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item avatar-size="lg"></sando-skeleton-list-item>`
    );

    const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
    expect(avatar?.getAttribute('size')).to.equal('lg');
  });

  it('applies avatarSize="sm" attribute', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item avatar-size="sm"></sando-skeleton-list-item>`
    );

    expect(el.avatarSize).to.equal('sm');
    const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
    expect(avatar?.getAttribute('size')).to.equal('sm');
  });

  // ============================================
  // TEXT WIDTHS
  // ============================================

  it('renders text with correct widths', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item lines="3"></sando-skeleton-list-item>`
    );

    const textElements = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
    expect(textElements?.[0]?.getAttribute('width')).to.equal('70%');
    expect(textElements?.[1]?.getAttribute('width')).to.equal('50%');
    expect(textElements?.[2]?.getAttribute('width')).to.equal('40%');
  });

  it('applies smaller size to secondary text lines', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item lines="3"></sando-skeleton-list-item>`
    );

    const textElements = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
    // First line uses default size (md)
    expect(textElements?.[0]?.getAttribute('size')).to.equal('md');
    // Secondary lines have sm size
    expect(textElements?.[1]?.getAttribute('size')).to.equal('sm');
    expect(textElements?.[2]?.getAttribute('size')).to.equal('sm');
  });

  // ============================================
  // FLAVOR SUPPORT
  // ============================================

  it('supports flavor property from mixin', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item flavor="kawaii"></sando-skeleton-list-item>`
    );

    expect(el.flavor).to.equal('kawaii');
    expect(el.getAttribute('flavor')).to.equal('kawaii');
  });

  // ============================================
  // COMPOSITION
  // ============================================

  it('renders all parts in full configuration', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item
        show-action
        lines="3"
        avatar-size="lg"
      ></sando-skeleton-list-item>`
    );

    expect(el.shadowRoot?.querySelector('sando-skeleton-composer')).to.exist;
    expect(el.shadowRoot?.querySelector('sando-skeleton-row')).to.exist;
    expect(el.shadowRoot?.querySelector('sando-skeleton-stack')).to.exist;
    expect(el.shadowRoot?.querySelector('sando-skeleton-avatar')).to.exist;
    expect(el.shadowRoot?.querySelector('sando-skeleton-button')).to.exist;
    expect(el.shadowRoot?.querySelectorAll('sando-skeleton-text')?.length).to.equal(3);
  });

  it('renders minimal configuration', async () => {
    const el = await fixture<SandoSkeletonListItem>(
      html`<sando-skeleton-list-item .showAvatar=${false} lines="1"></sando-skeleton-list-item>`
    );

    expect(el.shadowRoot?.querySelector('sando-skeleton-avatar')).to.not.exist;
    expect(el.shadowRoot?.querySelector('sando-skeleton-button')).to.not.exist;
    expect(el.shadowRoot?.querySelectorAll('sando-skeleton-text')?.length).to.equal(1);
  });
});
