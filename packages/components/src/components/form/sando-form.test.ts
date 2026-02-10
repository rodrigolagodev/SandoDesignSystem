import { fixture, expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import './sando-form.js';
import type { SandoForm } from './sando-form.js';
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
});
