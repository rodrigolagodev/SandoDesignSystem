/**
 * Unit tests for sando-skeleton-media-card component
 */

import { fixture, expect, html } from '@open-wc/testing';
import './sando-skeleton-media-card.js';
import type { SandoSkeletonMediaCard } from './sando-skeleton-media-card.js';

describe('sando-skeleton-media-card', () => {
  describe('default rendering', () => {
    it('renders with default props', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      expect(el).to.exist;
      expect(el.imageRatio).to.equal('16/9');
      expect(el.showDescription).to.be.true;
      expect(el.descriptionLines).to.equal(2);
      expect(el.showActions).to.be.true;
    });

    it('renders skeleton composer', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
      expect(composer).to.exist;
    });

    it('renders skeleton stack', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      const stack = el.shadowRoot?.querySelector('sando-skeleton-stack');
      expect(stack).to.exist;
    });

    it('renders image skeleton', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image).to.exist;
    });

    it('renders title skeleton', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      const textSkeletons = el.shadowRoot?.querySelectorAll(
        ':scope > sando-skeleton-stack > sando-skeleton-text, sando-skeleton-composer > sando-skeleton-stack > sando-skeleton-text'
      );
      expect(textSkeletons?.length).to.be.greaterThanOrEqual(1);
    });
  });

  describe('imageRatio prop', () => {
    it('uses default 16/9 ratio', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image?.getAttribute('ratio')).to.equal('16/9');
    });

    it('applies 1/1 ratio', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card image-ratio="1/1"></sando-skeleton-media-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image?.getAttribute('ratio')).to.equal('1/1');
    });

    it('applies 4/3 ratio', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card image-ratio="4/3"></sando-skeleton-media-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image?.getAttribute('ratio')).to.equal('4/3');
    });

    it('applies 21/9 ratio', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card image-ratio="21/9"></sando-skeleton-media-card>`
      );
      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      expect(image?.getAttribute('ratio')).to.equal('21/9');
    });
  });

  describe('showDescription prop', () => {
    it('shows description by default', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      // Description stack exists with text skeletons
      const stacks = el.shadowRoot?.querySelectorAll('sando-skeleton-stack');
      // Main stack + description stack = at least 2
      expect(stacks?.length).to.be.greaterThanOrEqual(2);
    });

    it('hides description when show-description is false', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      el.showDescription = false;
      await el.updateComplete;
      // Count nested stacks - should be fewer without description
      const stacks = el.shadowRoot?.querySelectorAll('sando-skeleton-stack');
      expect(stacks?.length).to.equal(1); // Only main stack
    });

    it('shows description when show-description is true', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card show-description></sando-skeleton-media-card>`
      );
      const stacks = el.shadowRoot?.querySelectorAll('sando-skeleton-stack');
      expect(stacks?.length).to.be.greaterThanOrEqual(2);
    });
  });

  describe('descriptionLines prop', () => {
    it('renders default 2 description lines', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      // Find inner stack with description lines (has size="sm" text)
      const smTexts = el.shadowRoot?.querySelectorAll('sando-skeleton-text[size="sm"]');
      expect(smTexts?.length).to.equal(2);
    });

    it('renders custom number of description lines', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card description-lines="3"></sando-skeleton-media-card>`
      );
      const smTexts = el.shadowRoot?.querySelectorAll('sando-skeleton-text[size="sm"]');
      expect(smTexts?.length).to.equal(3);
    });

    it('renders 1 description line', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card description-lines="1"></sando-skeleton-media-card>`
      );
      const smTexts = el.shadowRoot?.querySelectorAll('sando-skeleton-text[size="sm"]');
      expect(smTexts?.length).to.equal(1);
    });
  });

  describe('showActions prop', () => {
    it('shows actions by default', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      const buttons = el.shadowRoot?.querySelectorAll('sando-skeleton-button');
      expect(buttons?.length).to.equal(2);
    });

    it('hides actions when show-actions is false', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      el.showActions = false;
      await el.updateComplete;
      const buttons = el.shadowRoot?.querySelectorAll('sando-skeleton-button');
      expect(buttons?.length).to.equal(0);
    });

    it('shows actions when show-actions is true', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card show-actions></sando-skeleton-media-card>`
      );
      const buttons = el.shadowRoot?.querySelectorAll('sando-skeleton-button');
      expect(buttons?.length).to.equal(2);
    });
  });

  describe('combined configurations', () => {
    it('renders full media card with all options', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card
          image-ratio="4/3"
          show-description
          description-lines="3"
          show-actions
        ></sando-skeleton-media-card>`
      );

      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      const smTexts = el.shadowRoot?.querySelectorAll('sando-skeleton-text[size="sm"]');
      const buttons = el.shadowRoot?.querySelectorAll('sando-skeleton-button');

      expect(image?.getAttribute('ratio')).to.equal('4/3');
      expect(smTexts?.length).to.equal(3);
      expect(buttons?.length).to.equal(2);
    });

    it('renders minimal media card', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      el.showDescription = false;
      el.showActions = false;
      await el.updateComplete;

      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      const smTexts = el.shadowRoot?.querySelectorAll('sando-skeleton-text[size="sm"]');
      const buttons = el.shadowRoot?.querySelectorAll('sando-skeleton-button');

      expect(image).to.exist;
      expect(smTexts?.length).to.equal(0);
      expect(buttons?.length).to.equal(0);
    });

    it('renders podcast-style card with square image', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card
          image-ratio="1/1"
          description-lines="1"
        ></sando-skeleton-media-card>`
      );

      const image = el.shadowRoot?.querySelector('sando-skeleton-image');
      const smTexts = el.shadowRoot?.querySelectorAll('sando-skeleton-text[size="sm"]');

      expect(image?.getAttribute('ratio')).to.equal('1/1');
      expect(smTexts?.length).to.equal(1);
    });
  });

  describe('accessibility', () => {
    it('renders with skeleton-composer for accessibility attributes', async () => {
      const el = await fixture<SandoSkeletonMediaCard>(
        html`<sando-skeleton-media-card></sando-skeleton-media-card>`
      );
      const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
      expect(composer).to.exist;
      // Composer provides role="status", aria-busy, aria-label
    });
  });
});
