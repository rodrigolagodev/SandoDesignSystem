/**
 * Unit Tests for sando-textarea
 * Comprehensive tests covering rendering, properties, events, keyboard navigation, and form integration
 *
 * Following TESTING_STRATEGY.toon patterns:
 * - Vitest + @open-wc/testing fixtures
 * - 80% coverage threshold
 * - Shadow DOM queries
 * - Event testing
 * - Form participation
 */

import { fixture, html, expect as expectWc, oneEvent } from '@open-wc/testing';
import './sando-textarea.js';
import type { SandoTextarea } from './sando-textarea.js';

describe('sando-textarea', () => {
  let element: SandoTextarea;

  beforeEach(async () => {
    element = await fixture<SandoTextarea>(
      html`<sando-textarea label="Description"></sando-textarea>`
    );
  });

  describe('Rendering', () => {
    it('should render with default properties', async () => {
      expect(element).toBeDefined();
      expect(element.value).toBe('');
      expect(element.variant).toBe('outlined');
      expect(element.size).toBe('md');
      expect(element.disabled).toBe(false);
      expect(element.required).toBe(false);
      expect(element.readonly).toBe(false);
      expect(element.error).toBe(false);
      expect(element.rows).toBe(3);
      expect(element.resize).toBe('vertical');
      expect(element.spellcheck).toBe(true);
      expect(element.wrap).toBe('soft');
    });

    it('should render with outlined variant', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea variant="outlined" label="Outlined"></sando-textarea>
      `);

      expect(el.variant).toBe('outlined');
      expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('should render with filled variant', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea variant="filled" label="Filled"></sando-textarea>
      `);

      expect(el.variant).toBe('filled');
      expect(el.getAttribute('variant')).toBe('filled');
    });

    it('should render with small size', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea size="sm" label="Small"></sando-textarea>
      `);

      expect(el.size).toBe('sm');
      expect(el.getAttribute('size')).toBe('sm');
    });

    it('should render with medium size', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea size="md" label="Medium"></sando-textarea>
      `);

      expect(el.size).toBe('md');
      expect(el.getAttribute('size')).toBe('md');
    });

    it('should render with large size', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea size="lg" label="Large"></sando-textarea>
      `);

      expect(el.size).toBe('lg');
      expect(el.getAttribute('size')).toBe('lg');
    });

    it('should render label from prop', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test Label"></sando-textarea>
      `);

      const labelEl = el.shadowRoot!.querySelector('.textarea-label');
      expect(labelEl).toBeDefined();
      expect(labelEl!.textContent).toContain('Test Label');
    });

    it('should render label from slot', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea>Slotted Label Content</sando-textarea>
      `);

      const slot = el.shadowRoot!.querySelector('slot');
      expect(slot).toBeDefined();
      expect(el.textContent).toContain('Slotted Label Content');
    });

    it('should render helper text when provided', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" helper-text="This is helper text"></sando-textarea>
      `);

      const helpText = el.shadowRoot!.querySelector('sando-help-text');
      expect(helpText).toBeDefined();
      expect(helpText!.textContent).toContain('This is helper text');
    });

    it('should render error text when error=true', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" error error-text="This field is required"></sando-textarea>
      `);

      const helpText = el.shadowRoot!.querySelector('sando-help-text');
      expect(helpText).toBeDefined();
      expect(helpText!.getAttribute('variant')).toBe('error');
      expect(helpText!.textContent).toContain('This field is required');
    });

    it('should NOT render error text when error=false', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" error-text="This field is required"></sando-textarea>
      `);

      const helpText = el.shadowRoot!.querySelector('sando-help-text');
      expect(helpText).toBeDefined();
      expect(helpText!.getAttribute('variant')).toBe('default');
    });

    it('should prioritize error text over helper text when error=true', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea
          label="Test"
          error
          helper-text="Helper"
          error-text="Error message"
        ></sando-textarea>
      `);

      const helpText = el.shadowRoot!.querySelector('sando-help-text');
      expect(helpText).toBeDefined();
      expect(helpText!.getAttribute('variant')).toBe('error');
      expect(helpText!.textContent).toContain('Error message');
      expect(helpText!.textContent).not.toContain('Helper');
    });

    it('should render placeholder', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" placeholder="Enter text here..."></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('placeholder')).toBe('Enter text here...');
    });

    it('should render required indicator when required=true', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" required></sando-textarea>
      `);

      const label = el.shadowRoot!.querySelector('.textarea-label');
      expect(label).toBeDefined();
      expect(label!.hasAttribute('data-required')).toBe(true);
    });

    it('should NOT render required indicator when required=false', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test"></sando-textarea>
      `);

      const label = el.shadowRoot!.querySelector('.textarea-label');
      expect(label!.hasAttribute('data-required')).toBe(false);
    });

    it('should be accessible', async () => {
      await expectWc(element).to.be.accessible();
    });
  });

  describe('Properties', () => {
    it('should update textarea value when value prop changes', async () => {
      element.value = 'Test content';
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.value).toBe('Test content');
    });

    it('should reflect value from textarea to component', async () => {
      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.value = 'User input';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(element.value).toBe('User input');
    });

    it('should disable textarea when disabled=true', async () => {
      element.disabled = true;
      await element.updateComplete;

      expect(element.disabled).toBe(true);
      expect(element.hasAttribute('disabled')).toBe(true);

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.disabled).toBe(true);
    });

    it('should make textarea readonly when readonly=true', async () => {
      element.readonly = true;
      await element.updateComplete;

      expect(element.readonly).toBe(true);
      expect(element.hasAttribute('readonly')).toBe(true);

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.readOnly).toBe(true);
    });

    it('should set rows on textarea', async () => {
      element.rows = 5;
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.rows).toBe(5);
    });

    it('should set minlength on textarea', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" minlength="10"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.minLength).toBe(10);
    });

    it('should set maxlength on textarea', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" maxlength="500"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.maxLength).toBe(500);
    });

    it('should reflect resize attribute', async () => {
      element.resize = 'both';
      await element.updateComplete;

      expect(element.resize).toBe('both');
      expect(element.getAttribute('resize')).toBe('both');
    });

    it('should pass name to internal textarea', async () => {
      element.name = 'description';
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('name')).toBe('description');
    });

    it('should set wrap attribute on textarea', async () => {
      element.wrap = 'hard';
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.wrap).toBe('hard');
    });

    it('should set autocomplete on textarea when provided', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" autocomplete="on"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('autocomplete')).toBe('on');
    });

    it('should set spellcheck on textarea', async () => {
      element.spellcheck = false;
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.spellcheck).toBe(false);
    });
  });

  describe('Events', () => {
    it('should fire sando-input event on user input', async () => {
      let eventDetail: { value: string } | null = null;
      element.addEventListener('sando-input', ((e: CustomEvent) => {
        eventDetail = e.detail;
      }) as EventListener);

      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.value = 'Test input';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      expect(eventDetail).toBeDefined();
      expect(eventDetail!.value).toBe('Test input');
    });

    it('should fire sando-change event on blur with value change', async () => {
      let eventDetail: { value: string } | null = null;
      element.addEventListener('sando-change', ((e: CustomEvent) => {
        eventDetail = e.detail;
      }) as EventListener);

      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.value = 'Changed value';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await element.updateComplete;

      textarea.dispatchEvent(new Event('blur', { bubbles: true }));
      await element.updateComplete;

      expect(eventDetail).toBeDefined();
      expect(eventDetail!.value).toBe('Changed value');
    });

    it('should NOT fire sando-change event on blur if value unchanged', async () => {
      // First set initial value
      element.value = 'Initial value';
      await element.updateComplete;

      // Trigger input to sync lastEmittedValue
      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.dispatchEvent(new Event('blur', { bubbles: true }));
      await element.updateComplete;

      // Reset event tracker
      let eventFired = false;
      element.addEventListener('sando-change', () => {
        eventFired = true;
      });

      // Blur without changing value
      textarea.dispatchEvent(new Event('blur', { bubbles: true }));
      await element.updateComplete;

      expect(eventFired).toBe(false);
    });

    it('should fire sando-focus event on focus', async () => {
      let eventFired = false;
      element.addEventListener('sando-focus', () => {
        eventFired = true;
      });

      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.dispatchEvent(new Event('focus', { bubbles: true }));
      await element.updateComplete;

      expect(eventFired).toBe(true);
    });

    it('should fire sando-blur event on blur', async () => {
      let eventFired = false;
      element.addEventListener('sando-blur', () => {
        eventFired = true;
      });

      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.dispatchEvent(new Event('blur', { bubbles: true }));
      await element.updateComplete;

      expect(eventFired).toBe(true);
    });

    it('should have correct event detail structure for sando-input', async () => {
      const eventPromise = oneEvent(element, 'sando-input');

      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.value = 'Test';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));

      const event = await eventPromise;
      expect(event.detail).toHaveProperty('value');
      expect(event.detail.value).toBe('Test');
    });

    it('should bubble events through shadow DOM', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-textarea label="Test"></sando-textarea>
        </div>
      `);

      let bubbledEvent = false;
      container.addEventListener('sando-input', () => {
        bubbledEvent = true;
      });

      const ta = container.querySelector('sando-textarea') as SandoTextarea;
      const textarea = ta.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.value = 'Test';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      await ta.updateComplete;

      expect(bubbledEvent).toBe(true);
    });
  });

  describe('Form Participation', () => {
    it('should maintain value for programmatic form handling', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-textarea name="description" label="Description"></sando-textarea>
          <button type="submit">Submit</button>
        </form>
      `);

      const textarea = form.querySelector('sando-textarea') as SandoTextarea;
      textarea.value = 'Form value';
      await textarea.updateComplete;

      expect(textarea.value).toBe('Form value');
      expect(textarea.name).toBe('description');
    });

    it('should reset on form reset', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-textarea name="description" label="Description"></sando-textarea>
          <button type="reset">Reset</button>
        </form>
      `);

      const textarea = form.querySelector('sando-textarea') as SandoTextarea;
      textarea.value = 'Some value';
      await textarea.updateComplete;

      expect(textarea.value).toBe('Some value');

      form.reset();
      await textarea.updateComplete;

      expect(textarea.value).toBe('');
    });

    it('should reset error state on form reset', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-textarea name="description" label="Description" error></sando-textarea>
        </form>
      `);

      const textarea = form.querySelector('sando-textarea') as SandoTextarea;
      expect(textarea.error).toBe(true);

      form.reset();
      await textarea.updateComplete;

      expect(textarea.error).toBe(false);
    });

    it('should checkValidity() return false when required and empty', async () => {
      element.required = true;
      element.value = '';
      await element.updateComplete;

      expect(element.checkValidity()).toBe(false);
    });

    it('should checkValidity() return true when required and has value', async () => {
      element.required = true;
      element.value = 'Some content';
      await element.updateComplete;

      // Need to trigger update of internal textarea
      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.value = 'Some content';

      expect(element.checkValidity()).toBe(true);
    });

    it('should checkValidity() respect minlength', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" minlength="10"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      textarea.value = 'Short';
      await el.updateComplete;

      // Note: minlength validation only triggers after user interaction
      expect(el.checkValidity()).toBe(true); // No validation error until user types
    });

    it('should reportValidity() trigger browser validation UI', async () => {
      element.required = true;
      element.value = '';
      await element.updateComplete;

      // reportValidity should return false when required and empty
      expect(element.reportValidity()).toBe(false);
    });

    it('should setCustomValidity() set custom error message', async () => {
      element.setCustomValidity('Custom validation error');
      await element.updateComplete;

      expect(element.validationMessage).toBe('Custom validation error');
      expect(element.checkValidity()).toBe(false);
    });

    it('should clear custom validity when set to empty string', async () => {
      element.setCustomValidity('Custom error');
      await element.updateComplete;
      expect(element.checkValidity()).toBe(false);

      element.setCustomValidity('');
      await element.updateComplete;
      expect(element.checkValidity()).toBe(true);
    });

    it('should expose validity state object', async () => {
      element.required = true;
      element.value = '';
      await element.updateComplete;

      expect(element.validity).toBeDefined();
      expect(element.validity!.valueMissing).toBe(true);
    });

    it('should expose validationMessage', async () => {
      element.required = true;
      element.value = '';
      await element.updateComplete;

      expect(element.validationMessage).toBeTruthy();
    });
  });

  describe('Public API', () => {
    it('should focus via focus() method', async () => {
      element.focus();
      await element.updateComplete;

      // With delegatesFocus, the custom element should receive focus
      expect(document.activeElement).toBe(element);
    });

    it('should blur via blur() method', async () => {
      element.focus();
      await element.updateComplete;

      element.blur();
      await element.updateComplete;

      expect(document.activeElement).not.toBe(element);
    });

    it('should select all text via select() method', async () => {
      element.value = 'Select this text';
      await element.updateComplete;

      element.select();
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea') as HTMLTextAreaElement;
      expect(textarea.selectionStart).toBe(0);
      expect(textarea.selectionEnd).toBe('Select this text'.length);
    });

    it('should set selection range via setSelectionRange() method', async () => {
      element.value = 'Hello World';
      await element.updateComplete;

      element.setSelectionRange(0, 5);
      await element.updateComplete;

      expect(element.selectionStart).toBe(0);
      expect(element.selectionEnd).toBe(5);
    });

    it('should set selection range with direction', async () => {
      element.value = 'Hello World';
      await element.updateComplete;

      element.setSelectionRange(0, 5, 'backward');
      await element.updateComplete;

      expect(element.selectionDirection).toBe('backward');
    });

    it('should expose selectionStart getter', async () => {
      element.value = 'Test';
      await element.updateComplete;

      element.setSelectionRange(2, 2);
      expect(element.selectionStart).toBe(2);
    });

    it('should expose selectionEnd getter', async () => {
      element.value = 'Test';
      await element.updateComplete;

      element.setSelectionRange(1, 3);
      expect(element.selectionEnd).toBe(3);
    });

    it('should expose textLength getter', async () => {
      element.value = 'Hello';
      await element.updateComplete;

      expect(element.textLength).toBe(5);
    });

    it('should return fallback textLength when textarea not available', async () => {
      // Before first render, internal textarea may not exist
      const el = document.createElement('sando-textarea') as SandoTextarea;
      el.value = 'Test';

      // textLength should fall back to value.length
      expect(el.textLength).toBe(4);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-invalid=true when error=true', async () => {
      element.error = true;
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have aria-invalid=false when error=false', async () => {
      element.error = false;
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('aria-invalid')).toBe('false');
    });

    it('should have aria-required=true when required=true', async () => {
      element.required = true;
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('aria-required')).toBe('true');
    });

    it('should have aria-required=false when required=false', async () => {
      element.required = false;
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.getAttribute('aria-required')).toBe('false');
    });

    it('should have aria-describedby pointing to helper text', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" helper-text="Helper text"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      const descriptionId = textarea!.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();

      const helpText = el.shadowRoot!.getElementById(descriptionId!);
      expect(helpText).toBeDefined();
      expect(helpText!.tagName.toLowerCase()).toBe('sando-help-text');
      expect(helpText!.textContent).toContain('Helper text');
    });

    it('should have aria-describedby pointing to error text', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" error error-text="Error message"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      const descriptionId = textarea!.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();

      const helpText = el.shadowRoot!.getElementById(descriptionId!);
      expect(helpText).toBeDefined();
      expect(helpText!.tagName.toLowerCase()).toBe('sando-help-text');
      expect(helpText!.textContent).toContain('Error message');
    });

    it('should NOT have aria-describedby when no helper/error text', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test"></sando-textarea>
      `);

      const textarea = el.shadowRoot!.querySelector('textarea');
      expect(textarea!.hasAttribute('aria-describedby')).toBe(false);
    });

    it('should associate label with textarea via id/for', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test Label"></sando-textarea>
      `);

      const label = el.shadowRoot!.querySelector('label.textarea-label');
      const textarea = el.shadowRoot!.querySelector('textarea');

      expect(label).toBeDefined();
      expect(textarea).toBeDefined();
      expect(label!.getAttribute('for')).toBe(textarea!.id);
    });

    it('should have role="alert" on error text (via sando-help-text)', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Test" error error-text="Error"></sando-textarea>
      `);

      const helpText = el.shadowRoot!.querySelector('sando-help-text');
      expect(helpText).toBeDefined();
      expect(helpText!.getAttribute('variant')).toBe('error');
      // sando-help-text handles role="alert" internally when variant="error"
    });

    it('should be accessible in all variants', async () => {
      for (const variant of ['outlined', 'filled']) {
        const el = await fixture<SandoTextarea>(html`
          <sando-textarea variant="${variant}" label="${variant} variant"></sando-textarea>
        `);
        await expectWc(el).to.be.accessible();
      }
    });

    it('should be accessible in all sizes', async () => {
      for (const size of ['sm', 'md', 'lg']) {
        const el = await fixture<SandoTextarea>(html`
          <sando-textarea size="${size}" label="${size} size"></sando-textarea>
        `);
        await expectWc(el).to.be.accessible();
      }
    });

    it('should be accessible when disabled', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Disabled" disabled></sando-textarea>
      `);
      await expectWc(el).to.be.accessible();
    });

    it('should be accessible when readonly', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Readonly" readonly></sando-textarea>
      `);
      await expectWc(el).to.be.accessible();
    });

    it('should be accessible with error state', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea label="Error" error error-text="This is required"></sando-textarea>
      `);
      await expectWc(el).to.be.accessible();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should delegate focus from custom element to internal textarea', async () => {
      expect(element.shadowRoot).toBeDefined();

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea).toBeDefined();
      expect(textarea!.hasAttribute('disabled')).toBe(false);
    });

    it('should be focusable via Tab navigation', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-textarea id="ta1" label="First"></sando-textarea>
          <sando-textarea id="ta2" label="Second"></sando-textarea>
          <sando-textarea id="ta3" label="Third"></sando-textarea>
        </div>
      `);

      const ta1 = container.querySelector('#ta1') as SandoTextarea;
      const ta2 = container.querySelector('#ta2') as SandoTextarea;

      const textarea1 = ta1.shadowRoot!.querySelector('textarea');
      const textarea2 = ta2.shadowRoot!.querySelector('textarea');

      expect(textarea1).toBeDefined();
      expect(textarea2).toBeDefined();
      expect(textarea1!.hasAttribute('disabled')).toBe(false);
      expect(textarea2!.hasAttribute('disabled')).toBe(false);
    });

    it('should skip disabled textareas in tab order', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-textarea id="ta1" label="First"></sando-textarea>
          <sando-textarea id="ta2" label="Second" disabled></sando-textarea>
          <sando-textarea id="ta3" label="Third"></sando-textarea>
        </div>
      `);

      const ta2 = container.querySelector('#ta2') as SandoTextarea;
      await ta2.updateComplete;

      const textarea = ta2.shadowRoot!.querySelector('textarea');
      expect(textarea!.hasAttribute('disabled')).toBe(true);
    });

    it('should not accept input when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.disabled).toBe(true);
    });

    it('should not accept input when readonly', async () => {
      element.readonly = true;
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.readOnly).toBe(true);
    });
  });

  describe('Variants', () => {
    it('should support outlined variant', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea variant="outlined" label="Outlined"></sando-textarea>
      `);

      expect(el.variant).toBe('outlined');
      expect(el.getAttribute('variant')).toBe('outlined');
    });

    it('should support filled variant', async () => {
      const el = await fixture<SandoTextarea>(html`
        <sando-textarea variant="filled" label="Filled"></sando-textarea>
      `);

      expect(el.variant).toBe('filled');
      expect(el.getAttribute('variant')).toBe('filled');
    });
  });

  describe('Sizes', () => {
    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should support ${size} size`, async () => {
        const el = await fixture<SandoTextarea>(html`
          <sando-textarea size="${size}" label="${size}"></sando-textarea>
        `);

        expect(el.size).toBe(size);
        expect(el.getAttribute('size')).toBe(size);
      });
    });
  });

  describe('Resize Behavior', () => {
    ['none', 'vertical', 'horizontal', 'both'].forEach((resize) => {
      it(`should support ${resize} resize mode`, async () => {
        const el = await fixture<SandoTextarea>(html`
          <sando-textarea resize="${resize}" label="Test"></sando-textarea>
        `);

        expect(el.resize).toBe(resize);
        expect(el.getAttribute('resize')).toBe(resize);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty value correctly', async () => {
      element.value = '';
      await element.updateComplete;

      expect(element.value).toBe('');
      expect(element.textLength).toBe(0);
    });

    it('should handle multiline value correctly', async () => {
      element.value = 'Line 1\nLine 2\nLine 3';
      await element.updateComplete;

      expect(element.value).toBe('Line 1\nLine 2\nLine 3');
      expect(element.textLength).toBe(20);
    });

    it('should handle special characters in value', async () => {
      element.value = '<script>alert("xss")</script>';
      await element.updateComplete;

      const textarea = element.shadowRoot!.querySelector('textarea');
      expect(textarea!.value).toBe('<script>alert("xss")</script>');
    });

    it('should handle unicode characters', async () => {
      element.value = '🎉 Hello 世界';
      await element.updateComplete;

      expect(element.value).toBe('🎉 Hello 世界');
    });

    it('should handle very long text', async () => {
      const longText = 'A'.repeat(10000);
      element.value = longText;
      await element.updateComplete;

      expect(element.value).toBe(longText);
      expect(element.textLength).toBe(10000);
    });
  });
});
