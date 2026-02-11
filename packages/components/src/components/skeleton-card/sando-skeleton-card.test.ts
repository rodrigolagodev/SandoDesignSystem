/**
 * Unit tests for sando-skeleton-card component
 */

import { fixture, expect, html } from '@open-wc/testing';
import './sando-skeleton-card.js';
import type { SandoSkeletonCard } from './sando-skeleton-card.js';

describe('sando-skeleton-card', () => {
  describe('default rendering', () => {
    it('renders with default props', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      expect(el).to.exist;
      expect(el.showAvatar).to.be.true;
      expect(el.showImage).to.be.false;
      expect(el.showActions).to.be.false;
      expect(el.lines).to.equal(3);
      expect(el.imageRatio).to.equal('16/9');
    });

    it('renders skeleton composer', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
      expect(composer).to.exist;
    });

    it('renders skeleton stack', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      const stack = el.shadowRoot?.querySelector('sando-skeleton-stack');
      expect(stack).to.exist;
    });

    it('renders header row', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      const row = el.shadowRoot?.querySelector('sando-skeleton-row');
      expect(row).to.exist;
    });

    it('renders paragraph', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      const paragraph = el.shadowRoot?.querySelector('sando-skeleton-paragraph');
      expect(paragraph).to.exist;
    });
  });

  describe('showAvatar prop', () => {
    it('shows avatar by default', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar).to.exist;
    });

    it('hides avatar when show-avatar is false', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      el.showAvatar = false;
      await el.updateComplete;
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar).to.not.exist;
    });

    it('shows avatar when show-avatar is true', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-avatar></sando-skeleton-card>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar).to.exist;
    });
  });

  describe('showImage prop', () => {
    it('hides image by default', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image).to.not.exist;
    });

    it('shows image when show-image is true', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-image></sando-skeleton-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image).to.exist;
    });

    it('hides image when show-image is false', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card ?show-image=${false}></sando-skeleton-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image).to.not.exist;
    });
  });

  describe('showActions prop', () => {
    it('hides actions by default', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      const buttons = el.shadowRoot?.querySelectorAll('sando-skeleton-button');
      expect(buttons?.length).to.equal(0);
    });

    it('shows actions when show-actions is true', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-actions></sando-skeleton-card>`
      );
      const buttons = el.shadowRoot?.querySelectorAll('sando-skeleton-button');
      expect(buttons?.length).to.equal(2);
    });

    it('hides actions when show-actions is false', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card ?show-actions=${false}></sando-skeleton-card>`
      );
      const buttons = el.shadowRoot?.querySelectorAll('sando-skeleton-button');
      expect(buttons?.length).to.equal(0);
    });
  });

  describe('lines prop', () => {
    it('passes lines prop to paragraph', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card lines="5"></sando-skeleton-card>`
      );
      const paragraph = el.shadowRoot?.querySelector('sando-skeleton-paragraph');
      expect(paragraph?.getAttribute('lines')).to.equal('5');
    });

    it('uses default lines value of 3', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      const paragraph = el.shadowRoot?.querySelector('sando-skeleton-paragraph');
      expect(paragraph?.getAttribute('lines')).to.equal('3');
    });

    it('handles lines value of 1', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card lines="1"></sando-skeleton-card>`
      );
      const paragraph = el.shadowRoot?.querySelector('sando-skeleton-paragraph');
      expect(paragraph?.getAttribute('lines')).to.equal('1');
    });
  });

  describe('imageRatio prop', () => {
    it('passes ratio prop to image', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-image image-ratio="4/3"></sando-skeleton-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image?.getAttribute('ratio')).to.equal('4/3');
    });

    it('uses default ratio of 16/9', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-image></sando-skeleton-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image?.getAttribute('ratio')).to.equal('16/9');
    });

    it('handles 1/1 ratio', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-image image-ratio="1/1"></sando-skeleton-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image?.getAttribute('ratio')).to.equal('1/1');
    });

    it('handles 21/9 ratio', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card show-image image-ratio="21/9"></sando-skeleton-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image?.getAttribute('ratio')).to.equal('21/9');
    });
  });

  describe('combined configurations', () => {
    it('renders full card with all options', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card
          show-avatar
          show-image
          show-actions
          lines="4"
          image-ratio="4/3"
        ></sando-skeleton-card>`
      );

      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      const buttons = el.shadowRoot?.querySelectorAll('sando-skeleton-button');
      const paragraph = el.shadowRoot?.querySelector('sando-skeleton-paragraph');

      expect(avatar).to.exist;
      expect(image).to.exist;
      expect(buttons?.length).to.equal(2);
      expect(paragraph?.getAttribute('lines')).to.equal('4');
      expect(image?.getAttribute('ratio')).to.equal('4/3');
    });

    it('renders minimal card without avatar', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      el.showAvatar = false;
      await el.updateComplete;

      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      const buttons = el.shadowRoot?.querySelectorAll('sando-skeleton-button');
      const paragraph = el.shadowRoot?.querySelector('sando-skeleton-paragraph');

      expect(avatar).to.not.exist;
      expect(image).to.not.exist;
      expect(buttons?.length).to.equal(0);
      expect(paragraph).to.exist;
    });
  });

  describe('header text skeletons', () => {
    it('renders header text skeletons', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      const textSkeletons = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
      expect(textSkeletons?.length).to.be.greaterThanOrEqual(2);
    });

    it('has correct widths for header text', async () => {
      const el = await fixture<SandoSkeletonCard>(
        html`<sando-skeleton-card></sando-skeleton-card>`
      );
      const textSkeletons = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
      const firstText = textSkeletons?.[0];
      const secondText = textSkeletons?.[1];

      expect(firstText?.getAttribute('width')).to.equal('60%');
      expect(secondText?.getAttribute('width')).to.equal('40%');
    });
  });
});
