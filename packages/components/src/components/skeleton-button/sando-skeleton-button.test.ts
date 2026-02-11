/**
 * Unit tests for sando-skeleton-button component
 */

import { fixture, html } from '@open-wc/testing';
import './sando-skeleton-button.js';
import type { SandoSkeletonButton } from './sando-skeleton-button.js';

describe('sando-skeleton-button', () => {
  let element: SandoSkeletonButton;

  beforeEach(async () => {
    element = await fixture(html`<sando-skeleton-button></sando-skeleton-button>`);
  });

  describe('rendering', () => {
    it('renders with default props', async () => {
      expect(element).to.exist;
      expect(element.size).to.equal('md');
      expect(element.width).to.equal('auto');
      expect(element.effect).to.equal('shimmer');
    });

    it('renders sando-skeleton internally', async () => {
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton).to.exist;
    });

    it('uses rounded shape', async () => {
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('shape')).to.equal('rounded');
    });
  });

  describe('size prop', () => {
    it('renders small size correctly', async () => {
      element = await fixture(html`<sando-skeleton-button size="sm"></sando-skeleton-button>`);
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(element.size).to.equal('sm');
      expect(skeleton?.getAttribute('height')).to.include('--sando-skeleton-size-button-height-sm');
      // Width uses hardcoded values (not tokens - internal values)
      expect(skeleton?.getAttribute('width')).to.equal('4rem');
    });

    it('renders medium size correctly', async () => {
      element = await fixture(html`<sando-skeleton-button size="md"></sando-skeleton-button>`);
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(element.size).to.equal('md');
      expect(skeleton?.getAttribute('height')).to.include('--sando-skeleton-size-button-height-md');
      // Width uses hardcoded values (not tokens - internal values)
      expect(skeleton?.getAttribute('width')).to.equal('6rem');
    });

    it('renders large size correctly', async () => {
      element = await fixture(html`<sando-skeleton-button size="lg"></sando-skeleton-button>`);
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(element.size).to.equal('lg');
      expect(skeleton?.getAttribute('height')).to.include('--sando-skeleton-size-button-height-lg');
      // Width uses hardcoded values (not tokens - internal values)
      expect(skeleton?.getAttribute('width')).to.equal('8rem');
    });

    it('reflects size attribute', async () => {
      element = await fixture(html`<sando-skeleton-button size="lg"></sando-skeleton-button>`);
      expect(element.getAttribute('size')).to.equal('lg');
    });
  });

  describe('width prop', () => {
    it('uses auto width by default (hardcoded values)', async () => {
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      // Default size is 'md', which uses 6rem width
      expect(skeleton?.getAttribute('width')).to.equal('6rem');
    });

    it('uses 100% for full width', async () => {
      element = await fixture(html`<sando-skeleton-button width="full"></sando-skeleton-button>`);
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('width')).to.equal('100%');
    });

    it('applies block display for full width', async () => {
      element = await fixture(html`<sando-skeleton-button width="full"></sando-skeleton-button>`);
      expect(element.getAttribute('width')).to.equal('full');
      // The component should have the width="full" attribute which triggers :host([width="full"]) styles
    });

    it('uses custom width string', async () => {
      element = await fixture(html`<sando-skeleton-button width="200px"></sando-skeleton-button>`);
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('width')).to.equal('200px');
    });

    it('supports percentage width', async () => {
      element = await fixture(html`<sando-skeleton-button width="50%"></sando-skeleton-button>`);
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('width')).to.equal('50%');
    });
  });

  describe('effect prop', () => {
    it('uses shimmer effect by default', async () => {
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('effect')).to.equal('shimmer');
    });

    it('applies pulse effect', async () => {
      element = await fixture(html`<sando-skeleton-button effect="pulse"></sando-skeleton-button>`);
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('effect')).to.equal('pulse');
    });

    it('applies none effect', async () => {
      element = await fixture(html`<sando-skeleton-button effect="none"></sando-skeleton-button>`);
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('effect')).to.equal('none');
    });
  });

  describe('combinations', () => {
    it('handles size and full width together', async () => {
      element = await fixture(
        html`<sando-skeleton-button size="lg" width="full"></sando-skeleton-button>`
      );
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('height')).to.include('--sando-skeleton-size-button-height-lg');
      expect(skeleton?.getAttribute('width')).to.equal('100%');
    });

    it('handles size and custom width together', async () => {
      element = await fixture(
        html`<sando-skeleton-button size="sm" width="150px"></sando-skeleton-button>`
      );
      const skeleton = element.shadowRoot?.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('height')).to.include('--sando-skeleton-size-button-height-sm');
      expect(skeleton?.getAttribute('width')).to.equal('150px');
    });
  });
});
