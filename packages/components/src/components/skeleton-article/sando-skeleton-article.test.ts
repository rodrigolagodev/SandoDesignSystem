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
      expect(el.size).to.equal('md');
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
      // Title is now a sando-skeleton with shape="text" for size-responsive heights
      const stack = el.shadowRoot?.querySelector('sando-skeleton-stack');
      const titleSkeleton = stack?.querySelector('sando-skeleton[shape="text"]');
      expect(titleSkeleton).to.exist;
      expect(titleSkeleton?.getAttribute('width')).to.equal('70%');
      // Height uses design tokens for md size (heading-100)
      expect(titleSkeleton?.getAttribute('height')).to.equal('var(--sando-font-size-heading-100)');
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

    it('renders date and author skeletons in meta row', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      const row = el.shadowRoot?.querySelector('sando-skeleton-row');
      // Meta uses sando-skeleton with shape="text" for size-responsive heights
      const metaSkeletons = row?.querySelectorAll('sando-skeleton[shape="text"]');
      expect(metaSkeletons?.length).to.equal(2);
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
      const stack = el.shadowRoot?.querySelector('sando-skeleton-stack');
      const titleSkeleton = stack?.querySelector('sando-skeleton[shape="text"]');
      expect(titleSkeleton?.getAttribute('width')).to.equal('70%');
    });

    it('applies custom title width', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article title-width="80%"></sando-skeleton-article>`
      );
      const stack = el.shadowRoot?.querySelector('sando-skeleton-stack');
      const titleSkeleton = stack?.querySelector('sando-skeleton[shape="text"]');
      expect(titleSkeleton?.getAttribute('width')).to.equal('80%');
    });

    it('handles pixel width', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article title-width="400px"></sando-skeleton-article>`
      );
      const stack = el.shadowRoot?.querySelector('sando-skeleton-stack');
      const titleSkeleton = stack?.querySelector('sando-skeleton[shape="text"]');
      expect(titleSkeleton?.getAttribute('width')).to.equal('400px');
    });
  });

  describe('size prop', () => {
    it('has default size of md', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article></sando-skeleton-article>`
      );
      expect(el.size).to.equal('md');
      expect(el.getAttribute('size')).to.equal('md');
    });

    it('reflects size attribute', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="lg"></sando-skeleton-article>`
      );
      expect(el.size).to.equal('lg');
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('accepts all size values', async () => {
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

      for (const size of sizes) {
        const el = await fixture<SandoSkeletonArticle>(
          html`<sando-skeleton-article size=${size}></sando-skeleton-article>`
        );
        expect(el.size).to.equal(size);
      }
    });

    it('passes size to paragraphs', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="lg"></sando-skeleton-article>`
      );
      const paragraphs = el.shadowRoot?.querySelectorAll('sando-skeleton-paragraph');
      paragraphs?.forEach((paragraph) => {
        expect(paragraph.getAttribute('size')).to.equal('lg');
      });
    });

    it('updates size dynamically', async () => {
      const el = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="sm"></sando-skeleton-article>`
      );
      expect(el.size).to.equal('sm');

      el.size = 'lg';
      await el.updateComplete;

      expect(el.size).to.equal('lg');
      expect(el.getAttribute('size')).to.equal('lg');

      const paragraphs = el.shadowRoot?.querySelectorAll('sando-skeleton-paragraph');
      paragraphs?.forEach((paragraph) => {
        expect(paragraph.getAttribute('size')).to.equal('lg');
      });
    });

    it('title height changes with size', async () => {
      // Test sm size - uses heading-200 token
      const elSm = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="sm"></sando-skeleton-article>`
      );
      const stackSm = elSm.shadowRoot?.querySelector('sando-skeleton-stack');
      const titleSm = stackSm?.querySelector('sando-skeleton[shape="text"]');
      expect(titleSm?.getAttribute('height')).to.equal('var(--sando-font-size-heading-200)');

      // Test md size - uses heading-100 token
      const elMd = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="md"></sando-skeleton-article>`
      );
      const stackMd = elMd.shadowRoot?.querySelector('sando-skeleton-stack');
      const titleMd = stackMd?.querySelector('sando-skeleton[shape="text"]');
      expect(titleMd?.getAttribute('height')).to.equal('var(--sando-font-size-heading-100)');

      // Test lg size - uses heading-100 token
      const elLg = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="lg"></sando-skeleton-article>`
      );
      const stackLg = elLg.shadowRoot?.querySelector('sando-skeleton-stack');
      const titleLg = stackLg?.querySelector('sando-skeleton[shape="text"]');
      expect(titleLg?.getAttribute('height')).to.equal('var(--sando-font-size-heading-100)');
    });

    it('meta height changes with size', async () => {
      // Test sm size - uses skeleton text height sm token
      const elSm = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="sm"></sando-skeleton-article>`
      );
      const rowSm = elSm.shadowRoot?.querySelector('sando-skeleton-row');
      const metaSm = rowSm?.querySelectorAll('sando-skeleton[shape="text"]');
      expect(metaSm?.[0]?.getAttribute('height')).to.equal(
        'var(--sando-skeleton-size-text-height-sm)'
      );

      // Test md size - uses skeleton text height sm token
      const elMd = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="md"></sando-skeleton-article>`
      );
      const rowMd = elMd.shadowRoot?.querySelector('sando-skeleton-row');
      const metaMd = rowMd?.querySelectorAll('sando-skeleton[shape="text"]');
      expect(metaMd?.[0]?.getAttribute('height')).to.equal(
        'var(--sando-skeleton-size-text-height-sm)'
      );

      // Test lg size - uses skeleton text height md token
      const elLg = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="lg"></sando-skeleton-article>`
      );
      const rowLg = elLg.shadowRoot?.querySelector('sando-skeleton-row');
      const metaLg = rowLg?.querySelectorAll('sando-skeleton[shape="text"]');
      expect(metaLg?.[0]?.getAttribute('height')).to.equal(
        'var(--sando-skeleton-size-text-height-md)'
      );
    });

    it('meta width changes with size', async () => {
      // Test sm size - uses space tokens
      const elSm = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="sm"></sando-skeleton-article>`
      );
      const rowSm = elSm.shadowRoot?.querySelector('sando-skeleton-row');
      const metaSm = rowSm?.querySelectorAll('sando-skeleton[shape="text"]');
      expect(metaSm?.[0]?.getAttribute('width')).to.equal('var(--sando-space-16)'); // date
      expect(metaSm?.[1]?.getAttribute('width')).to.equal('var(--sando-space-24)'); // author

      // Test lg size - uses space tokens
      const elLg = await fixture<SandoSkeletonArticle>(
        html`<sando-skeleton-article size="lg"></sando-skeleton-article>`
      );
      const rowLg = elLg.shadowRoot?.querySelector('sando-skeleton-row');
      const metaLg = rowLg?.querySelectorAll('sando-skeleton[shape="text"]');
      expect(metaLg?.[0]?.getAttribute('width')).to.equal('var(--sando-space-24)'); // date
      expect(metaLg?.[1]?.getAttribute('width')).to.equal('var(--sando-space-40)'); // author
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
      const stack = el.shadowRoot?.querySelector('sando-skeleton-stack');
      const titleSkeleton = stack?.querySelector('sando-skeleton[shape="text"]');
      const row = el.shadowRoot?.querySelector('sando-skeleton-row');

      expect(paragraphs?.length).to.equal(4);
      expect(titleSkeleton?.getAttribute('width')).to.equal('90%');
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
