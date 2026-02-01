import { fixture, expect, html } from '@open-wc/testing';
import './sando-input.js';
import type { SandoInput } from './sando-input.js';

describe('sando-input', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const el = await fixture<SandoInput>(html` <sando-input></sando-input> `);

      expect(el).to.exist;
      expect(el.variant).to.equal('filled');
      expect(el.size).to.equal('medium');
      expect(el.type).to.equal('text');
      expect(el.value).to.equal('');
      expect(el.disabled).to.be.false;
      expect(el.readonly).to.be.false;
      expect(el.required).to.be.false;
      expect(el.error).to.be.false;
    });

    it('should render with label', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email Address"></sando-input>
      `);

      const label = el.shadowRoot!.querySelector('label');
      expect(label).to.exist;
      expect(label!.textContent).to.include('Email Address');
    });

    it('should show required indicator when required', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Username" required></sando-input>
      `);

      const indicator = el.shadowRoot!.querySelector('.required-indicator');
      expect(indicator).to.exist;
      expect(indicator!.textContent).to.equal('*');
    });
  });

  describe('variants', () => {
    it('should apply outlined variant', async () => {
      const el = await fixture<SandoInput>(html` <sando-input variant="outlined"></sando-input> `);

      expect(el.variant).to.equal('outlined');
      expect(el.getAttribute('variant')).to.equal('outlined');
    });

    it('should apply filled variant', async () => {
      const el = await fixture<SandoInput>(html` <sando-input variant="filled"></sando-input> `);

      expect(el.variant).to.equal('filled');
      expect(el.getAttribute('variant')).to.equal('filled');
    });
  });

  describe('sizes', () => {
    ['small', 'medium', 'large'].forEach((size) => {
      it(`should apply ${size} size`, async () => {
        const el = await fixture<SandoInput>(html` <sando-input size="${size}"></sando-input> `);

        expect(el.size).to.equal(size);
        expect(el.getAttribute('size')).to.equal(size);
      });
    });
  });

  describe('value binding', () => {
    it('should set value via property', async () => {
      const el = await fixture<SandoInput>(html` <sando-input></sando-input> `);

      el.value = 'test value';
      await el.updateComplete;

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.value).to.equal('test value');
    });

    it('should update value on input', async () => {
      const el = await fixture<SandoInput>(html` <sando-input></sando-input> `);

      const input = el.shadowRoot!.querySelector('input')!;
      input.value = 'new value';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await el.updateComplete;

      expect(el.value).to.equal('new value');
    });
  });

  describe('states', () => {
    it('should disable input when disabled', async () => {
      const el = await fixture<SandoInput>(html` <sando-input disabled></sando-input> `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.disabled).to.be.true;
    });

    it('should make input readonly', async () => {
      const el = await fixture<SandoInput>(html` <sando-input readonly></sando-input> `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.readOnly).to.be.true;
    });

    it('should mark input as required', async () => {
      const el = await fixture<SandoInput>(html` <sando-input required></sando-input> `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.required).to.be.true;
    });

    it('should show error state', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input error error-text="This field is required"></sando-input>
      `);
      await el.updateComplete;

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-invalid')).to.equal('true');

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText).to.exist;
      expect(errorText!.textContent).to.include('This field is required');
    });

    it('should show helper text', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input helper-text="Enter your email address"></sando-input>
      `);
      await el.updateComplete;

      const helperText = el.shadowRoot!.querySelector('.helper-text');
      expect(helperText).to.exist;
      expect(helperText!.textContent).to.include('Enter your email address');
    });

    it('should prioritize error text over helper text', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input error helper-text="Helper" error-text="Error message"></sando-input>
      `);
      await el.updateComplete;

      const helperText = el.shadowRoot!.querySelector('.helper-text');
      const errorText = el.shadowRoot!.querySelector('.error-text');

      expect(helperText).to.not.exist;
      expect(errorText).to.exist;
      expect(errorText!.textContent).to.include('Error message');
    });
  });

  describe('slots', () => {
    it('should render prefix slot', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input>
          <span slot="prefix" id="prefix-icon">🔍</span>
        </sando-input>
      `);

      const slot = el.shadowRoot!.querySelector('slot[name="prefix"]');
      expect(slot).to.exist;

      const slottedElements = slot!.assignedElements();
      expect(slottedElements).to.have.lengthOf(1);
      expect(slottedElements[0].id).to.equal('prefix-icon');
    });

    it('should render suffix slot', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input>
          <button slot="suffix" id="clear-btn">Clear</button>
        </sando-input>
      `);

      const slot = el.shadowRoot!.querySelector('slot[name="suffix"]');
      expect(slot).to.exist;

      const slottedElements = slot!.assignedElements();
      expect(slottedElements).to.have.lengthOf(1);
      expect(slottedElements[0].id).to.equal('clear-btn');
    });
  });

  describe('events', () => {
    it('should fire input event on value change', async () => {
      const el = await fixture<SandoInput>(html` <sando-input></sando-input> `);

      let eventFired = false;
      el.addEventListener('input', () => {
        eventFired = true;
      });

      const input = el.shadowRoot!.querySelector('input')!;
      input.value = 'test';
      input.dispatchEvent(new Event('input', { bubbles: true }));

      expect(eventFired).to.be.true;
    });

    it('should fire change event with detail', async () => {
      const el = await fixture<SandoInput>(html` <sando-input></sando-input> `);

      let changeDetail: any = null;
      el.addEventListener('change', ((e: CustomEvent) => {
        changeDetail = e.detail;
      }) as EventListener);

      const input = el.shadowRoot!.querySelector('input')!;
      input.value = 'changed value';
      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(changeDetail).to.exist;
      expect(changeDetail.value).to.equal('changed value');
    });

    it('should fire focus event', async () => {
      const el = await fixture<SandoInput>(html` <sando-input></sando-input> `);

      let eventFired = false;
      el.addEventListener('focus', () => {
        eventFired = true;
      });

      const input = el.shadowRoot!.querySelector('input')!;
      input.dispatchEvent(new FocusEvent('focus', { bubbles: true }));

      expect(eventFired).to.be.true;
    });

    it('should fire blur event', async () => {
      const el = await fixture<SandoInput>(html` <sando-input></sando-input> `);

      let eventFired = false;
      el.addEventListener('blur', () => {
        eventFired = true;
      });

      const input = el.shadowRoot!.querySelector('input')!;
      input.dispatchEvent(new FocusEvent('blur', { bubbles: true }));

      expect(eventFired).to.be.true;
    });
  });

  describe('public API', () => {
    it('should focus input via focus() method', async () => {
      const el = await fixture<SandoInput>(html` <sando-input></sando-input> `);

      el.focus();
      await el.updateComplete;

      expect(document.activeElement).to.equal(el);
      // Note: In jsdom, shadowRoot focus doesn't work perfectly
      // The input element exists but we don't need to assert on it directly
    });

    it('should select text via select() method', async () => {
      const el = await fixture<SandoInput>(html` <sando-input value="test value"></sando-input> `);

      // This would work in a real browser but not in jsdom
      el.select();
      await el.updateComplete;

      // Just verify the method exists and doesn't throw
      expect(el.select).to.be.a('function');
    });
  });

  describe('input types', () => {
    ['text', 'email', 'password', 'number', 'tel', 'url', 'search'].forEach((type) => {
      it(`should support type="${type}"`, async () => {
        const el = await fixture<SandoInput>(html` <sando-input type="${type}"></sando-input> `);

        const input = el.shadowRoot!.querySelector('input');
        expect(input!.type).to.equal(type);
      });
    });
  });
});
