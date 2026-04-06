/**
 * Accessibility tests for sando-skeleton-table-row component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-table-row.js';
import type { SandoSkeletonTableRow } from './sando-skeleton-table-row.js';

describe('sando-skeleton-table-row accessibility', () => {
  let element: SandoSkeletonTableRow;

  // ============================================
  // AXE TESTS — DEFAULT STATE
  // ============================================

  describe('axe violations — default state', () => {
    it('passes axe for default skeleton table row', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with show-checkbox', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row show-checkbox></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with custom column count', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row columns="6"></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with custom column widths', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row column-widths="20%,30%,30%,20%"></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with checkbox and custom columns', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row show-checkbox columns="5"></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — COLUMN COUNTS
  // ============================================

  describe('axe violations — column counts', () => {
    it('passes axe with 2 columns', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row columns="2"></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with 4 columns (default)', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row columns="4"></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with 8 columns', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row columns="8"></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // AXE TESTS — EFFECTS
  // ============================================

  describe('axe violations — effects', () => {
    it('passes axe for pulse effect', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row effect="pulse"></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for none effect', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row effect="none"></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for shimmer effect', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row effect="shimmer"></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // DECORATIVE ELEMENT TESTS
  // ============================================

  describe('decorative element behavior', () => {
    it('host element is not focusable', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      expect(element.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // REDUCED MOTION TESTS
  // ============================================

  describe('reduced motion support', () => {
    it('effect="none" with checkbox is accessible', async () => {
      element = await fixture<SandoSkeletonTableRow>(
        html`<sando-skeleton-table-row effect="none" show-checkbox></sando-skeleton-table-row>`
      );
      await element.updateComplete;

      expect(element.effect).toBe('none');

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // ALL EFFECTS ACCESSIBLE
  // ============================================

  describe('all effects are accessible', () => {
    const effects = ['shimmer', 'pulse', 'none'] as const;

    effects.forEach((effect) => {
      it(`${effect} effect is accessible`, async () => {
        element = await fixture<SandoSkeletonTableRow>(
          html`<sando-skeleton-table-row effect="${effect}"></sando-skeleton-table-row>`
        );
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
