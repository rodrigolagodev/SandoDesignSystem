import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import './sando-form-group.js';
import type { SandoFormGroup } from './sando-form-group.js';

describe('sando-form-group', () => {
  describe('rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group>
          <input type="text" />
        </sando-form-group>
      `);

      expect(el).to.exist;
      expect(el.tagName.toLowerCase()).to.equal('sando-form-group');
    });

    it('should render label from prop', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Email">
          <input type="email" />
        </sando-form-group>
      `);

      expect(el.label).to.equal('Email');
      // Verify label renders in shadow DOM
      const label = el.shadowRoot?.querySelector('.form-group__label');
      expect(label).to.exist;
      expect(label?.textContent).to.include('Email');
    });

    it('should render required asterisk when required', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Username" required>
          <input type="text" />
        </sando-form-group>
      `);

      expect(el.required).to.be.true;
      // Verify asterisk renders
      const required = el.shadowRoot?.querySelector('.required');
      expect(required).to.exist;
      expect(required?.textContent).to.equal('*');
    });

    it('should render helper text from prop', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group helper-text="Enter your email address">
          <input type="email" />
        </sando-form-group>
      `);

      expect(el.helperText).to.equal('Enter your email address');
      // Verify helper text renders
      const helperText = el.shadowRoot?.querySelector('.form-group__helper-text');
      expect(helperText).to.exist;
      expect(helperText?.textContent).to.include('Enter your email address');
    });

    it('should render error message from prop', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group error="Email is required">
          <input type="email" />
        </sando-form-group>
      `);

      expect(el.error).to.equal('Email is required');
      // Verify error renders with role="alert"
      const errorEl = el.shadowRoot?.querySelector('.form-group__error');
      expect(errorEl).to.exist;
      expect(errorEl?.getAttribute('role')).to.equal('alert');
      expect(errorEl?.textContent).to.include('Email is required');
    });

    it('should render error instead of helper text when both present', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group helper-text="Enter your email" error="Email is invalid">
          <input type="email" />
        </sando-form-group>
      `);

      // Verify only error renders, not helper text
      expect(el.error).to.equal('Email is invalid');
      expect(el.helperText).to.equal('Enter your email');

      const errorEl = el.shadowRoot?.querySelector('.form-group__error');
      const helperEl = el.shadowRoot?.querySelector('.form-group__helper-text');
      expect(errorEl).to.exist;
      expect(helperEl).to.not.exist;
    });
  });

  describe('slots', () => {
    it('should render default slot for form controls', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group>
          <input type="text" id="test-input" />
        </sando-form-group>
      `);

      const input = el.querySelector('#test-input');
      expect(input).to.exist;
    });

    it('should render label slot', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group>
          <span slot="label">Custom Label</span>
          <input type="text" />
        </sando-form-group>
      `);

      const labelSlot = el.querySelector('[slot="label"]');
      expect(labelSlot?.textContent).to.equal('Custom Label');
    });

    it('should render helper-text slot', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group>
          <input type="text" />
          <span slot="helper-text">Custom helper text</span>
        </sando-form-group>
      `);

      const helperSlot = el.querySelector('[slot="helper-text"]');
      expect(helperSlot?.textContent).to.equal('Custom helper text');
    });

    it('should render error slot', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group>
          <input type="text" />
          <span slot="error">Custom error message</span>
        </sando-form-group>
      `);

      const errorSlot = el.querySelector('[slot="error"]');
      expect(errorSlot?.textContent).to.equal('Custom error message');
    });
  });

  describe('properties', () => {
    it('should update label property', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group><input type="text" /></sando-form-group>
      `);

      el.label = 'New Label';
      await el.updateComplete;

      expect(el.label).to.equal('New Label');
    });

    it('should update error property', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group><input type="text" /></sando-form-group>
      `);

      el.error = 'Validation error';
      await el.updateComplete;

      expect(el.error).to.equal('Validation error');
    });

    it('should update helperText property', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group><input type="text" /></sando-form-group>
      `);

      el.helperText = 'New helper text';
      await el.updateComplete;

      expect(el.helperText).to.equal('New helper text');
    });

    it('should update required property', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group><input type="text" /></sando-form-group>
      `);

      el.required = true;
      await el.updateComplete;

      expect(el.required).to.be.true;
      expect(el.hasAttribute('required')).to.be.true;
    });
  });

  describe('events', () => {
    it('should emit validation-change event when error changes', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group><input type="text" /></sando-form-group>
      `);

      let eventFired = false;
      let eventDetail: any;

      el.addEventListener('validation-change', ((e: CustomEvent) => {
        eventFired = true;
        eventDetail = e.detail;
      }) as EventListener);

      el.error = 'Validation error';
      await el.updateComplete;

      expect(eventFired).to.be.true;
      expect(eventDetail.isValid).to.be.false;
      expect(eventDetail.errorMessage).to.equal('Validation error');
    });

    it('should emit validation-change with valid state when error cleared', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group error="Initial error">
          <input type="text" />
        </sando-form-group>
      `);

      let eventDetail: any;

      el.addEventListener('validation-change', ((e: CustomEvent) => {
        eventDetail = e.detail;
      }) as EventListener);

      el.error = undefined;
      await el.updateComplete;

      expect(eventDetail.isValid).to.be.true;
      expect(eventDetail.errorMessage).to.be.null;
    });

    it('should emit sando-focus when slotted input receives focus', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Email">
          <input type="email" id="email-input" />
        </sando-form-group>
      `);

      let eventFired = false;
      el.addEventListener('sando-focus', () => {
        eventFired = true;
      });

      const input = el.querySelector<HTMLInputElement>('#email-input');
      input?.focus();

      expect(eventFired).to.be.true;
    });

    it('should emit sando-blur when slotted input loses focus', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Email">
          <input type="email" id="email-input" />
        </sando-form-group>
      `);

      let eventFired = false;
      el.addEventListener('sando-blur', () => {
        eventFired = true;
      });

      const input = el.querySelector<HTMLInputElement>('#email-input');
      input?.focus();
      input?.blur();

      expect(eventFired).to.be.true;
    });
  });

  describe('label-input association', () => {
    it('should associate label with input via for attribute', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Email">
          <input type="email" />
        </sando-form-group>
      `);

      const label = el.shadowRoot?.querySelector('.form-group__label') as HTMLLabelElement;
      const input = el.querySelector('input');

      expect(label?.getAttribute('for')).to.exist;
      expect(input?.id).to.equal(label?.getAttribute('for'));
    });

    it('should preserve existing input id', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Email">
          <input type="email" id="my-custom-id" />
        </sando-form-group>
      `);

      // Wait for the re-render after detecting existing input id
      await el.updateComplete;

      const label = el.shadowRoot?.querySelector('.form-group__label') as HTMLLabelElement;
      const input = el.querySelector('input');

      expect(input?.id).to.equal('my-custom-id');
      expect(label?.getAttribute('for')).to.equal('my-custom-id');
    });

    it('should set aria-describedby for helper text', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group helper-text="Enter your email">
          <input type="email" />
        </sando-form-group>
      `);

      const input = el.querySelector('input');
      const helperText = el.shadowRoot?.querySelector('.form-group__helper-text');

      expect(input?.getAttribute('aria-describedby')).to.exist;
      expect(input?.getAttribute('aria-describedby')).to.equal(helperText?.id);
    });

    it('should set aria-invalid when error is present', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group error="Invalid email">
          <input type="email" />
        </sando-form-group>
      `);

      const input = el.querySelector('input');
      expect(input?.getAttribute('aria-invalid')).to.equal('true');
    });

    it('should sync required attribute to slotted input', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Email" required>
          <input type="email" />
        </sando-form-group>
      `);

      const input = el.querySelector('input') as HTMLInputElement;
      expect(input?.required).to.be.true;
    });

    it('should sync disabled attribute to slotted input', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Email" disabled>
          <input type="email" />
        </sando-form-group>
      `);

      const input = el.querySelector('input') as HTMLInputElement;
      expect(input?.disabled).to.be.true;
    });
  });
});
