/**
 * Unit tests for sando-skeleton-table-row component
 */

import { fixture, expect, html } from '@open-wc/testing';
import { SandoSkeletonTableRow } from './sando-skeleton-table-row.js';
import './sando-skeleton-table-row.js';

describe('sando-skeleton-table-row', () => {
  // ============================================
  // RENDERING
  // ============================================

  it('renders with default props', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row></sando-skeleton-table-row>`
    );

    expect(el).to.exist;
    expect(el).to.be.instanceOf(SandoSkeletonTableRow);
  });

  it('should be defined as a custom element', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row></sando-skeleton-table-row>`
    );

    expect(el.tagName.toLowerCase()).to.equal('sando-skeleton-table-row');
    expect(customElements.get('sando-skeleton-table-row')).to.exist;
  });

  // ============================================
  // COLUMNS PROPERTY
  // ============================================

  it('renders with default columns (4)', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row></sando-skeleton-table-row>`
    );

    expect(el.columns).to.equal(4);

    const cells = el.shadowRoot?.querySelectorAll('.cell');
    expect(cells?.length).to.equal(4);
  });

  it('respects columns prop', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row columns="6"></sando-skeleton-table-row>`
    );

    expect(el.columns).to.equal(6);

    const cells = el.shadowRoot?.querySelectorAll('.cell');
    expect(cells?.length).to.equal(6);
  });

  it('renders 2 columns when specified', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row columns="2"></sando-skeleton-table-row>`
    );

    expect(el.columns).to.equal(2);

    const cells = el.shadowRoot?.querySelectorAll('.cell');
    expect(cells?.length).to.equal(2);
  });

  it('updates columns via property', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row></sando-skeleton-table-row>`
    );

    el.columns = 3;
    await el.updateComplete;

    const cells = el.shadowRoot?.querySelectorAll('.cell');
    expect(cells?.length).to.equal(3);
  });

  // ============================================
  // COLUMN WIDTHS PROPERTY
  // ============================================

  it('respects columnWidths prop', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row column-widths="20%,30%,30%,20%"></sando-skeleton-table-row>`
    );

    expect(el.columnWidths).to.equal('20%,30%,30%,20%');

    const cells = el.shadowRoot?.querySelectorAll('.cell');
    expect(cells?.length).to.equal(4);

    // Check that styles are applied
    const firstCell = cells?.[0] as HTMLElement;
    expect(firstCell.style.flex).to.include('20%');
  });

  it('creates equal widths when no columnWidths provided', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row columns="4"></sando-skeleton-table-row>`
    );

    const cells = el.shadowRoot?.querySelectorAll('.cell');
    expect(cells?.length).to.equal(4);

    // Each cell should have 25% width (100/4)
    const firstCell = cells?.[0] as HTMLElement;
    expect(firstCell.style.flex).to.include('25%');
  });

  it('parses columnWidths with extra spaces', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row column-widths="25% , 50% , 25%"></sando-skeleton-table-row>`
    );

    const cells = el.shadowRoot?.querySelectorAll('.cell');
    expect(cells?.length).to.equal(3);

    const secondCell = cells?.[1] as HTMLElement;
    expect(secondCell.style.flex).to.include('50%');
  });

  // ============================================
  // SHOW CHECKBOX PROPERTY
  // ============================================

  it('hides checkbox by default', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row></sando-skeleton-table-row>`
    );

    expect(el.showCheckbox).to.be.false;

    const checkbox = el.shadowRoot?.querySelector('.checkbox');
    expect(checkbox).to.be.null;
  });

  it('shows checkbox when show-checkbox is set', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row show-checkbox></sando-skeleton-table-row>`
    );

    expect(el.showCheckbox).to.be.true;

    const checkbox = el.shadowRoot?.querySelector('.checkbox');
    expect(checkbox).to.exist;
  });

  it('checkbox is first element in row', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row show-checkbox></sando-skeleton-table-row>`
    );

    const row = el.shadowRoot?.querySelector('.row');
    const firstChild = row?.firstElementChild;
    expect(firstChild?.classList.contains('checkbox')).to.be.true;
  });

  it('updates showCheckbox via property', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row></sando-skeleton-table-row>`
    );

    expect(el.shadowRoot?.querySelector('.checkbox')).to.be.null;

    el.showCheckbox = true;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.checkbox')).to.exist;
  });

  // ============================================
  // COMPOSITION
  // ============================================

  it('uses skeleton-composer for animation sync', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row></sando-skeleton-table-row>`
    );

    const composer = el.shadowRoot?.querySelector('sando-skeleton-composer');
    expect(composer).to.exist;
  });

  it('renders skeleton-text in cells', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row></sando-skeleton-table-row>`
    );

    const texts = el.shadowRoot?.querySelectorAll('sando-skeleton-text');
    expect(texts?.length).to.equal(4);
  });

  it('renders skeleton checkbox with correct shape', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row show-checkbox></sando-skeleton-table-row>`
    );

    const checkboxSkeleton = el.shadowRoot?.querySelector('.checkbox sando-skeleton');
    expect(checkboxSkeleton).to.exist;
    expect(checkboxSkeleton?.getAttribute('shape')).to.equal('rounded');
    expect(checkboxSkeleton?.getAttribute('width')).to.equal('16px');
    expect(checkboxSkeleton?.getAttribute('height')).to.equal('16px');
  });

  // ============================================
  // FLAVOR SUPPORT
  // ============================================

  it('supports flavor property from mixin', async () => {
    const el = await fixture<SandoSkeletonTableRow>(
      html`<sando-skeleton-table-row flavor="kawaii"></sando-skeleton-table-row>`
    );

    expect(el.flavor).to.equal('kawaii');
    expect(el.getAttribute('flavor')).to.equal('kawaii');
  });
});
