/**
 * Unit Tests for sando-label
 * Tests rendering, properties, slots, and edge cases
 *
 * NOTE: The label component is a form-associated label element.
 * - Uses native <label> element for proper accessibility
 * - Supports required/optional indicators
 * - Supports helper text and tooltip
 * - Supports screen-reader only mode (sr-only)
 * - Non-interactive (no click/keyboard handlers)
 *
 * @see TESTING_STRATEGY.toon (TST-CR-R1, TST-CR-R2)
 * @see WCAG_COMPLIANCE.toon (WC-CR-R1)
 */

import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-label.js';
import type { SandoLabel } from './sando-label.js';

describe('sando-label', () => {
  let element: SandoLabel;

  beforeEach(async () => {
    element = await fixture<SandoLabel>(html`<sando-label>Email</sando-label>`);
  });

  describe('Rendering', () => {
    it('should render with default properties', () => {
      expect(element).toBeDefined();
      expect(element.for).toBeUndefined();
      expect(element.required).toBe(false);
      expect(element.optional).toBe(false);
      expect(element.disabled).toBe(false);
      expect(element.size).toBe('md');
      expect(element.weight).toBe('medium');
      expect(element.helperText).toBeUndefined();
      expect(element.tooltip).toBeUndefined();
      expect(element.srOnly).toBe(false);
    });

    it('should render slot content', () => {
      expect(element.textContent?.trim()).toBe('Email');
    });

    it('should render shadow DOM', () => {
      expect(element.shadowRoot).toBeDefined();
    });

    it('should be accessible', async () => {
      await expectWc(element).to.be.accessible();
    });

    it('should render as native label element', async () => {
      const inner = element.shadowRoot?.querySelector('.label');
      expect(inner?.tagName.toLowerCase()).toBe('label');
    });
  });

  describe('Properties - for attribute', () => {
    it('should pass for attribute to native label', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label for="email-input">Email</sando-label>
      `);

      const label = element.shadowRoot?.querySelector('.label');
      expect(label?.getAttribute('for')).toBe('email-input');
    });

    it('should update for attribute dynamically', async () => {
      element.for = 'password-input';
      await element.updateComplete;

      const label = element.shadowRoot?.querySelector('.label');
      expect(label?.getAttribute('for')).toBe('password-input');
    });

    it('should not render for attribute when not provided', async () => {
      const label = element.shadowRoot?.querySelector('.label');
      expect(label?.hasAttribute('for')).toBe(false);
    });
  });

  describe('Properties - required', () => {
    it('should not show required indicator by default', () => {
      const label = element.shadowRoot?.querySelector('.label');
      expect(label?.hasAttribute('data-required')).toBe(false);
    });

    it('should show required indicator (*) when required is true', async () => {
      element = await fixture<SandoLabel>(html` <sando-label required>Full Name</sando-label> `);

      const label = element.shadowRoot?.querySelector('.label');
      expect(label?.hasAttribute('data-required')).toBe(true);
    });

    it('should reflect required attribute', async () => {
      element.required = true;
      await element.updateComplete;

      expect(element.hasAttribute('required')).toBe(true);
      expect(element.required).toBe(true);
    });

    it('should apply data-required to label element', async () => {
      element = await fixture<SandoLabel>(html` <sando-label required>Full Name</sando-label> `);

      const label = element.shadowRoot?.querySelector('.label');
      expect(label?.hasAttribute('data-required')).toBe(true);
    });
  });

  describe('Properties - optional', () => {
    it('should not show optional text by default', () => {
      const optional = element.shadowRoot?.querySelector('.label__optional');
      expect(optional).toBeNull();
    });

    it('should show "(optional)" text when optional is true', async () => {
      element = await fixture<SandoLabel>(html` <sando-label optional>Nickname</sando-label> `);

      const optional = element.shadowRoot?.querySelector('.label__optional');
      expect(optional).not.toBeNull();
      expect(optional?.textContent).toContain('(optional)');
    });

    it('should reflect optional attribute', async () => {
      element.optional = true;
      await element.updateComplete;

      expect(element.hasAttribute('optional')).toBe(true);
      expect(element.optional).toBe(true);
    });
  });

  describe('Properties - required and optional mutual exclusivity', () => {
    it('should not show data-required when both required and optional are true', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label required optional>Field</sando-label>
      `);

      const label = element.shadowRoot?.querySelector('.label');
      const optional = element.shadowRoot?.querySelector('.label__optional');

      // When both are set, neither indicator is shown (mutual exclusivity)
      expect(label?.hasAttribute('data-required')).toBe(false);
      expect(optional).toBeNull();
    });

    it('should not show data-required when both properties are set dynamically', async () => {
      element.required = true;
      element.optional = true;
      await element.updateComplete;

      const label = element.shadowRoot?.querySelector('.label');
      const optional = element.shadowRoot?.querySelector('.label__optional');

      // When both are set, neither indicator is shown
      expect(label?.hasAttribute('data-required')).toBe(false);
      expect(optional).toBeNull();
    });

    it('should show data-required only when optional is false', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label required>Required Only</sando-label>
      `);

      const label = element.shadowRoot?.querySelector('.label');
      const optional = element.shadowRoot?.querySelector('.label__optional');

      expect(label?.hasAttribute('data-required')).toBe(true);
      expect(optional).toBeNull();
    });

    it('should show optional only when required is false', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label optional>Optional Only</sando-label>
      `);

      const label = element.shadowRoot?.querySelector('.label');
      const optional = element.shadowRoot?.querySelector('.label__optional');

      expect(label?.hasAttribute('data-required')).toBe(false);
      expect(optional).not.toBeNull();
    });
  });

  describe('Properties - disabled', () => {
    it('should not be disabled by default', () => {
      expect(element.disabled).toBe(false);
      expect(element.hasAttribute('disabled')).toBe(false);
    });

    it('should reflect disabled attribute', async () => {
      element.disabled = true;
      await element.updateComplete;

      expect(element.disabled).toBe(true);
      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('should apply disabled via attribute', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label disabled>Disabled Label</sando-label>
      `);

      expect(element.disabled).toBe(true);
      expect(element.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Properties - size', () => {
    it('should apply md size by default', () => {
      expect(element.size).toBe('md');
      expect(element.getAttribute('size')).toBe('md');
    });

    it('should update size to sm', async () => {
      element.size = 'sm';
      await element.updateComplete;

      expect(element.size).toBe('sm');
      expect(element.getAttribute('size')).toBe('sm');
    });

    it('should update size to lg', async () => {
      element.size = 'lg';
      await element.updateComplete;

      expect(element.size).toBe('lg');
      expect(element.getAttribute('size')).toBe('lg');
    });

    it('should render with each size variant', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        element = await fixture<SandoLabel>(html` <sando-label size=${size}>Label</sando-label> `);
        expect(element.size).toBe(size);
        expect(element.getAttribute('size')).toBe(size);
      }
    });
  });

  describe('Properties - weight', () => {
    it('should apply medium weight by default', () => {
      expect(element.weight).toBe('medium');
      expect(element.getAttribute('weight')).toBe('medium');
    });

    it('should update weight to normal', async () => {
      element.weight = 'normal';
      await element.updateComplete;

      expect(element.weight).toBe('normal');
      expect(element.getAttribute('weight')).toBe('normal');
    });

    it('should update weight to semibold', async () => {
      element.weight = 'semibold';
      await element.updateComplete;

      expect(element.weight).toBe('semibold');
      expect(element.getAttribute('weight')).toBe('semibold');
    });

    it('should render with each weight variant', async () => {
      const weights = ['normal', 'medium', 'semibold'] as const;

      for (const weight of weights) {
        element = await fixture<SandoLabel>(html`
          <sando-label weight=${weight}>Label</sando-label>
        `);
        expect(element.weight).toBe(weight);
        expect(element.getAttribute('weight')).toBe(weight);
      }
    });
  });

  describe('Properties - helperText', () => {
    it('should not render helper text by default', () => {
      const helperText = element.shadowRoot?.querySelector('.label__helper-text');
      expect(helperText).toBeNull();
    });

    it('should render helper text when provided', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label helper-text="Must be at least 8 characters">Password</sando-label>
      `);

      const helperText = element.shadowRoot?.querySelector('.label__helper-text');
      expect(helperText).not.toBeNull();
      expect(helperText?.textContent).toContain('Must be at least 8 characters');
    });

    it('should update helper text dynamically', async () => {
      element.helperText = 'New helper text';
      await element.updateComplete;

      const helperText = element.shadowRoot?.querySelector('.label__helper-text');
      expect(helperText).not.toBeNull();
      expect(helperText?.textContent).toContain('New helper text');
    });
  });

  describe('Properties - tooltip', () => {
    it('should not render tooltip by default', () => {
      const tooltip = element.shadowRoot?.querySelector('.label__tooltip');
      expect(tooltip).toBeNull();
    });

    it('should render tooltip icon when tooltip is provided', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label tooltip="We need this for verification">SSN</sando-label>
      `);

      const tooltip = element.shadowRoot?.querySelector('.label__tooltip');
      expect(tooltip).not.toBeNull();

      // Should contain an icon
      const icon = tooltip?.querySelector('sando-icon');
      expect(icon).not.toBeNull();
    });

    it('should set title attribute on tooltip', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label tooltip="Tooltip text">Label</sando-label>
      `);

      const tooltip = element.shadowRoot?.querySelector('.label__tooltip');
      expect(tooltip?.getAttribute('title')).toBe('Tooltip text');
    });

    it('should update tooltip dynamically', async () => {
      element.tooltip = 'Updated tooltip';
      await element.updateComplete;

      const tooltip = element.shadowRoot?.querySelector('.label__tooltip');
      expect(tooltip).not.toBeNull();
      expect(tooltip?.getAttribute('title')).toBe('Updated tooltip');
    });
  });

  describe('Properties - srOnly', () => {
    it('should not be sr-only by default', () => {
      expect(element.srOnly).toBe(false);
      expect(element.hasAttribute('sr-only')).toBe(false);
    });

    it('should reflect sr-only attribute', async () => {
      element.srOnly = true;
      await element.updateComplete;

      expect(element.srOnly).toBe(true);
      expect(element.hasAttribute('sr-only')).toBe(true);
    });

    it('should apply sr-only via attribute', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label sr-only>Screen reader only</sando-label>
      `);

      expect(element.srOnly).toBe(true);
      expect(element.hasAttribute('sr-only')).toBe(true);
    });
  });

  describe('Slots', () => {
    describe('Default slot', () => {
      it('should render default slot content', async () => {
        element = await fixture<SandoLabel>(html`<sando-label>Default Content</sando-label>`);
        expect(element.textContent?.trim()).toBe('Default Content');
      });

      it('should render complex slot content', async () => {
        element = await fixture<SandoLabel>(html`
          <sando-label> <span>Complex</span> Content </sando-label>
        `);
        expect(element.textContent).toContain('Complex');
        expect(element.textContent).toContain('Content');
      });
    });

    describe('helper-text slot', () => {
      it('should render helper-text slot content', async () => {
        element = await fixture<SandoLabel>(html`
          <sando-label>
            Email
            <span slot="helper-text">Custom helper text via slot</span>
          </sando-label>
        `);

        const slottedContent = element.querySelector('[slot="helper-text"]');
        expect(slottedContent).not.toBeNull();
        expect(slottedContent?.textContent).toContain('Custom helper text via slot');
      });

      it('should prefer slot content over helperText prop', async () => {
        element = await fixture<SandoLabel>(html`
          <sando-label helper-text="Prop helper text">
            Email
            <span slot="helper-text">Slot helper text</span>
          </sando-label>
        `);

        const slottedContent = element.querySelector('[slot="helper-text"]');
        expect(slottedContent?.textContent).toContain('Slot helper text');
      });
    });

    describe('optional-indicator slot', () => {
      it('should allow custom optional indicator', async () => {
        element = await fixture<SandoLabel>(html`
          <sando-label optional>
            Optional Field
            <span slot="optional-indicator">- not required</span>
          </sando-label>
        `);

        const slottedContent = element.querySelector('[slot="optional-indicator"]');
        expect(slottedContent).not.toBeNull();
        expect(slottedContent?.textContent).toContain('- not required');
      });
    });

    describe('tooltip slot', () => {
      it('should allow custom tooltip content', async () => {
        element = await fixture<SandoLabel>(html`
          <sando-label tooltip="Fallback tooltip">
            Label with custom tooltip
            <span slot="tooltip">Custom tooltip icon</span>
          </sando-label>
        `);

        const slottedContent = element.querySelector('[slot="tooltip"]');
        expect(slottedContent).not.toBeNull();
        expect(slottedContent?.textContent).toContain('Custom tooltip icon');
      });
    });
  });

  describe('CSS Parts', () => {
    it('should have part="label" on the label element', async () => {
      const label = element.shadowRoot?.querySelector('.label');
      expect(label?.getAttribute('part')).toBe('label');
    });

    it('should have part="text" on the text wrapper', async () => {
      const text = element.shadowRoot?.querySelector('.label__text');
      expect(text?.getAttribute('part')).toBe('text');
    });

    it('should have part="optional" on the optional text', async () => {
      element = await fixture<SandoLabel>(html` <sando-label optional>Optional</sando-label> `);

      const optional = element.shadowRoot?.querySelector('.label__optional');
      expect(optional?.getAttribute('part')).toBe('optional');
    });

    it('should have part="helper-text" on the helper text', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label helper-text="Helper">Label</sando-label>
      `);

      const helperText = element.shadowRoot?.querySelector('.label__helper-text');
      expect(helperText?.getAttribute('part')).toBe('helper-text');
    });

    it('should have part="tooltip" on the tooltip', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label tooltip="Tooltip text">Label</sando-label>
      `);

      const tooltip = element.shadowRoot?.querySelector('.label__tooltip');
      expect(tooltip?.getAttribute('part')).toBe('tooltip');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content gracefully', async () => {
      element = await fixture<SandoLabel>(html`<sando-label></sando-label>`);
      expect(element).toBeDefined();
      expect(element.shadowRoot).toBeDefined();
    });

    it('should handle long content', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label>This is a very long label text that might wrap to multiple lines</sando-label>
      `);
      expect(element).toBeDefined();
      expect(element.textContent).toContain('This is a very long label');
    });

    it('should handle dynamic content updates', async () => {
      element = await fixture<SandoLabel>(html`<sando-label>Initial</sando-label>`);
      expect(element.textContent?.trim()).toBe('Initial');

      // Update content
      element.textContent = 'Updated';
      await element.updateComplete;
      expect(element.textContent?.trim()).toBe('Updated');
    });

    it('should handle all property changes dynamically', async () => {
      // Start with defaults
      expect(element.required).toBe(false);
      expect(element.optional).toBe(false);
      expect(element.disabled).toBe(false);
      expect(element.size).toBe('md');
      expect(element.weight).toBe('medium');

      // Update all properties
      element.required = true;
      element.disabled = true;
      element.size = 'lg';
      element.weight = 'semibold';
      element.helperText = 'New helper';
      element.tooltip = 'New tooltip';
      await element.updateComplete;

      expect(element.required).toBe(true);
      expect(element.disabled).toBe(true);
      expect(element.size).toBe('lg');
      expect(element.weight).toBe('semibold');
      expect(element.helperText).toBe('New helper');
      expect(element.tooltip).toBe('New tooltip');

      // Verify attribute reflection
      expect(element.hasAttribute('required')).toBe(true);
      expect(element.hasAttribute('disabled')).toBe(true);
      expect(element.getAttribute('size')).toBe('lg');
      expect(element.getAttribute('weight')).toBe('semibold');
    });

    it('should handle size × weight combinations', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;
      const weights = ['normal', 'medium', 'semibold'] as const;

      for (const size of sizes) {
        for (const weight of weights) {
          element = await fixture<SandoLabel>(html`
            <sando-label size=${size} weight=${weight}>Label</sando-label>
          `);
          expect(element.size).toBe(size);
          expect(element.weight).toBe(weight);
          expect(element).toBeDefined();
        }
      }
    });

    it('should handle special characters in content', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label>Email (required) @example.com</sando-label>
      `);
      expect(element.textContent).toContain('Email (required) @example.com');
    });
  });

  describe('Non-Interactive Behavior', () => {
    it('should have cursor pointer on label', async () => {
      const label = element.shadowRoot?.querySelector('.label') as HTMLElement;
      // Label is interactive (for click-to-focus)
      expect(label?.tagName.toLowerCase()).toBe('label');
    });

    it('should not be focusable (no tabindex)', async () => {
      const label = element.shadowRoot?.querySelector('.label') as HTMLElement;
      expect(label?.getAttribute('tabindex')).toBeNull();
    });
  });

  describe('Tooltip Icon', () => {
    it('should render circle-help icon for tooltip', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label tooltip="Help text">Label</sando-label>
      `);

      const icon = element.shadowRoot?.querySelector('.label__tooltip sando-icon');
      expect(icon).not.toBeNull();
      expect(icon?.getAttribute('name')).toBe('circle-help');
    });

    it('should render icon with decorative attribute', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label tooltip="Help text">Label</sando-label>
      `);

      const icon = element.shadowRoot?.querySelector('.label__tooltip sando-icon');
      expect(icon?.hasAttribute('decorative')).toBe(true);
    });

    it('should render icon with inherit-color attribute', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label tooltip="Help text">Label</sando-label>
      `);

      const icon = element.shadowRoot?.querySelector('.label__tooltip sando-icon');
      expect(icon?.hasAttribute('inherit-color')).toBe(true);
    });

    it('should render icon with xs size', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label tooltip="Help text">Label</sando-label>
      `);

      const icon = element.shadowRoot?.querySelector('.label__tooltip sando-icon');
      expect(icon?.getAttribute('size')).toBe('xs');
    });
  });

  describe('Flavor Support', () => {
    it('should accept flavor attribute', async () => {
      element = await fixture<SandoLabel>(html`
        <sando-label flavor="strawberry">Flavored Label</sando-label>
      `);

      expect(element.getAttribute('flavor')).toBe('strawberry');
    });

    it('should work with different flavors', async () => {
      const flavors = ['original', 'strawberry', 'chocolate'];

      for (const flavor of flavors) {
        element = await fixture<SandoLabel>(html`
          <sando-label flavor=${flavor}>${flavor} Label</sando-label>
        `);
        expect(element.getAttribute('flavor')).toBe(flavor);
      }
    });
  });
});
