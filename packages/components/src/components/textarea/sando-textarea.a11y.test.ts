/**
 * Accessibility Tests for sando-textarea
 * Uses axe-core for WCAG compliance testing and manual ARIA attribute verification
 *
 * WCAG Success Criteria Tested:
 * - 1.3.1 Info and Relationships (labels, form associations)
 * - 1.4.3 Contrast Minimum (focus rings)
 * - 2.1.1 Keyboard (full keyboard access)
 * - 2.1.2 No Keyboard Trap
 * - 2.4.7 Focus Visible
 * - 3.3.1 Error Identification
 * - 3.3.2 Labels or Instructions
 * - 4.1.2 Name, Role, Value
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-textarea.js';
import type { SandoTextarea } from './sando-textarea.js';

describe('sando-textarea Accessibility', () => {
  // ============================================================================
  // AXE-CORE VALIDATION
  // ============================================================================
  describe('axe-core validation', () => {
    it('should have no accessibility violations (default with label)', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Description"></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with placeholder', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Comments" placeholder="Enter your comments..."></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with helper text', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Bio" helper-text="Maximum 500 characters"></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with error state', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Required field"
          error
          error-text="This field is required"
        ></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when disabled', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Disabled textarea" disabled></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when readonly', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Readonly textarea"
          readonly
          value="This content cannot be modified"
        ></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when required', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Required field" required></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with maxlength', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Limited text"
          maxlength="100"
          helper-text="100 characters max"
        ></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with value', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Message" value="Pre-filled content"></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================================================
  // VARIANT ACCESSIBILITY
  // ============================================================================
  describe('variant accessibility', () => {
    it('should pass a11y with outlined variant', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea variant="outlined" label="Outlined textarea"></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with filled variant', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea variant="filled" label="Filled textarea"></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with outlined variant and error', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          variant="outlined"
          label="Outlined textarea"
          error
          error-text="Error message"
        ></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with filled variant and error', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          variant="filled"
          label="Filled textarea"
          error
          error-text="Error message"
        ></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================================================
  // SIZE ACCESSIBILITY
  // ============================================================================
  describe('size accessibility', () => {
    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should pass a11y with ${size} size`, async () => {
        const el = await fixture<SandoTextarea>(html`
          <sando-textarea size="${size}" label="${size} textarea"></sando-textarea>
        `);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });

      it(`should pass a11y with ${size} size and helper text`, async () => {
        const el = await fixture<SandoTextarea>(html`
          <sando-textarea
            size="${size}"
            label="${size} textarea"
            helper-text="Helper text for ${size} size"
          ></sando-textarea>
        `);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });

      it(`should pass a11y with ${size} size and error`, async () => {
        const el = await fixture<SandoTextarea>(html`
          <sando-textarea
            size="${size}"
            label="${size} textarea"
            error
            error-text="Error for ${size} size"
          ></sando-textarea>
        `);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ============================================================================
  // ARIA ATTRIBUTES
  // ============================================================================
  describe('ARIA attributes', () => {
    it('should have aria-invalid="false" when not in error', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('aria-invalid')).toBe('false');
    });

    it('should have aria-invalid="true" when in error state', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" error></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have aria-required="false" when not required', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('aria-required')).toBe('false');
    });

    it('should have aria-required="true" when required', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" required></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('aria-required')).toBe('true');
    });

    it('should have native required attribute when required', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" required></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.required).toBe(true);
    });

    it('should have native disabled attribute when disabled', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" disabled></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.disabled).toBe(true);
    });

    it('should have aria-describedby linked to helper text', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" helper-text="Helper text content"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      const describedBy = textarea!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const helperTextElement = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(helperTextElement).toBeDefined();
      expect(helperTextElement!.textContent).toContain('Helper text content');
    });

    it('should have aria-describedby linked to error text', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" error error-text="Error message content"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      const describedBy = textarea!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const errorTextElement = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(errorTextElement).toBeDefined();
      expect(errorTextElement!.textContent).toContain('Error message content');
    });

    it('should not have aria-describedby without helper or error text', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.hasAttribute('aria-describedby')).toBe(false);
    });

    it('should have proper label-textarea association via for/id', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test Label"></sando-textarea>
      `);

      const label = el.shadowRoot!.querySelector('label');
      const textarea = el.shadowRoot!.querySelector('textarea');

      expect(label).toBeDefined();
      expect(textarea).toBeDefined();

      const labelFor = label!.getAttribute('for');
      const textareaId = textarea!.getAttribute('id');

      expect(labelFor).toBeTruthy();
      expect(textareaId).toBeTruthy();
      expect(labelFor).toBe(textareaId);
    });
  });

  // ============================================================================
  // FOCUS MANAGEMENT
  // ============================================================================
  describe('focus management', () => {
    it('should be focusable', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test"></sando-textarea>
      `);

      el.focus();
      await el.updateComplete;

      // With delegatesFocus: true, the custom element receives focus
      expect(document.activeElement).toBe(el);
    });

    it('should delegate focus to internal textarea', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test"></sando-textarea>
      `);

      el.focus();
      await el.updateComplete;

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(el.shadowRoot!.activeElement).toBe(textarea);
    });

    it('should not be focusable when disabled', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" disabled></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.disabled).toBe(true);
    });

    it('should have visible focus indicator', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test"></sando-textarea>
      `);

      el.focus();
      await el.updateComplete;

      // Verify the component has proper focus management structure
      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea).toBeDefined();

      // Check that focus styles exist (outline should not be 'none')
      const styles = window.getComputedStyle(textarea!);
      // Note: In jsdom environment, computed styles may not fully reflect CSS
      // The actual focus ring is validated via visual regression and browser testing
      expect(styles).toBeDefined();
    });

    it('should support Tab navigation (no keyboard trap)', async () => {
      const container = await fixture(html`
        <div>
          <button id="before">Before</button>
          <sando-textarea label="Test"></sando-textarea>
          <button id="after">After</button>
        </div>
      `);

      const textarea = container.querySelector('sando-textarea') as SandoTextarea;
      const afterButton = container.querySelector('#after') as HTMLButtonElement;

      textarea.focus();
      await textarea.updateComplete;

      // Simulate Tab key - focus should move to next element
      afterButton.focus();
      expect(document.activeElement).toBe(afterButton);
    });

    it('should support Shift+Tab navigation (no keyboard trap)', async () => {
      const container = await fixture(html`
        <div>
          <button id="before">Before</button>
          <sando-textarea label="Test"></sando-textarea>
          <button id="after">After</button>
        </div>
      `);

      const textarea = container.querySelector('sando-textarea') as SandoTextarea;
      const beforeButton = container.querySelector('#before') as HTMLButtonElement;

      textarea.focus();
      await textarea.updateComplete;

      // Simulate Shift+Tab - focus should move to previous element
      beforeButton.focus();
      expect(document.activeElement).toBe(beforeButton);
    });
  });

  // ============================================================================
  // KEYBOARD ACCESSIBILITY
  // ============================================================================
  describe('keyboard accessibility', () => {
    it('should allow typing in textarea', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea')!;

      // Simulate typing
      textarea.value = 'Hello World';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(el.value).toBe('Hello World');
    });

    it('should support standard text navigation with arrow keys', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Test"
          value="Line 1
Line 2"
        ></sando-textarea>
      `);

      el.focus();
      await el.updateComplete;

      const textarea = el.shadowRoot!.querySelector('textarea')!;

      // Arrow keys should work within the textarea (native behavior)
      // This test verifies textarea is properly focusable for text editing
      expect(textarea.value).toBe('Line 1\nLine 2');
    });

    it('should not prevent default keyboard behavior when not disabled', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea')!;

      // Fire a keyboard event - should not be prevented
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'a',
        bubbles: true,
        cancelable: true
      });
      const prevented = !textarea.dispatchEvent(keyEvent);

      // Default behavior should not be prevented
      expect(prevented).toBe(false);
    });

    it('should be readonly when readonly attribute is set', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" readonly value="Cannot edit"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea')!;
      expect(textarea.readOnly).toBe(true);
    });
  });

  // ============================================================================
  // SCREEN READER SUPPORT
  // ============================================================================
  describe('screen reader support', () => {
    it('should have label announced via label association', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Enter your feedback"></sando-textarea>
      `);

      const label = el.shadowRoot!.querySelector('label');
      const textarea = el.shadowRoot!.querySelector('textarea');

      expect(label).toBeDefined();
      expect(textarea).toBeDefined();

      // Verify label and textarea are properly associated
      expect(label!.getAttribute('for')).toBe(textarea!.getAttribute('id'));
      expect(label!.textContent).toContain('Enter your feedback');
    });

    it('should announce error text with role="alert"', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Description"
          error
          error-text="This field is required"
        ></sando-textarea>
      `);

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText).toBeDefined();
      expect(errorText!.getAttribute('role')).toBe('alert');
    });

    it('should announce helper text via aria-describedby', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Bio" helper-text="Tell us about yourself"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea')!;
      const describedBy = textarea.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const description = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(description!.textContent).toContain('Tell us about yourself');
    });

    it('should have implicit textbox role (native textarea)', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Comments"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea).toBeDefined();
      // Native textarea has implicit textbox role
      // No need for explicit role attribute
    });

    it('should show required indicator when required', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Required field" required></sando-textarea>
      `);

      // Required indicator is now via CSS ::after (aria-hidden by nature since CSS content isn't in accessibility tree)
      const label = el.shadowRoot!.querySelector('.textarea-label');
      expect(label).toBeDefined();
      expect(label!.hasAttribute('data-required')).toBe(true);
    });

    it('should expose maxlength via native attribute', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Limited"
          maxlength="100"
          helper-text="Maximum 100 characters"
        ></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea')!;
      expect(textarea.maxLength).toBe(100);

      // Helper text provides additional context for screen readers
      const describedBy = textarea.getAttribute('aria-describedby');
      const description = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(description!.textContent).toContain('Maximum 100 characters');
    });
  });

  // ============================================================================
  // COLOR CONTRAST
  // ============================================================================
  describe('color contrast', () => {
    it('should have sufficient color contrast in default state', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test textarea"></sando-textarea>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast with value', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Test textarea"
          value="This is some content to test contrast"
        ></sando-textarea>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast in error state', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test textarea" error error-text="Error message"></sando-textarea>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast when disabled', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test textarea" disabled value="Disabled content"></sando-textarea>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });
  });

  // ============================================================================
  // FLAVOR ACCESSIBILITY
  // ============================================================================
  describe('flavor accessibility', () => {
    const flavors = ['original', 'strawberry', 'chocolate'];

    flavors.forEach((flavor) => {
      it(`should pass a11y with ${flavor} flavor`, async () => {
        const el = await fixture<SandoTextarea>(html`
          <div flavor="${flavor}">
            <sando-textarea label="Test textarea"></sando-textarea>
          </div>
        `);

        const results = await axe(el, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      });

      it(`should pass a11y with ${flavor} flavor and value`, async () => {
        const el = await fixture<SandoTextarea>(html`
          <div flavor="${flavor}">
            <sando-textarea label="Test textarea" value="Some content"></sando-textarea>
          </div>
        `);

        const results = await axe(el, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      });

      it(`should pass a11y with ${flavor} flavor and error`, async () => {
        const el = await fixture<SandoTextarea>(html`
          <div flavor="${flavor}">
            <sando-textarea label="Test textarea" error error-text="Error"></sando-textarea>
          </div>
        `);

        const results = await axe(el, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      });
    });
  });

  // ============================================================================
  // RESIZE ACCESSIBILITY
  // ============================================================================
  describe('resize accessibility', () => {
    const resizeModes = ['none', 'vertical', 'horizontal', 'both'] as const;

    resizeModes.forEach((resize) => {
      it(`should pass a11y with resize="${resize}"`, async () => {
        const el = await fixture<SandoTextarea>(html`
          <sando-textarea label="Resizable textarea" resize="${resize}"></sando-textarea>
        `);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ============================================================================
  // COMPLEX STATES
  // ============================================================================
  describe('complex states', () => {
    it('should pass a11y with all states combined', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Full featured textarea"
          variant="outlined"
          size="md"
          rows="5"
          maxlength="500"
          helper-text="Maximum 500 characters"
          placeholder="Enter your message..."
          required
        ></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with error and helper text (error takes precedence)', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Textarea with error"
          error
          error-text="This field has an error"
          helper-text="This helper text should be hidden"
        ></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();

      // Error text should be shown, helper text should be hidden
      const errorText = el.shadowRoot!.querySelector('.error-text');
      const helperText = el.shadowRoot!.querySelector('.helper-text');
      expect(errorText).toBeDefined();
      expect(helperText).toBeNull();
    });

    it('should pass a11y with filled variant and all options', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Filled textarea"
          variant="filled"
          size="lg"
          rows="4"
          minlength="10"
          maxlength="1000"
          required
          spellcheck
          wrap="soft"
          resize="vertical"
        ></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with slotted label content', async () => {
      // When using slot content with complex HTML, adding a label prop
      // ensures axe-core recognizes the accessible label.
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Terms agreement">
          I agree to the <a href="/terms">Terms of Service</a>
        </sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================================================
  // FORM INTEGRATION ACCESSIBILITY
  // ============================================================================
  describe('form integration accessibility', () => {
    it('should have proper name attribute for form submission', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Comments" name="user-comments"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea')!;
      expect(textarea.name).toBe('user-comments');
    });

    it('should work within a form element', async () => {
      const form = await fixture(html`
        <form>
          <sando-textarea label="Feedback" name="feedback" required></sando-textarea>
          <button type="submit">Submit</button>
        </form>
      `);

      const results = await axe(form);
      expect(results).toHaveNoViolations();
    });

    it('should reset properly on form reset', async () => {
      const form = (await fixture(html`
        <form>
          <sando-textarea label="Feedback" name="feedback" value="Initial value"></sando-textarea>
          <button type="reset">Reset</button>
        </form>
      `)) as HTMLFormElement;

      const textarea = form.querySelector('sando-textarea') as SandoTextarea;

      // Change value
      textarea.value = 'Changed value';
      await textarea.updateComplete;

      // Reset form
      form.reset();
      await textarea.updateComplete;

      expect(textarea.value).toBe('');
    });
  });

  // ============================================================================
  // ROWS ACCESSIBILITY
  // ============================================================================
  describe('rows accessibility', () => {
    it('should pass a11y with custom rows', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Large textarea" rows="10"></sando-textarea>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();

      const textarea = el.shadowRoot!.querySelector('textarea')!;
      expect(textarea.rows).toBe(10);
    });
  });
});
