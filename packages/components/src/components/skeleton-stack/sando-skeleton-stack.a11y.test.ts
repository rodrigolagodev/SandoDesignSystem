/**
 * Accessibility tests for sando-skeleton-stack component
 * Validates WCAG compliance using axe-core
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-skeleton-stack.js';
import '../skeleton/sando-skeleton-text.js';
import type { SandoSkeletonStack } from './sando-skeleton-stack.js';

describe('sando-skeleton-stack accessibility', () => {
  let element: SandoSkeletonStack;

  // ============================================
  // AXE TESTS
  // ============================================

  describe('axe violations', () => {
    it('passes axe for empty skeleton stack', async () => {
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack></sando-skeleton-stack>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe with skeleton text children', async () => {
      element = await fixture<SandoSkeletonStack>(html`
        <sando-skeleton-stack>
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text width="80%"></sando-skeleton-text>
          <sando-skeleton-text width="60%"></sando-skeleton-text>
        </sando-skeleton-stack>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for gap xs', async () => {
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack gap="xs"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-stack>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for gap sm', async () => {
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack gap="sm"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-stack>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for gap md', async () => {
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack gap="md"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-stack>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for gap lg', async () => {
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack gap="lg"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-stack>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for align start', async () => {
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack align="start"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-stack>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for align center', async () => {
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack align="center"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-stack>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for align end', async () => {
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack align="end"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-stack>`
      );
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('passes axe for align stretch', async () => {
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack align="stretch"
          ><sando-skeleton-text></sando-skeleton-text
        ></sando-skeleton-stack>`
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
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack></sando-skeleton-stack>`
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
      element = await fixture<SandoSkeletonStack>(
        html`<sando-skeleton-stack></sando-skeleton-stack>`
      );
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
        element = await fixture<SandoSkeletonStack>(html`
          <sando-skeleton-stack gap="${gap}">
            <sando-skeleton-text></sando-skeleton-text>
          </sando-skeleton-stack>
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
        element = await fixture<SandoSkeletonStack>(html`
          <sando-skeleton-stack align="${align}">
            <sando-skeleton-text></sando-skeleton-text>
          </sando-skeleton-stack>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
