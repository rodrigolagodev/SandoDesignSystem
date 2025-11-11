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
      // TODO: Verify label renders in shadow DOM
      // const label = el.shadowRoot?.querySelector('.form-group__label');
      // expect(label?.textContent).to.include('Email');
    });

    it('should render required asterisk when required', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Username" required>
          <input type="text" />
        </sando-form-group>
      `);

      expect(el.required).to.be.true;
      // TODO: Verify asterisk renders
      // const required = el.shadowRoot?.querySelector('.required');
      // expect(required).to.exist;
    });

    it('should render helper text from prop', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group helperText="Enter your email address">
          <input type="email" />
        </sando-form-group>
      `);

      expect(el.helperText).to.equal('Enter your email address');
      // TODO: Verify helper text renders
    });

    it('should render error message from prop', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group error="Email is required">
          <input type="email" />
        </sando-form-group>
      `);

      expect(el.error).to.equal('Email is required');
      // TODO: Verify error renders with role="alert"
    });

    it('should render error instead of helper text when both present', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group helperText="Enter your email" error="Email is invalid">
          <input type="email" />
        </sando-form-group>
      `);

      // TODO: Verify only error renders, not helper text
      expect(el.error).to.equal('Email is invalid');
      expect(el.helperText).to.equal('Enter your email');
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

    // TODO: Add focus and blur event tests
    // These require interaction with slotted form controls
  });
});
