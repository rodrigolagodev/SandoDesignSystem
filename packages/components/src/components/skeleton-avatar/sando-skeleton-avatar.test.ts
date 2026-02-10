/**
 * Unit tests for sando-skeleton-avatar component
 */

import { fixture, expect, html } from '@open-wc/testing';
import './sando-skeleton-avatar.js';
import type { SandoSkeletonAvatar } from './sando-skeleton-avatar.js';
import type { SandoSkeleton } from '../skeleton/sando-skeleton.js';

describe('sando-skeleton-avatar', () => {
  describe('rendering', () => {
    it('renders with default props', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar></sando-skeleton-avatar>`
      );
      expect(el).to.exist;
      expect(el.shadowRoot).to.exist;
    });

    it('renders with default size (md)', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar></sando-skeleton-avatar>`
      );
      expect(el.size).to.equal('md');
    });

    it('renders with default effect (shimmer)', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar></sando-skeleton-avatar>`
      );
      expect(el.effect).to.equal('shimmer');
    });
  });

  describe('size variants', () => {
    it('renders xs size correctly', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="xs"></sando-skeleton-avatar>`
      );
      expect(el.size).to.equal('xs');
      expect(el.getAttribute('size')).to.equal('xs');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.width).to.include('--sando-skeleton-size-avatar-xs');
      expect(skeleton.height).to.include('--sando-skeleton-size-avatar-xs');
    });

    it('renders sm size correctly', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="sm"></sando-skeleton-avatar>`
      );
      expect(el.size).to.equal('sm');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.width).to.include('--sando-skeleton-size-avatar-sm');
    });

    it('renders md size correctly', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="md"></sando-skeleton-avatar>`
      );
      expect(el.size).to.equal('md');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.width).to.include('--sando-skeleton-size-avatar-md');
    });

    it('renders lg size correctly', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="lg"></sando-skeleton-avatar>`
      );
      expect(el.size).to.equal('lg');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.width).to.include('--sando-skeleton-size-avatar-lg');
    });

    it('renders xl size correctly', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="xl"></sando-skeleton-avatar>`
      );
      expect(el.size).to.equal('xl');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.width).to.include('--sando-skeleton-size-avatar-xl');
    });
  });

  describe('circular shape', () => {
    it('uses circular shape for the inner skeleton', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar></sando-skeleton-avatar>`
      );

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.shape).to.equal('circular');
    });
  });

  describe('effect variants', () => {
    it('respects shimmer effect', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar effect="shimmer"></sando-skeleton-avatar>`
      );
      expect(el.effect).to.equal('shimmer');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.effect).to.equal('shimmer');
    });

    it('respects pulse effect', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar effect="pulse"></sando-skeleton-avatar>`
      );
      expect(el.effect).to.equal('pulse');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.effect).to.equal('pulse');
    });

    it('respects none effect', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar effect="none"></sando-skeleton-avatar>`
      );
      expect(el.effect).to.equal('none');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.effect).to.equal('none');
    });
  });

  describe('accessibility', () => {
    it('has aria-hidden on inner skeleton', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar></sando-skeleton-avatar>`
      );

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton');
      expect(skeleton?.getAttribute('aria-hidden')).to.equal('true');
    });
  });

  describe('attributes', () => {
    it('reflects size attribute', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="lg"></sando-skeleton-avatar>`
      );
      expect(el.getAttribute('size')).to.equal('lg');
    });

    it('reflects effect attribute', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar effect="pulse"></sando-skeleton-avatar>`
      );
      expect(el.getAttribute('effect')).to.equal('pulse');
    });
  });

  describe('dynamic updates', () => {
    it('updates size dynamically', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar size="sm"></sando-skeleton-avatar>`
      );
      expect(el.size).to.equal('sm');

      el.size = 'xl';
      await el.updateComplete;
      expect(el.size).to.equal('xl');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.width).to.include('--sando-skeleton-size-avatar-xl');
    });

    it('updates effect dynamically', async () => {
      const el = await fixture<SandoSkeletonAvatar>(
        html`<sando-skeleton-avatar effect="shimmer"></sando-skeleton-avatar>`
      );
      expect(el.effect).to.equal('shimmer');

      el.effect = 'pulse';
      await el.updateComplete;
      expect(el.effect).to.equal('pulse');

      const skeleton = el.shadowRoot!.querySelector('sando-skeleton') as SandoSkeleton;
      expect(skeleton.effect).to.equal('pulse');
    });
  });
});
