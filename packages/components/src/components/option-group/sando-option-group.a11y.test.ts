/**
 * Accessibility Tests for sando-option-group
 *
 * Tests WCAG compliance using axe-core.
 *
 * @module option-group-a11y-test
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-option-group.js';
import type { SandoOptionGroup } from './sando-option-group.js';

describe('sando-option-group Accessibility', () => {
  describe('axe-core validation', () => {
    it('should pass axe accessibility tests', async () => {
      const el = await fixture<SandoOptionGroup>(
        html`<sando-option-group label="Test Group"></sando-option-group>`
      );
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe when disabled', async () => {
      const el = await fixture<SandoOptionGroup>(
        html`<sando-option-group label="Disabled Group" disabled></sando-option-group>`
      );
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ARIA attributes', () => {
    it('should have accessible role="group"', async () => {
      const el = await fixture<SandoOptionGroup>(
        html`<sando-option-group label="Accessible Group"></sando-option-group>`
      );
      const groupEl = el.shadowRoot?.querySelector('[role="group"]');
      expect(groupEl).toBeDefined();
    });

    it('should have aria-label for screen readers', async () => {
      const el = await fixture<SandoOptionGroup>(
        html`<sando-option-group label="Screen Reader Group"></sando-option-group>`
      );
      const groupEl = el.shadowRoot?.querySelector('[role="group"]');
      expect(groupEl?.getAttribute('aria-label')).toBe('Screen Reader Group');
    });

    it('should have aria-disabled="true" when disabled', async () => {
      const el = await fixture<SandoOptionGroup>(
        html`<sando-option-group label="Test" disabled></sando-option-group>`
      );
      const groupEl = el.shadowRoot?.querySelector('[role="group"]');
      expect(groupEl?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have aria-disabled="false" when not disabled', async () => {
      const el = await fixture<SandoOptionGroup>(
        html`<sando-option-group label="Test"></sando-option-group>`
      );
      const groupEl = el.shadowRoot?.querySelector('[role="group"]');
      expect(groupEl?.getAttribute('aria-disabled')).toBe('false');
    });
  });
});
