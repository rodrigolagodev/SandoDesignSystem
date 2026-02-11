/**
 * Unit tests for sando-skeleton-profile component
 */

import { fixture, expect, html } from '@open-wc/testing';
import './sando-skeleton-profile.js';
import type { SandoSkeletonProfile } from './sando-skeleton-profile.js';

describe('sando-skeleton-profile', () => {
  describe('default rendering', () => {
    it('renders with default props', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      expect(el).to.exist;
      expect(el.avatarSize).to.equal('xl');
      expect(el.showBio).to.be.true;
      expect(el.bioLines).to.equal(2);
    });

    it('renders skeleton composer', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
      expect(composer).to.exist;
    });

    it('renders skeleton stack', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      const stack = el.shadowRoot?.querySelector('sando-skeleton-stack');
      expect(stack).to.exist;
    });

    it('renders avatar skeleton', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar).to.exist;
    });

    it('renders name skeleton', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      const textSkeletons = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
      expect(textSkeletons?.length).to.be.greaterThanOrEqual(1);
    });

    it('renders centered container', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      const container = el.shadowRoot?.querySelector('.profile-container');
      expect(container).to.exist;
    });
  });

  describe('avatarSize prop', () => {
    it('uses default xl size', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar?.getAttribute('size')).to.equal('xl');
    });

    it('applies custom avatar size', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile avatar-size="lg"></sando-skeleton-profile>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar?.getAttribute('size')).to.equal('lg');
    });

    it('handles sm size', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile avatar-size="sm"></sando-skeleton-profile>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar?.getAttribute('size')).to.equal('sm');
    });

    it('handles md size', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile avatar-size="md"></sando-skeleton-profile>`
      );
      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      expect(avatar?.getAttribute('size')).to.equal('md');
    });
  });

  describe('showBio prop', () => {
    it('shows bio lines by default', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      const bioContainer = el.shadowRoot?.querySelector('.bio-container');
      expect(bioContainer).to.exist;
    });

    it('hides bio lines when show-bio is false', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      el.showBio = false;
      await el.updateComplete;
      const bioContainer = el.shadowRoot?.querySelector('.bio-container');
      expect(bioContainer).to.not.exist;
    });

    it('shows bio lines when show-bio is true', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile show-bio></sando-skeleton-profile>`
      );
      const bioContainer = el.shadowRoot?.querySelector('.bio-container');
      expect(bioContainer).to.exist;
    });
  });

  describe('bioLines prop', () => {
    it('renders default 2 bio lines', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      const bioContainer = el.shadowRoot?.querySelector('.bio-container');
      const bioTexts = bioContainer?.querySelectorAll('sando-skeleton-text');
      expect(bioTexts?.length).to.equal(2);
    });

    it('renders custom number of bio lines', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile bio-lines="3"></sando-skeleton-profile>`
      );
      const bioContainer = el.shadowRoot?.querySelector('.bio-container');
      const bioTexts = bioContainer?.querySelectorAll('sando-skeleton-text');
      expect(bioTexts?.length).to.equal(3);
    });

    it('renders 1 bio line', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile bio-lines="1"></sando-skeleton-profile>`
      );
      const bioContainer = el.shadowRoot?.querySelector('.bio-container');
      const bioTexts = bioContainer?.querySelectorAll('sando-skeleton-text');
      expect(bioTexts?.length).to.equal(1);
    });

    it('handles bio lines value of 0', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile bio-lines="0"></sando-skeleton-profile>`
      );
      const bioContainer = el.shadowRoot?.querySelector('.bio-container');
      const bioTexts = bioContainer?.querySelectorAll('sando-skeleton-text');
      expect(bioTexts?.length).to.equal(0);
    });
  });

  describe('combined configurations', () => {
    it('renders full profile with all options', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile
          avatar-size="lg"
          show-bio
          bio-lines="4"
        ></sando-skeleton-profile>`
      );

      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      const bioContainer = el.shadowRoot?.querySelector('.bio-container');
      const bioTexts = bioContainer?.querySelectorAll('sando-skeleton-text');

      expect(avatar?.getAttribute('size')).to.equal('lg');
      expect(bioContainer).to.exist;
      expect(bioTexts?.length).to.equal(4);
    });

    it('renders minimal profile without bio', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      el.showBio = false;
      await el.updateComplete;

      const avatar = el.shadowRoot?.querySelector('sando-skeleton-avatar');
      const bioContainer = el.shadowRoot?.querySelector('.bio-container');

      expect(avatar).to.exist;
      expect(bioContainer).to.not.exist;
    });
  });

  describe('accessibility', () => {
    it('renders with skeleton-composer for accessibility attributes', async () => {
      const el = await fixture<SandoSkeletonProfile>(
        html`<sando-skeleton-profile></sando-skeleton-profile>`
      );
      const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
      expect(composer).to.exist;
      // Composer provides role="status", aria-busy, aria-label
    });
  });
});
