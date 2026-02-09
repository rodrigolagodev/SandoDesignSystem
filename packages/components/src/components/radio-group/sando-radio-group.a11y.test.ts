/**
 * Accessibility Tests for sando-radio-group
 * Uses axe-core for WCAG compliance testing and manual ARIA attribute verification
 *
 * @see WCAG_COMPLIANCE.toon - WCAG 2.1 AA requirements
 * @see KEYBOARD_NAVIGATION.toon - Keyboard interaction patterns
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import type { SandoRadioGroup } from './sando-radio-group.js';
import '../radio/sando-radio.js';
import './sando-radio-group.js';

describe('sando-radio-group Accessibility', () => {
  /**
   * Helper function to create a radio group with options
   */
  const createGroup = async (props: Record<string, unknown> = {}) => {
    return fixture<SandoRadioGroup>(html`
      <sando-radio-group
        name="test-group"
        label=${props.label ?? 'Test Group'}
        ?required=${props.required}
        ?disabled=${props.disabled}
        ?error=${props.error}
        helper-text=${props.helperText ?? ''}
        error-text=${props.errorText ?? ''}
        orientation=${props.orientation ?? 'vertical'}
        value=${props.value ?? ''}
      >
        <sando-radio value="a" label="Option A"></sando-radio>
        <sando-radio value="b" label="Option B"></sando-radio>
        <sando-radio value="c" label="Option C"></sando-radio>
      </sando-radio-group>
    `);
  };

  // ============================================================================
  // AXE-CORE VALIDATION
  // ============================================================================
  describe('Axe-Core Validation', () => {
    it('should pass axe for default state', async () => {
      const el = await createGroup();
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe with label', async () => {
      const el = await createGroup({ label: 'Select an option' });
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe with helper text', async () => {
      const el = await createGroup({
        label: 'Choose your preference',
        helperText: 'Select one option from the list below'
      });
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe with error state', async () => {
      const el = await createGroup({
        label: 'Required selection',
        error: true,
        errorText: 'Please select an option'
      });
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe when disabled', async () => {
      const el = await createGroup({
        label: 'Disabled group',
        disabled: true
      });
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe when required', async () => {
      const el = await createGroup({
        label: 'Required selection',
        required: true
      });
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe with selected value', async () => {
      const el = await createGroup({
        label: 'Test Group',
        value: 'b'
      });
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe for horizontal orientation', async () => {
      const el = await createGroup({
        label: 'Horizontal Group',
        orientation: 'horizontal'
      });
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================================================
  // ARIA ROLES AND ATTRIBUTES
  // ============================================================================
  describe('ARIA Roles and Attributes', () => {
    it('should have role="radiogroup" on container', async () => {
      const el = await createGroup();
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      expect(container).toBeTruthy();
    });

    it('should have aria-labelledby referencing the label element', async () => {
      const el = await createGroup({ label: 'Test Label' });
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      const labelledBy = container?.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();

      const labelElement = el.shadowRoot?.querySelector(`#${labelledBy}`);
      expect(labelElement).toBeTruthy();
      expect(labelElement?.textContent).toContain('Test Label');
    });

    it('should have aria-describedby referencing helper text when present', async () => {
      const el = await createGroup({ helperText: 'Helper information' });
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      const describedBy = container?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const descriptionElement = el.shadowRoot?.querySelector(`#${describedBy}`);
      expect(descriptionElement).toBeTruthy();
      expect(descriptionElement?.textContent).toContain('Helper information');
    });

    it('should have aria-describedby referencing error text when in error state', async () => {
      const el = await createGroup({
        error: true,
        errorText: 'Error message'
      });
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      const describedBy = container?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const errorElement = el.shadowRoot?.querySelector(`#${describedBy}`);
      expect(errorElement).toBeTruthy();
      expect(errorElement?.textContent).toContain('Error message');
    });

    it('should have aria-required="true" when required', async () => {
      const el = await createGroup({ required: true });
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      expect(container?.getAttribute('aria-required')).toBe('true');
    });

    it('should not have aria-required when not required', async () => {
      const el = await createGroup({ required: false });
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      expect(container?.hasAttribute('aria-required')).toBe(false);
    });

    it('should have aria-invalid="true" when in error state', async () => {
      const el = await createGroup({ error: true });
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      expect(container?.getAttribute('aria-invalid')).toBe('true');
    });

    it('should not have aria-invalid when not in error state', async () => {
      const el = await createGroup({ error: false });
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      expect(container?.hasAttribute('aria-invalid')).toBe(false);
    });

    it('should have aria-disabled="true" when disabled', async () => {
      const el = await createGroup({ disabled: true });
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      expect(container?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not have aria-disabled when not disabled', async () => {
      const el = await createGroup({ disabled: false });
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      expect(container?.hasAttribute('aria-disabled')).toBe(false);
    });
  });

  // ============================================================================
  // FOCUS MANAGEMENT
  // ============================================================================
  describe('Focus Management', () => {
    it('should focus the first radio when no radio is checked', async () => {
      const el = await createGroup();
      await el.updateComplete;

      // Get the first radio and focus it
      const firstRadio = el.querySelector('sando-radio') as HTMLElement;
      firstRadio.focus();
      await el.updateComplete;

      // The first radio should be focusable
      expect(document.activeElement).toBe(firstRadio);
    });

    it('should focus the checked radio when one is selected', async () => {
      const el = await createGroup({ value: 'b' });
      await el.updateComplete;

      // Get the checked radio and focus it
      const checkedRadio = el.querySelector('sando-radio[value="b"]') as HTMLElement;
      checkedRadio.focus();
      await el.updateComplete;

      expect(document.activeElement).toBe(checkedRadio);
    });

    it('should have visible focus indicator on focused radio', async () => {
      const el = await createGroup();
      await el.updateComplete;

      const firstRadio = el.querySelector('sando-radio') as HTMLElement;
      firstRadio.focus();
      await el.updateComplete;

      // Verify the radio has focus
      expect(document.activeElement).toBe(firstRadio);
    });

    it('should not focus disabled radios', async () => {
      const el = await createGroup({ disabled: true });
      await el.updateComplete;

      // All radios should be disabled
      const radios = el.querySelectorAll('sando-radio');
      radios.forEach((radio) => {
        expect((radio as HTMLElement & { disabled: boolean }).disabled).toBe(true);
      });
    });
  });

  // ============================================================================
  // KEYBOARD NAVIGATION
  // ============================================================================
  describe('Keyboard Navigation', () => {
    it('should support ArrowDown navigation', async () => {
      const el = await createGroup();
      await el.updateComplete;

      // Focus the first radio
      const firstRadio = el.querySelector('sando-radio') as HTMLElement;
      firstRadio.focus();
      await el.updateComplete;

      // Simulate ArrowDown key
      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(arrowDownEvent);
      await el.updateComplete;

      // Value should now be 'b' (second option selected by arrow navigation)
      expect(el.value).toBe('b');
    });

    it('should support ArrowUp navigation', async () => {
      const el = await createGroup({ value: 'c' });
      await el.updateComplete;

      // Focus the last radio
      const lastRadio = el.querySelector('sando-radio[value="c"]') as HTMLElement;
      lastRadio.focus();
      await el.updateComplete;

      // Simulate ArrowUp key
      const arrowUpEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(arrowUpEvent);
      await el.updateComplete;

      // Value should now be 'b' (previous option)
      expect(el.value).toBe('b');
    });

    it('should support ArrowRight navigation', async () => {
      const el = await createGroup({ orientation: 'horizontal' });
      await el.updateComplete;

      // Focus the first radio
      const firstRadio = el.querySelector('sando-radio') as HTMLElement;
      firstRadio.focus();
      await el.updateComplete;

      // Simulate ArrowRight key
      const arrowRightEvent = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(arrowRightEvent);
      await el.updateComplete;

      // Value should now be 'b'
      expect(el.value).toBe('b');
    });

    it('should support ArrowLeft navigation', async () => {
      const el = await createGroup({ value: 'b', orientation: 'horizontal' });
      await el.updateComplete;

      // Focus the second radio
      const secondRadio = el.querySelector('sando-radio[value="b"]') as HTMLElement;
      secondRadio.focus();
      await el.updateComplete;

      // Simulate ArrowLeft key
      const arrowLeftEvent = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(arrowLeftEvent);
      await el.updateComplete;

      // Value should now be 'a'
      expect(el.value).toBe('a');
    });

    it('should wrap to first on ArrowDown from last', async () => {
      const el = await createGroup({ value: 'c' });
      await el.updateComplete;

      // Focus the last radio
      const lastRadio = el.querySelector('sando-radio[value="c"]') as HTMLElement;
      lastRadio.focus();
      await el.updateComplete;

      // Simulate ArrowDown key
      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(arrowDownEvent);
      await el.updateComplete;

      // Value should wrap to 'a'
      expect(el.value).toBe('a');
    });

    it('should wrap to last on ArrowUp from first', async () => {
      const el = await createGroup({ value: 'a' });
      await el.updateComplete;

      // Focus the first radio
      const firstRadio = el.querySelector('sando-radio[value="a"]') as HTMLElement;
      firstRadio.focus();
      await el.updateComplete;

      // Simulate ArrowUp key
      const arrowUpEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(arrowUpEvent);
      await el.updateComplete;

      // Value should wrap to 'c'
      expect(el.value).toBe('c');
    });

    it('should support Home key to go to first option', async () => {
      const el = await createGroup({ value: 'c' });
      await el.updateComplete;

      // Focus the last radio
      const lastRadio = el.querySelector('sando-radio[value="c"]') as HTMLElement;
      lastRadio.focus();
      await el.updateComplete;

      // Simulate Home key
      const homeEvent = new KeyboardEvent('keydown', {
        key: 'Home',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(homeEvent);
      await el.updateComplete;

      // Value should be 'a'
      expect(el.value).toBe('a');
    });

    it('should support End key to go to last option', async () => {
      const el = await createGroup({ value: 'a' });
      await el.updateComplete;

      // Focus the first radio
      const firstRadio = el.querySelector('sando-radio[value="a"]') as HTMLElement;
      firstRadio.focus();
      await el.updateComplete;

      // Simulate End key
      const endEvent = new KeyboardEvent('keydown', {
        key: 'End',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(endEvent);
      await el.updateComplete;

      // Value should be 'c'
      expect(el.value).toBe('c');
    });

    it('should not navigate when disabled', async () => {
      const el = await createGroup({ disabled: true, value: 'a' });
      await el.updateComplete;

      // Simulate ArrowDown key
      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(arrowDownEvent);
      await el.updateComplete;

      // Value should remain 'a' because group is disabled
      expect(el.value).toBe('a');
    });
  });

  // ============================================================================
  // ROVING TABINDEX
  // ============================================================================
  describe('Roving Tabindex Pattern', () => {
    it('should implement roving tabindex on HOST elements for radio group', async () => {
      const el = await createGroup({ value: 'b' });
      await el.updateComplete;

      const radios = el.querySelectorAll('sando-radio');

      // The checked radio HOST should have tabindex 0, others -1
      // Note: Internal inputs always have tabindex=-1 (focus delegated via focus() override)
      radios.forEach((radio, index) => {
        if (index === 1) {
          // Second radio (value="b") is checked - HOST is tabbable
          expect(radio.tabIndex).toBe(0);
        } else {
          expect(radio.tabIndex).toBe(-1);
        }

        // Internal input is never directly tabbable
        const input = radio.shadowRoot?.querySelector('input');
        expect(input?.tabIndex).toBe(-1);
      });
    });

    it('should have first radio HOST focusable when none checked', async () => {
      const el = await createGroup();
      await el.updateComplete;

      const radios = el.querySelectorAll('sando-radio');

      // First radio HOST should have tabindex 0 when none checked
      expect(radios[0].tabIndex).toBe(0);

      // Internal input is never directly tabbable
      const firstInput = radios[0]?.shadowRoot?.querySelector('input');
      expect(firstInput?.tabIndex).toBe(-1);
    });
  });

  // ============================================================================
  // LABEL ASSOCIATION
  // ============================================================================
  describe('Label Association', () => {
    it('should have proper label for the group', async () => {
      const el = await createGroup({ label: 'Favorite Color' });
      const label = el.shadowRoot?.querySelector('.radio-group-label');
      expect(label?.textContent).toContain('Favorite Color');
    });

    it('should display required indicator in label when required', async () => {
      const el = await createGroup({ label: 'Required Field', required: true });
      const requiredIndicator = el.shadowRoot?.querySelector('.required-indicator');
      expect(requiredIndicator).toBeTruthy();
      expect(requiredIndicator?.textContent).toContain('*');
      expect(requiredIndicator?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should propagate name to all child radios', async () => {
      const el = await createGroup();
      await el.updateComplete;

      const radios = el.querySelectorAll('sando-radio');
      radios.forEach((radio) => {
        expect(radio.getAttribute('name')).toBe('test-group');
      });
    });
  });

  // ============================================================================
  // SCREEN READER SUPPORT
  // ============================================================================
  describe('Screen Reader Support', () => {
    it('should announce error text with role="alert"', async () => {
      const el = await createGroup({
        error: true,
        errorText: 'Please make a selection'
      });

      const errorContainer = el.shadowRoot?.querySelector('[role="alert"]');
      expect(errorContainer).toBeTruthy();
      expect(errorContainer?.textContent).toContain('Please make a selection');
    });

    it('should have aria-live="polite" for error announcements', async () => {
      const el = await createGroup({
        error: true,
        errorText: 'Error message'
      });

      const errorContainer = el.shadowRoot?.querySelector('[aria-live="polite"]');
      expect(errorContainer).toBeTruthy();
    });

    it('should have role="presentation" on the options container', async () => {
      const el = await createGroup();
      const optionsContainer = el.shadowRoot?.querySelector('[role="presentation"]');
      expect(optionsContainer).toBeTruthy();
    });

    it('should announce helper text via aria-describedby', async () => {
      const el = await createGroup({ helperText: 'Choose your preferred option' });
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      const describedBy = container?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const description = el.shadowRoot?.querySelector(`#${describedBy}`);
      expect(description?.textContent).toContain('Choose your preferred option');
    });
  });

  // ============================================================================
  // COLOR CONTRAST
  // ============================================================================
  describe('Color Contrast', () => {
    it('should have sufficient color contrast in default state', async () => {
      const el = await createGroup();
      const results = await axe(el, {
        rules: { 'color-contrast': { enabled: true } }
      });
      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast in error state', async () => {
      const el = await createGroup({
        error: true,
        errorText: 'This field is required'
      });
      const results = await axe(el, {
        rules: { 'color-contrast': { enabled: true } }
      });
      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast when disabled', async () => {
      const el = await createGroup({ disabled: true });
      const results = await axe(el, {
        rules: { 'color-contrast': { enabled: true } }
      });
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================================================
  // ORIENTATION ACCESSIBILITY
  // ============================================================================
  describe('Orientation Accessibility', () => {
    it('should pass axe for vertical orientation', async () => {
      const el = await createGroup({ orientation: 'vertical' });
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe for horizontal orientation', async () => {
      const el = await createGroup({ orientation: 'horizontal' });
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  // ============================================================================
  // FLAVOR ACCESSIBILITY
  // ============================================================================
  describe('Flavor Accessibility', () => {
    const flavors = ['original', 'strawberry', 'chocolate'];

    flavors.forEach((flavor) => {
      it(`should pass axe with ${flavor} flavor`, async () => {
        const el = await fixture(html`
          <div flavor="${flavor}">
            <sando-radio-group name="flavor-test" label="Test Group">
              <sando-radio value="a" label="Option A"></sando-radio>
              <sando-radio value="b" label="Option B"></sando-radio>
            </sando-radio-group>
          </div>
        `);
        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });

      it(`should pass axe with ${flavor} flavor in error state`, async () => {
        const el = await fixture(html`
          <div flavor="${flavor}">
            <sando-radio-group
              name="flavor-test"
              label="Test Group"
              error
              error-text="Error message"
            >
              <sando-radio value="a" label="Option A"></sando-radio>
              <sando-radio value="b" label="Option B"></sando-radio>
            </sando-radio-group>
          </div>
        `);
        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ============================================================================
  // WCAG COMPLIANCE SPECIFIC TESTS
  // ============================================================================
  describe('WCAG Compliance', () => {
    it('should meet WCAG 2.1.1 - Keyboard accessible', async () => {
      const el = await createGroup();
      await el.updateComplete;

      // Verify all radios are keyboard accessible
      const radios = el.querySelectorAll('sando-radio');
      radios.forEach((radio) => {
        const input = radio.shadowRoot?.querySelector('input');
        expect(input).toBeTruthy();
      });

      // Verify group responds to keyboard navigation
      const firstRadio = el.querySelector('sando-radio') as HTMLElement;
      firstRadio.focus();
      await el.updateComplete;

      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(arrowDownEvent);
      await el.updateComplete;

      expect(el.value).toBe('b');
    });

    it('should meet WCAG 2.4.7 - Focus visible', async () => {
      const el = await createGroup();
      await el.updateComplete;

      const firstRadio = el.querySelector('sando-radio') as HTMLElement;
      firstRadio.focus();
      await el.updateComplete;

      // Verify element receives focus
      expect(document.activeElement).toBe(firstRadio);
    });

    it('should meet WCAG 4.1.2 - Name, Role, Value', async () => {
      const el = await createGroup({ label: 'Accessible Group' });
      await el.updateComplete;

      // Name: Group has accessible name via label
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      expect(container?.getAttribute('aria-labelledby')).toBeTruthy();

      // Role: Container has role="radiogroup"
      expect(container?.getAttribute('role')).toBe('radiogroup');

      // Value: Child radios have proper checked state
      const radios = el.querySelectorAll('sando-radio');
      radios.forEach((radio) => {
        const input = radio.shadowRoot?.querySelector('input');
        expect(input?.getAttribute('aria-checked')).toBeTruthy();
      });
    });

    it('should meet WCAG 3.3.1 - Error identification', async () => {
      const el = await createGroup({
        error: true,
        errorText: 'Please select an option to continue'
      });
      await el.updateComplete;

      // Error is clearly identified
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      expect(container?.getAttribute('aria-invalid')).toBe('true');

      // Error message is associated and announced
      const describedBy = container?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const errorElement = el.shadowRoot?.querySelector(`#${describedBy}`);
      expect(errorElement?.textContent).toContain('Please select an option');
    });

    it('should meet WCAG 3.3.2 - Labels or Instructions', async () => {
      const el = await createGroup({
        label: 'Select your preference',
        helperText: 'Choose one option from the list'
      });
      await el.updateComplete;

      // Label is present
      const label = el.shadowRoot?.querySelector('.radio-group-label');
      expect(label?.textContent).toContain('Select your preference');

      // Helper text provides additional instructions
      const container = el.shadowRoot?.querySelector('[role="radiogroup"]');
      const describedBy = container?.getAttribute('aria-describedby');
      const helper = el.shadowRoot?.querySelector(`#${describedBy}`);
      expect(helper?.textContent).toContain('Choose one option');
    });
  });

  // ============================================================================
  // COMPLEX STATES
  // ============================================================================
  describe('Complex States', () => {
    it('should pass axe with all states combined', async () => {
      const el = await fixture<SandoRadioGroup>(html`
        <sando-radio-group
          name="complex-test"
          label="Complex Group"
          value="b"
          required
          orientation="horizontal"
          helper-text="Select your preferred option"
        >
          <sando-radio value="a" label="Option A"></sando-radio>
          <sando-radio value="b" label="Option B"></sando-radio>
          <sando-radio value="c" label="Option C" disabled></sando-radio>
        </sando-radio-group>
      `);
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe with mixed disabled radios', async () => {
      const el = await fixture<SandoRadioGroup>(html`
        <sando-radio-group name="mixed-test" label="Mixed Group">
          <sando-radio value="a" label="Enabled A"></sando-radio>
          <sando-radio value="b" label="Disabled B" disabled></sando-radio>
          <sando-radio value="c" label="Enabled C"></sando-radio>
        </sando-radio-group>
      `);
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should skip disabled radios during keyboard navigation', async () => {
      const el = await fixture<SandoRadioGroup>(html`
        <sando-radio-group name="skip-test" label="Skip Test" value="a">
          <sando-radio value="a" label="Option A"></sando-radio>
          <sando-radio value="b" label="Option B" disabled></sando-radio>
          <sando-radio value="c" label="Option C"></sando-radio>
        </sando-radio-group>
      `);
      await el.updateComplete;

      // Focus first radio
      const firstRadio = el.querySelector('sando-radio[value="a"]') as HTMLElement;
      firstRadio.focus();
      await el.updateComplete;

      // Arrow down should skip disabled 'b' and go to 'c'
      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(arrowDownEvent);
      await el.updateComplete;

      expect(el.value).toBe('c');
    });

    it('should handle dynamic radio addition', async () => {
      const el = await createGroup();
      await el.updateComplete;

      // Add a new radio
      const newRadio = document.createElement('sando-radio');
      newRadio.setAttribute('value', 'd');
      newRadio.setAttribute('label', 'Option D');
      el.appendChild(newRadio);

      await el.updateComplete;

      // Should still pass axe
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });
});
