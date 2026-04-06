/**
 * Accessibility tests for sando-skeleton-composer component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-composer.js';
import '../skeleton/sando-skeleton-text.js';
import '../skeleton/sando-skeleton.js';
import type { SandoSkeletonComposer } from './sando-skeleton-composer.js';

describe('sando-skeleton-composer accessibility', () => {
  let element: SandoSkeletonComposer;

  // ============================================
  // AXE TESTS
  // ============================================

  describe('axe violations', () => {
    it('passes axe for empty composer', async () => {
      element = await fixture<SandoSkeletonComposer>(
        html`<sando-skeleton-composer></sando-skeleton-composer>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with skeleton text children', async () => {
      element = await fixture<SandoSkeletonComposer>(html`
        <sando-skeleton-composer>
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text width="80%"></sando-skeleton-text>
          <sando-skeleton-text width="60%"></sando-skeleton-text>
        </sando-skeleton-composer>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with stagger prop', async () => {
      element = await fixture<SandoSkeletonComposer>(html`
        <sando-skeleton-composer stagger="50ms">
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
        </sando-skeleton-composer>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with base skeleton children', async () => {
      element = await fixture<SandoSkeletonComposer>(html`
        <sando-skeleton-composer>
          <sando-skeleton shape="text" width="100%" height="16px"></sando-skeleton>
          <sando-skeleton shape="text" width="80%" height="16px"></sando-skeleton>
        </sando-skeleton-composer>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // ARIA ATTRIBUTE TESTS
  // ============================================

  describe('aria attributes', () => {
    it('host element does not expose focusable role', async () => {
      element = await fixture<SandoSkeletonComposer>(
        html`<sando-skeleton-composer></sando-skeleton-composer>`
      );
      await element.updateComplete;

      expect(element.getAttribute('role')).toBeNull();
    });
  });

  // ============================================
  // DECORATIVE ELEMENT TESTS
  // ============================================

  describe('decorative element behavior', () => {
    it('host element is not focusable', async () => {
      element = await fixture<SandoSkeletonComposer>(
        html`<sando-skeleton-composer></sando-skeleton-composer>`
      );
      await element.updateComplete;

      expect(element.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // STAGGER FEATURE ACCESSIBLE
  // ============================================

  describe('stagger feature is accessible', () => {
    it('stagger does not add focusable elements or invalid aria', async () => {
      element = await fixture<SandoSkeletonComposer>(html`
        <sando-skeleton-composer stagger="100ms">
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
        </sando-skeleton-composer>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('stagger with seconds value is accessible', async () => {
      element = await fixture<SandoSkeletonComposer>(html`
        <sando-skeleton-composer stagger="0.1s">
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
        </sando-skeleton-composer>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });
});
