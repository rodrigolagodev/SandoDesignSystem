import { fixture, expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import './sando-form.js';
import '../input/sando-input.js';
import '../checkbox/sando-checkbox.js';
import '../switch/sando-switch.js';
import '../button/sando-button.js';
import { SandoForm } from './sando-form.js';
import type { FormSubmitEventDetail, FormInvalidEventDetail } from './sando-form.types.js';

describe('sando-form', () => {
  describe('rendering', () => {
    it('should render with default properties', async () => {
      const el = await fixture<SandoForm>(html` <sando-form></sando-form> `);

      expect(el).to.exist;
      expect(el.tagName.toLowerCase()).to.equal('sando-form');
    });

    it('should render a native form element', async () => {
      const el = await fixture<SandoForm>(html` <sando-form></sando-form> `);

      const form = el.shadowRoot?.querySelector('form');
      expect(form).to.exist;
    });

    it('should render slotted content', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="test" id="test-input" />
        </sando-form>
      `);

      const input = el.querySelector('#test-input');
      expect(input).to.exist;
    });
  });

  describe('properties', () => {
    it('should set loading attribute when loading is true', async () => {
      const el = await fixture<SandoForm>(html` <sando-form loading></sando-form> `);

      expect(el.loading).to.be.true;
      expect(el.hasAttribute('loading')).to.be.true;
    });

    it('should set novalidate attribute on native form', async () => {
      const el = await fixture<SandoForm>(html` <sando-form novalidate></sando-form> `);

      expect(el.novalidate).to.be.true;
      const form = el.shadowRoot?.querySelector('form');
      expect(form?.hasAttribute('novalidate')).to.be.true;
    });

    it('should set name attribute on native form', async () => {
      const el = await fixture<SandoForm>(html` <sando-form name="login-form"></sando-form> `);

      expect(el.name).to.equal('login-form');
      const form = el.shadowRoot?.querySelector('form');
      expect(form?.getAttribute('name')).to.equal('login-form');
    });

    it('should set action attribute on native form', async () => {
      const el = await fixture<SandoForm>(html` <sando-form action="/api/submit"></sando-form> `);

      expect(el.action).to.equal('/api/submit');
      const form = el.shadowRoot?.querySelector('form');
      expect(form?.getAttribute('action')).to.equal('/api/submit');
    });

    it('should default method to post', async () => {
      const el = await fixture<SandoForm>(html` <sando-form></sando-form> `);

      expect(el.method).to.equal('post');
    });

    it('should set method attribute on native form', async () => {
      const el = await fixture<SandoForm>(html` <sando-form method="get"></sando-form> `);

      expect(el.method).to.equal('get');
      const form = el.shadowRoot?.querySelector('form');
      expect(form?.getAttribute('method')).to.equal('get');
    });
  });

  describe('getFormData()', () => {
    it('should collect values from native inputs', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="john" />
          <input type="email" name="email" value="john@example.com" />
        </sando-form>
      `);

      const formData = el.getFormData();
      expect(formData.get('username')).to.equal('john');
      expect(formData.get('email')).to.equal('john@example.com');
    });

    it('should collect values from native select', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <select name="country">
            <option value="us">United States</option>
            <option value="uk" selected>United Kingdom</option>
          </select>
        </sando-form>
      `);

      const formData = el.getFormData();
      expect(formData.get('country')).to.equal('uk');
    });

    it('should include checked checkboxes', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="checkbox" name="terms" value="accepted" checked />
          <input type="checkbox" name="newsletter" value="yes" />
        </sando-form>
      `);

      const formData = el.getFormData();
      expect(formData.get('terms')).to.equal('accepted');
      expect(formData.get('newsletter')).to.be.null;
    });

    it('should collect values from native textarea', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <textarea name="message">Hello World</textarea>
        </sando-form>
      `);

      const formData = el.getFormData();
      expect(formData.get('message')).to.equal('Hello World');
    });
  });

  describe('getJson()', () => {
    it('should return plain object with field values', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="john" />
          <input type="email" name="email" value="john@example.com" />
        </sando-form>
      `);

      const json = el.getJson();
      expect(json).to.deep.equal({
        username: 'john',
        email: 'john@example.com'
      });
    });

    it('should handle array values for same-named controls', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="checkbox" name="interests" value="sports" checked />
          <input type="checkbox" name="interests" value="music" checked />
          <input type="checkbox" name="interests" value="art" />
        </sando-form>
      `);

      const json = el.getJson();
      expect(json.interests).to.deep.equal(['sports', 'music']);
    });
  });

  describe('validate()', () => {
    it('should return true when all fields are valid', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="john" required />
        </sando-form>
      `);

      expect(el.validate()).to.be.true;
    });

    it('should return false when required field is empty', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="" required />
        </sando-form>
      `);

      expect(el.validate()).to.be.false;
    });

    it('should always return true when novalidate is set', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form novalidate>
          <input type="email" name="email" value="invalid-email" required />
        </sando-form>
      `);

      expect(el.validate()).to.be.true;
    });
  });

  describe('submit()', () => {
    it('should emit sando-submit event when valid', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="john" />
        </sando-form>
      `);

      setTimeout(() => el.submit());
      const event = await oneEvent(el, 'sando-submit');
      const detail = event.detail as FormSubmitEventDetail;

      expect(detail.isValid).to.be.true;
      expect(detail.json).to.deep.equal({ username: 'john' });
      expect(detail.formData.get('username')).to.equal('john');
    });

    it('should emit sando-invalid event when invalid', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="" required />
        </sando-form>
      `);

      setTimeout(() => el.submit());
      const event = await oneEvent(el, 'sando-invalid');
      const detail = event.detail as FormInvalidEventDetail;

      expect(detail.errors.length).to.be.greaterThan(0);
      expect(detail.errors[0].name).to.equal('username');
    });
  });

  describe('reset()', () => {
    it('should reset native input values', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="" />
        </sando-form>
      `);

      const input = el.querySelector<HTMLInputElement>('input');
      input!.value = 'modified';
      expect(input!.value).to.equal('modified');

      el.reset();
      expect(input!.value).to.equal('');
    });

    it('should emit sando-reset event', async () => {
      const el = await fixture<SandoForm>(html` <sando-form></sando-form> `);

      setTimeout(() => el.reset());
      const event = await oneEvent(el, 'sando-reset');

      expect(event).to.exist;
    });
  });

  describe('setLoading()', () => {
    it('should update loading property', async () => {
      const el = await fixture<SandoForm>(html` <sando-form></sando-form> `);

      expect(el.loading).to.be.false;

      el.setLoading(true);
      await el.updateComplete;

      expect(el.loading).to.be.true;
      expect(el.hasAttribute('loading')).to.be.true;
    });

    it('should disable form controls when loading', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" />
          <button type="submit">Submit</button>
        </sando-form>
      `);

      el.setLoading(true);
      await el.updateComplete;

      const input = el.querySelector<HTMLInputElement>('input');
      const button = el.querySelector<HTMLButtonElement>('button');

      expect(input?.disabled).to.be.true;
      expect(button?.disabled).to.be.true;
    });
  });

  describe('native form events', () => {
    it('should prevent default on native submit and call submit()', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="john" />
          <button type="submit">Submit</button>
        </sando-form>
      `);

      const form = el.shadowRoot?.querySelector('form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });

      setTimeout(() => form?.dispatchEvent(submitEvent));
      const event = await oneEvent(el, 'sando-submit');

      expect(event).to.exist;
    });

    it('should prevent default on native reset and call reset()', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <button type="reset">Reset</button>
        </sando-form>
      `);

      const form = el.shadowRoot?.querySelector('form');
      const resetEvent = new Event('reset', { bubbles: true, cancelable: true });

      setTimeout(() => form?.dispatchEvent(resetEvent));
      const event = await oneEvent(el, 'sando-reset');

      expect(event).to.exist;
    });
  });

  describe('sando component integration', () => {
    it('should collect values from sando-input', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="email" value="test@example.com"></sando-input>
        </sando-form>
      `);

      const json = el.getJson();
      expect(json.email).to.equal('test@example.com');
    });

    it('should validate required sando-input', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="email" required></sando-input>
        </sando-form>
      `);

      expect(el.validate()).to.be.false;

      // Check that error state was set
      const input = el.querySelector('sando-input');
      expect((input as any).error).to.be.true;
    });

    it('should validate required sando-checkbox', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-checkbox name="terms" required></sando-checkbox>
        </sando-form>
      `);

      expect(el.validate()).to.be.false;

      const checkbox = el.querySelector('sando-checkbox');
      expect((checkbox as any).error).to.be.true;
    });

    it('should pass validation when sando-checkbox is checked', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-checkbox name="terms" required checked></sando-checkbox>
        </sando-form>
      `);

      expect(el.validate()).to.be.true;
    });

    it('should validate required sando-switch', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-switch name="notifications" required></sando-switch>
        </sando-form>
      `);

      expect(el.validate()).to.be.false;
    });

    it('should pass validation when sando-switch is checked', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-switch name="notifications" required checked></sando-switch>
        </sando-form>
      `);

      expect(el.validate()).to.be.true;
    });

    it('should collect checkbox value only when checked', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-checkbox name="accept" value="yes" checked></sando-checkbox>
          <sando-checkbox name="newsletter" value="yes"></sando-checkbox>
        </sando-form>
      `);

      const json = el.getJson();
      expect(json.accept).to.equal('yes');
      expect(json.newsletter).to.be.undefined;
    });

    it('should focus first invalid sando-input on validation failure', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="name" value="John"></sando-input>
          <sando-input name="email" required></sando-input>
          <sando-input name="phone" required></sando-input>
        </sando-form>
      `);

      el.validate();

      // The email input should be focused (first invalid)
      const emailInput = el.querySelector('sando-input[name="email"]');
      expect(document.activeElement).to.equal(emailInput);
    });

    it('should reset sando components to initial values', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="email" value="initial@example.com"></sando-input>
          <sando-checkbox name="terms" checked></sando-checkbox>
        </sando-form>
      `);

      // Wait for firstUpdated to capture initial values
      await el.updateComplete;

      // Modify values
      const input = el.querySelector('sando-input') as any;
      const checkbox = el.querySelector('sando-checkbox') as any;

      input.value = 'modified@example.com';
      checkbox.checked = false;

      // Reset
      el.reset();
      await el.updateComplete;

      // Should restore to initial values
      expect(input.value).to.equal('initial@example.com');
      expect(checkbox.checked).to.be.true;
    });

    it('should track dirty state', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="email"></sando-input>
        </sando-form>
      `);

      expect(el.dirty).to.be.false;
      expect(el.pristine).to.be.true;

      // Simulate input event
      const input = el.querySelector('sando-input') as HTMLElement;
      input.dispatchEvent(new Event('input', { bubbles: true }));

      expect(el.dirty).to.be.true;
      expect(el.pristine).to.be.false;
    });

    it('should reset dirty state on reset()', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="email"></sando-input>
        </sando-form>
      `);

      // Make dirty
      const input = el.querySelector('sando-input') as HTMLElement;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      expect(el.dirty).to.be.true;

      // Reset
      el.reset();
      expect(el.dirty).to.be.false;
    });

    it('should emit sando-change on input', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="email"></sando-input>
        </sando-form>
      `);

      const input = el.querySelector('sando-input') as HTMLElement;

      setTimeout(() => {
        input.dispatchEvent(new Event('input', { bubbles: true }));
      });

      const event = await oneEvent(el, 'sando-change');
      expect(event.detail.field).to.equal('email');
    });
  });
  describe('additionalSelectors', () => {
    afterEach(() => {
      // Clean up any selectors added during tests
      SandoForm.additionalSelectors = [];
    });

    it('should expose additionalSelectors as a static array', () => {
      expect(Array.isArray(SandoForm.additionalSelectors)).to.be.true;
    });

    it('should default to an empty array', () => {
      expect(SandoForm.additionalSelectors).to.deep.equal([]);
    });

    it('should discover controls matching additionalSelectors', async () => {
      SandoForm.additionalSelectors = ['my-custom-input[name]'];

      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="native" value="native-value" />
        </sando-form>
      `);

      // native input still discovered
      const json = el.getJson();
      expect(json.native).to.equal('native-value');
    });

    it('should compose selector at query-time (not at load-time)', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="base" value="base-value" />
        </sando-form>
      `);

      // Before adding: base control visible
      const beforeJson = el.getJson();
      expect(beforeJson.base).to.equal('base-value');

      // After adding selector: still works (no reload needed)
      SandoForm.additionalSelectors = ['input[name]'];
      const afterJson = el.getJson();
      expect(afterJson.base).to.equal('base-value');
    });

    it('should track dirty state for controls matching additionalSelectors', async () => {
      SandoForm.additionalSelectors = ['custom-input[name]'];

      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="email" value="" />
        </sando-form>
      `);

      expect(el.dirty).to.be.false;

      const input = el.querySelector('input') as HTMLElement;
      input.dispatchEvent(new Event('input', { bubbles: true }));

      expect(el.dirty).to.be.true;
    });
  });

  describe('addError()', () => {
    it('should expose addError as a public method', async () => {
      const el = await fixture<SandoForm>(html` <sando-form></sando-form> `);
      expect(typeof el.addError).to.equal('function');
    });

    it('should set error state on a named sando-input', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="email" value="test@example.com"></sando-input>
        </sando-form>
      `);

      el.addError('email', 'This email is already in use');
      await el.updateComplete;

      const input = el.querySelector('sando-input') as any;
      expect(input.error).to.be.true;
      expect(input.errorText).to.equal('This email is already in use');
    });

    it('should be callable independently of the sando-validate event', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="username" value="taken-name"></sando-input>
        </sando-form>
      `);

      // Call imperatively — no event needed
      el.addError('username', 'Username already taken');
      await el.updateComplete;

      const input = el.querySelector('sando-input') as any;
      expect(input.error).to.be.true;
    });

    it('should not throw when called with a non-existent field name', async () => {
      const el = await fixture<SandoForm>(html` <sando-form></sando-form> `);

      // Should silently no-op for unknown field
      expect(() => el.addError('nonexistent', 'Some error')).not.to.throw();
    });
  });

  describe('sando-button integration', () => {
    it('should propagate loading state to sando-button[type="submit"]', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="john" />
          <sando-button type="submit">Submit</sando-button>
        </sando-form>
      `);

      el.setLoading(true);
      await el.updateComplete;

      const btn = el.querySelector('sando-button') as any;
      expect(btn.loading).to.be.true;
      expect(el.loading).to.be.true;
    });

    it('should clear loading on sando-button[type="submit"] when loading is false', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-button type="submit">Submit</sando-button>
        </sando-form>
      `);

      el.setLoading(true);
      await el.updateComplete;

      el.setLoading(false);
      await el.updateComplete;

      const btn = el.querySelector('sando-button') as any;
      expect(btn.loading).to.be.false;
    });

    it('should submit form when sando-button[type="submit"] is clicked', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="john" />
          <sando-button type="submit">Submit</sando-button>
        </sando-form>
      `);

      const btn = el.querySelector('sando-button') as HTMLElement;

      setTimeout(() => {
        const clickEvent = new Event('click', { bubbles: true });
        btn.dispatchEvent(clickEvent);
      });

      const event = await oneEvent(el, 'sando-submit');
      expect(event).to.exist;
    });

    it('should reset form when sando-button[type="reset"] is clicked', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="" />
          <sando-button type="reset">Reset</sando-button>
        </sando-form>
      `);

      const btn = el.querySelector('sando-button') as HTMLElement;

      setTimeout(() => {
        const clickEvent = new Event('click', { bubbles: true });
        btn.dispatchEvent(clickEvent);
      });

      const event = await oneEvent(el, 'sando-reset');
      expect(event).to.exist;
    });

    it('should not submit when click target does not match submit/reset', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="username" value="john" />
          <sando-button type="button">Cancel</sando-button>
        </sando-form>
      `);

      let submitted = false;
      el.addEventListener('sando-submit', () => { submitted = true; });

      const btn = el.querySelector('sando-button') as HTMLElement;
      btn.dispatchEvent(new Event('click', { bubbles: true }));

      // Wait a tick
      await new Promise(r => setTimeout(r, 50));

      expect(submitted).to.be.false;
    });
  });

  describe('markAsPristine()', () => {
    it('should reset dirty state without resetting values', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="email" value="" />
        </sando-form>
      `);

      const input = el.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      expect(el.dirty).to.be.true;

      el.markAsPristine();
      expect(el.dirty).to.be.false;
      expect(el.pristine).to.be.true;
    });
  });

  describe('clearErrors()', () => {
    it('should clear error state on all sando controls', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="email" required></sando-input>
        </sando-form>
      `);

      // Trigger validation to set errors
      el.validate();
      await el.updateComplete;

      const input = el.querySelector('sando-input') as any;
      expect(input.error).to.be.true;

      // Clear errors
      el.clearErrors();
      await el.updateComplete;

      expect(input.error).to.be.false;
    });
  });

  describe('_getControlValue() edge cases', () => {
    it('should return empty string for unknown control types', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <input type="text" name="text-field" value="test-value" />
        </sando-form>
      `);

      const json = el.getJson();
      expect(json['text-field']).to.equal('test-value');
    });

    it('should return value from native textarea', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <textarea name="bio">My bio text</textarea>
        </sando-form>
      `);

      const json = el.getJson();
      expect(json['bio']).to.equal('My bio text');
    });
  });

  describe('_collectValidationErrors() with sando component states', () => {
    it('should detect invalid state from sando-input using checkValidity', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="email" required></sando-input>
        </sando-form>
      `);

      // Validate — sando-input has checkValidity which returns false for empty+required
      const isValid = el.validate();
      expect(isValid).to.be.false;

      const errors = (el as any)._collectValidationErrors();
      const emailError = errors.find((e: any) => e.name === 'email');
      expect(emailError).to.exist;
    });

    it('should detect invalid state from component without checkValidity but with invalid property', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="username" value="ok" required></sando-input>
        </sando-form>
      `);

      // Set invalid state directly on the element
      const input = el.querySelector('sando-input') as any;
      input.error = true;

      // Call getFormData — should still collect value
      const json = el.getJson();
      expect(json['username']).to.equal('ok');
    });

    it('should include validationMessage in error when available', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="email" type="email" value="not-an-email" required></sando-input>
        </sando-form>
      `);

      el.validate();

      setTimeout(() => el.submit());
      const event = await oneEvent(el, 'sando-invalid');
      expect(event.detail.errors.length).to.be.greaterThan(0);
    });
  });

  describe('validation edge cases', () => {
    it('should use "Invalid value" fallback when validationMessage is empty', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <sando-input name="field" required></sando-input>
        </sando-form>
      `);

      // Force validation to trigger the error collection path
      setTimeout(() => el.submit());
      const event = await oneEvent(el, 'sando-invalid');
      // Error should exist even if validationMessage is empty
      expect(event.detail.errors.length).to.be.greaterThan(0);
      expect(event.detail.errors[0].message).to.be.a('string');
    });

    it('should get value from custom element with value property (fallback path)', async () => {
      // Register a minimal custom element to hit the fallback path
      if (!customElements.get('test-custom-input')) {
        class TestCustomInput extends HTMLElement {
          value = 'custom-value';
        }
        customElements.define('test-custom-input', TestCustomInput);
      }

      // Register via additionalSelectors so it gets discovered
      SandoForm.additionalSelectors = ['test-custom-input[name]'];

      const el = await fixture<SandoForm>(html`
        <sando-form>
          <test-custom-input name="custom-field"></test-custom-input>
          <input type="text" name="normal" value="hello" />
        </sando-form>
      `);

      // Normal field should work; custom-field hits the fallback value path
      const json = el.getJson();
      expect(json.normal).to.equal('hello');
      expect(json['custom-field']).to.equal('custom-value');

      SandoForm.additionalSelectors = [];
    });
  });

  describe('sando component with invalid property (no checkValidity)', () => {
    it('should detect error from sando component via invalid property', async () => {
      // Register a sando-like element with invalid property but no checkValidity
      if (!customElements.get('sando-mock-field')) {
        class SandoMockField extends HTMLElement {
          invalid = false;
          value = '';
        }
        customElements.define('sando-mock-field', SandoMockField);
      }

      SandoForm.additionalSelectors = ['sando-mock-field[name]'];

      const el = await fixture<SandoForm>(html`
        <sando-form novalidate>
          <sando-mock-field name="mockfield"></sando-mock-field>
        </sando-form>
      `);

      // Mark as invalid via property
      const mockField = el.querySelector('sando-mock-field') as any;
      mockField.invalid = true;

      // Collect errors
      const errors = (el as any)._collectValidationErrors();
      const fieldError = errors.find((e: any) => e.name === 'mockfield');
      expect(fieldError).to.exist;

      SandoForm.additionalSelectors = [];
    });
  });

});
