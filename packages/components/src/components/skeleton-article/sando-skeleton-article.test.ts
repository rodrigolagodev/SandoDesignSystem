/**
 * Unit tests for sando-skeleton-article component
 */

import { fixture, expect, html } from '@open-wc/testing';
import './sando-skeleton-article.js';
import type { SandoSkeletonArticle } from './sando-skeleton-article.js';

describe('sando-skeleton-article', () => {
  describe('default rendering', () => {
    it('renders with default props', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      expect(el).to.exist;
      expect(el.showMeta).to.be.true;
      expect(el.paragraphs).to.equal(3);
      expect(el.titleWidth).to.equal('70%');
    });

    it('renders skeleton composer', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
      expect(composer).to.exist;
    });

    it('renders skeleton stack', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      const stack = el.shadowRoot?.querySelector('sando-skeleton-stack');
      expect(stack).to.exist;
    });

    it('renders title skeleton', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      const textSkeletons = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
      const titleSkeleton = textSkeletons?.[0];
      expect(titleSkeleton).to.exist;
      expect(titleSkeleton?.getAttribute('size')).to.equal('lg');
      expect(titleSkeleton?.getAttribute('width')).to.equal('70%');
    });

    it('renders paragraphs', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      const paragraphs = el.shadowRoot?.querySelectorAll('sando-skeleton-paragraph');
      expect(paragraphs?.length).to.equal(3);
    });
  });

  describe('showMeta prop', () => {
    it('shows meta row by default', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      const row = el.shadowRoot?.querySelector('sando-skeleton-row');
      expect(row).to.exist;
    });

    it('hides meta row when show-meta is false', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      el.showMeta = false;
      await el.updateComplete;
      const row = el.shadowRoot?.querySelector('sando-skeleton-row');
      expect(row).to.not.exist;
    });

    it('shows meta row when show-meta is true', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article show-meta></sando-skeleton-article>`
      );
      const row = el.shadowRoot?.querySelector('sando-skeleton-row');
      expect(row).to.exist;
    });

    it('renders date and author text in meta row', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      const row = el.shadowRoot?.querySelector('sando-skeleton-row');
      const metaTexts = row?.querySelectorAll('sando-skeleton-text');
      expect(metaTexts?.length).to.equal(2);
    });
  });

  describe('paragraphs prop', () => {
    it('renders default 3 paragraphs', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      const paragraphs = el.shadowRoot?.querySelectorAll('sando-skeleton-paragraph');
      expect(paragraphs?.length).to.equal(3);
    });

    it('renders custom number of paragraphs', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article paragraphs="5"></sando-skeleton-article>`
      );
      const paragraphs = el.shadowRoot?.querySelectorAll('sando-skeleton-paragraph');
      expect(paragraphs?.length).to.equal(5);
    });

    it('renders 1 paragraph', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article paragraphs="1"></sando-skeleton-article>`
      );
      const paragraphs = el.shadowRoot?.querySelectorAll('sando-skeleton-paragraph');
      expect(paragraphs?.length).to.equal(1);
    });

    it('handles paragraphs value of 0', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article paragraphs="0"></sando-skeleton-article>`
      );
      const paragraphs = el.shadowRoot?.querySelectorAll('sando-skeleton-paragraph');
      expect(paragraphs?.length).to.equal(0);
    });
  });

  describe('titleWidth prop', () => {
    it('uses default width of 70%', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      const textSkeletons = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
      const titleSkeleton = textSkeletons?.[0];
      expect(titleSkeleton?.getAttribute('width')).to.equal('70%');
    });

    it('applies custom title width', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article title-width="80%"></sando-skeleton-article>`
      );
      const textSkeletons = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
      const titleSkeleton = textSkeletons?.[0];
      expect(titleSkeleton?.getAttribute('width')).to.equal('80%');
    });

    it('handles pixel width', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article title-width="400px"></sando-skeleton-article>`
      );
      const textSkeletons = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
      const titleSkeleton = textSkeletons?.[0];
      expect(titleSkeleton?.getAttribute('width')).to.equal('400px');
    });
  });

  describe('combined configurations', () => {
    it('renders article with custom settings', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article
          paragraphs="4"
          title-width="90%"
          show-meta
        ></sando-skeleton-article>`
      );

      const paragraphs = el.shadowRoot?.querySelectorAll('sando-skeleton-paragraph');
      const textSkeletons = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
      const row = el.shadowRoot?.querySelector('sando-skeleton-row');

      expect(paragraphs?.length).to.equal(4);
      expect(textSkeletons?.[0]?.getAttribute('width')).to.equal('90%');
      expect(row).to.exist;
    });

    it('renders minimal article without meta', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      el.showMeta = false;
      el.paragraphs = 1;
      await el.updateComplete;

      const paragraphs = el.shadowRoot?.querySelectorAll('sando-skeleton-paragraph');
      const row = el.shadowRoot?.querySelector('sando-skeleton-row');

      expect(paragraphs?.length).to.equal(1);
      expect(row).to.not.exist;
    });
  });

  describe('accessibility', () => {
    it('renders with skeleton-composer for accessibility attributes', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
      expect(composer).to.exist;
      // Composer provides role="status", aria-busy, aria-label
    });
  });
});
