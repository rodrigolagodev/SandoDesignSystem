/**
 * Unit Tests for sando-option-group
 *
 * Tests component rendering, property behavior, and lifecycle methods.
 *
 * @module option-group-test
 */

import { fixture, expect, html } from '@open-wc/testing';
import { SandoOptionGroup } from './sando-option-group.js';
import './sando-option-group.js';

describe('sando-option-group', () => {
  it('should be defined', () => {
    const el = document.createElement('sando-option-group');
    expect(el).to.be.instanceOf(SandoOptionGroup);
  });

  it('should render with default props', async () => {
    const el = await fixture<SandoOptionGroup>(
      html`<sando-option-group label="Test Group"></sando-option-group>`
    );
    expect(el).to.exist;
    expect(el.label).to.equal('Test Group');
    expect(el.disabled).to.be.false;
  });

  it('should reflect label attribute', async () => {
    const el = await fixture<SandoOptionGroup>(
      html`<sando-option-group label="My Group"></sando-option-group>`
    );
    expect(el.getAttribute('label')).to.equal('My Group');
  });

  it('should reflect disabled attribute', async () => {
    const el = await fixture<SandoOptionGroup>(
      html`<sando-option-group label="Test" disabled></sando-option-group>`
    );
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.disabled).to.be.true;
  });

  it('should render label text', async () => {
    const el = await fixture<SandoOptionGroup>(
      html`<sando-option-group label="Fruits"></sando-option-group>`
    );
    const labelEl = el.shadowRoot?.querySelector('.option-group-label');
    expect(labelEl?.textContent).to.equal('Fruits');
  });

  it('should have correct ARIA attributes', async () => {
    const el = await fixture<SandoOptionGroup>(
      html`<sando-option-group label="Categories"></sando-option-group>`
    );
    const groupEl = el.shadowRoot?.querySelector('.option-group');
    expect(groupEl?.getAttribute('role')).to.equal('group');
    expect(groupEl?.getAttribute('aria-label')).to.equal('Categories');
  });

  it('should set aria-disabled when disabled', async () => {
    const el = await fixture<SandoOptionGroup>(
      html`<sando-option-group label="Test" disabled></sando-option-group>`
    );
    const groupEl = el.shadowRoot?.querySelector('.option-group');
    expect(groupEl?.getAttribute('aria-disabled')).to.equal('true');
  });

  // TODO: Add tests for child option disabled propagation
  // These tests require sando-option component to be implemented
});
