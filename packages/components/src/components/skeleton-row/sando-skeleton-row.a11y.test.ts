/**
 * Accessibility tests for sando-skeleton-row component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-row.js';
import '../skeleton/sando-skeleton-text.js';
import '../skeleton-avatar/sando-skeleton-avatar.js';
import type { SandoSkeletonRow } from './sando-skeleton-row.js';

describe('sando-skeleton-row accessibility', () => {
  let element: SandoSkeletonRow;

  // ============================================
  // AXE TESTS
  // ============================================

  describe('axe violations', () => {
    it('passes axe for empty skeleton row', async () => {
      element = await fixture<SandoSkeletonRow>(html`<sando-skeleton-row></sando-skeleton-row>`);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with skeleton children', async () => {
      element = await fixture<SandoSkeletonRow>(html`
        <sando-skeleton-row>
          <sando-skeleton-avatar size="md"></sando-skeleton-avatar>
          <sando-skeleton-text></sando-skeleton-text>
        </sando-skeleton-row>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for gap xs', async () => {
      element = await fixture<SandoSkeletonRow>(
        html`<sando-skeleton-row gap="xs"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for gap sm', async () => {
      element = await fixture<SandoSkeletonRow>(
        html`<sando-skeleton-row gap="sm"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for gap md', async () => {
      element = await fixture<SandoSkeletonRow>(
        html`<sando-skeleton-row gap="md"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for gap lg', async () => {
      element = await fixture<SandoSkeletonRow>(
        html`<sando-skeleton-row gap="lg"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for align start', async () => {
      element = await fixture<SandoSkeletonRow>(
        html`<sando-skeleton-row align="start"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for align center', async () => {
      element = await fixture<SandoSkeletonRow>(
        html`<sando-skeleton-row align="center"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for align end', async () => {
      element = await fixture<SandoSkeletonRow>(
        html`<sando-skeleton-row align="end"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for align stretch', async () => {
      element = await fixture<SandoSkeletonRow>(
        html`<sando-skeleton-row align="stretch"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-row>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================
  // ARIA ATTRIBUTE TESTS
  // ============================================

  describe('aria attributes', () => {
    it('host element does not expose unexpected role', async () => {
      element = await fixture<SandoSkeletonRow>(html`<sando-skeleton-row></sando-skeleton-row>`);
      await element.updateComplete;

      expect(element.getAttribute('role')).toBeNull();
    });
  });

  // ============================================
  // DECORATIVE ELEMENT TESTS
  // ============================================

  describe('decorative element behavior', () => {
    it('host element is not focusable', async () => {
      element = await fixture<SandoSkeletonRow>(html`<sando-skeleton-row></sando-skeleton-row>`);
      await element.updateComplete;

      expect(element.getAttribute('tabindex')).toBeNull();
    });
  });

  // ============================================
  // ALL GAPS ACCESSIBLE
  // ============================================

  describe('all gaps are accessible', () => {
    const gaps = ['xs', 'sm', 'md', 'lg'] as const;

    gaps.forEach((gap) => {
      it(`${gap} gap is accessible`, async () => {
        element = await fixture<SandoSkeletonRow>(html`
          <sando-skeleton-row gap="${gap}">
            <sando-skeleton-text></sando-skeleton-text>
          </sando-skeleton-row>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ============================================
  // ALL ALIGNMENTS ACCESSIBLE
  // ============================================

  describe('all alignments are accessible', () => {
    const alignments = ['start', 'center', 'end', 'stretch'] as const;

    alignments.forEach((align) => {
      it(`${align} alignment is accessible`, async () => {
        element = await fixture<SandoSkeletonRow>(html`
          <sando-skeleton-row align="${align}">
            <sando-skeleton-text></sando-skeleton-text>
          </sando-skeleton-row>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
