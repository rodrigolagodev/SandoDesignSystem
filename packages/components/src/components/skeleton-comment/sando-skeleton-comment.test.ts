/**
 * Unit tests for sando-skeleton-comment component
 */

import { fixture, expect, html } from '@open-wc/testing';
import './sando-skeleton-comment.js';
import type { SandoSkeletonComment } from './sando-skeleton-comment.js';

describe('sando-skeleton-comment', () => {
  describe('default rendering', () => {
    it('renders with default props', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      expect(el).to.exist;
      expect(el.avatarSize).to.equal('sm');
      expect(el.lines).to.equal(2);
      expect(el.showTimestamp).to.be.true;
    });

    it('renders skeleton composer', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
      expect(composer).to.exist;
    });

    it('renders main skeleton row', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      const row = el.shadowRoot?.querySelector('sando-skeleton-row');
      expect(row).to.exist;
    });

    it('renders avatar skeleton', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar).to.exist;
    });

    it('renders comment content container', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      const content = el.shadowRoot?.querySelector('.comment-content');
      expect(content).to.exist;
    });

    it('renders header and comment lines', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      const content = el.shadowRoot?.querySelector('.comment-content');
      const stacks = content?.querySelectorAll('sando-skeleton-stack');
      expect(stacks?.length).to.be.greaterThanOrEqual(1);
    });
  });

  describe('avatarSize prop', () => {
    it('uses default sm size', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar?.getAttribute('size')).to.equal('sm');
    });

    it('applies xs size', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment avatar-size="xs"></sando-skeleton-comment>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar?.getAttribute('size')).to.equal('xs');
    });

    it('applies md size', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment avatar-size="md"></sando-skeleton-comment>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar?.getAttribute('size')).to.equal('md');
    });
  });

  describe('lines prop', () => {
    it('renders default 2 comment lines', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      // Lines are in nested stack within comment-content
      const content = el.shadowRoot?.querySelector('.comment-content');
      const innerStack = content?.querySelectorAll('sando-skeleton-stack')[1]; // Second stack is for lines
      const lines = innerStack?.querySelectorAll('sando-skeleton-text');
      expect(lines?.length).to.equal(2);
    });

    it('renders custom number of lines', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment lines="4"></sando-skeleton-comment>`
      );
      const content = el.shadowRoot?.querySelector('.comment-content');
      const innerStack = content?.querySelectorAll('sando-skeleton-stack')[1];
      const lines = innerStack?.querySelectorAll('sando-skeleton-text');
      expect(lines?.length).to.equal(4);
    });

    it('renders 1 line', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment lines="1"></sando-skeleton-comment>`
      );
      const content = el.shadowRoot?.querySelector('.comment-content');
      const innerStack = content?.querySelectorAll('sando-skeleton-stack')[1];
      const lines = innerStack?.querySelectorAll('sando-skeleton-text');
      expect(lines?.length).to.equal(1);
    });
  });

  describe('showTimestamp prop', () => {
    it('shows timestamp by default', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      const content = el.shadowRoot?.querySelector('.comment-content');
      const headerRow = content?.querySelector('sando-skeleton-row');
      const headerTexts = headerRow?.querySelectorAll('sando-skeleton-text');
      expect(headerTexts?.length).to.equal(2); // author + timestamp
    });

    it('hides timestamp when show-timestamp is false', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      el.showTimestamp = false;
      await el.updateComplete;
      const content = el.shadowRoot?.querySelector('.comment-content');
      const headerRow = content?.querySelector('sando-skeleton-row');
      const headerTexts = headerRow?.querySelectorAll('sando-skeleton-text');
      expect(headerTexts?.length).to.equal(1); // only author
    });

    it('shows timestamp when show-timestamp is true', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment show-timestamp></sando-skeleton-comment>`
      );
      const content = el.shadowRoot?.querySelector('.comment-content');
      const headerRow = content?.querySelector('sando-skeleton-row');
      const headerTexts = headerRow?.querySelectorAll('sando-skeleton-text');
      expect(headerTexts?.length).to.equal(2);
    });
  });

  describe('combined configurations', () => {
    it('renders comment with all options', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment
          avatar-size="md"
          lines="3"
          show-timestamp
        ></sando-skeleton-comment>`
      );

      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      const content = el.shadowRoot?.querySelector('.comment-content');
      const headerRow = content?.querySelector('sando-skeleton-row');
      const headerTexts = headerRow?.querySelectorAll('sando-skeleton-text');
      const innerStack = content?.querySelectorAll('sando-skeleton-stack')[1];
      const lines = innerStack?.querySelectorAll('sando-skeleton-text');

      expect(avatar?.getAttribute('size')).to.equal('md');
      expect(headerTexts?.length).to.equal(2);
      expect(lines?.length).to.equal(3);
    });

    it('renders compact comment without timestamp', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment avatar-size="xs" lines="1"></sando-skeleton-comment>`
      );
      el.showTimestamp = false;
      await el.updateComplete;

      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      const content = el.shadowRoot?.querySelector('.comment-content');
      const headerRow = content?.querySelector('sando-skeleton-row');
      const headerTexts = headerRow?.querySelectorAll('sando-skeleton-text');

      expect(avatar?.getAttribute('size')).to.equal('xs');
      expect(headerTexts?.length).to.equal(1);
    });
  });

  describe('accessibility', () => {
    it('renders with skeleton-composer for accessibility attributes', async () => {
      const el = await fixture<SandoSkeletonComment>(
        html`<sando-skeleton-comment></sando-skeleton-comment>`
      );
      const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
      expect(composer).to.exist;
      // Composer provides role="status", aria-busy, aria-label
    });
  });
});
