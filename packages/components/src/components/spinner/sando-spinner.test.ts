/**
 * Unit Tests for sando-spinner
 * Tests spinner rendering, variants, accessibility, and behavior
 */

import { fixture, html } from '@open-wc/testing';
import './sando-spinner.js';
import type { SandoSpinner } from './sando-spinner.js';
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  DEFAULT_LABEL,
  DEFAULT_ARC,
  MIN_ARC,
  MAX_ARC,
  SVG_VIEWBOX,
  CIRCLE_CENTER,
  CIRCLE_RADIUS,
  CIRCUMFERENCE
} from './sando-spinner.constants.js';
import { SPINNER_ROLE } from './sando-spinner.a11y.js';

describe('sando-spinner', () => {
  let element: SandoSpinner;

  describe('Rendering', () => {
    it('should render with default props', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      expect(element).toBeDefined();
      expect(element.shadowRoot).toBeDefined();
    });

    it('should render with default property values', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      expect(element.size).toBe(DEFAULT_SIZE);
      expect(element.variant).toBe(DEFAULT_VARIANT);
      expect(element.label).toBe(DEFAULT_LABEL);
      expect(element.arc).toBe(DEFAULT_ARC);
    });

    it('should render SVG element', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const svg = element.shadowRoot?.querySelector('svg');
      expect(svg).toBeDefined();
      expect(svg).not.toBeNull();
    });

    it('should render circle element inside SVG', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle');
      expect(circle).toBeDefined();
      expect(circle).not.toBeNull();
    });

    it('should render spinner wrapper with correct class', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.spinner');
      expect(wrapper).toBeDefined();
      expect(wrapper).not.toBeNull();
    });

    it('should render SVG with correct viewBox', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const svg = element.shadowRoot?.querySelector('svg');
      expect(svg?.getAttribute('viewBox')).toBe(SVG_VIEWBOX);
    });

    it('should render circle with correct attributes', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle');
      expect(circle?.getAttribute('cx')).toBe(String(CIRCLE_CENTER));
      expect(circle?.getAttribute('cy')).toBe(String(CIRCLE_CENTER));
      expect(circle?.getAttribute('r')).toBe(String(CIRCLE_RADIUS));
      expect(circle?.getAttribute('fill')).toBe('none');
      expect(circle?.getAttribute('stroke')).toBe('currentColor');
      expect(circle?.getAttribute('stroke-linecap')).toBe('round');
    });

    it('should expose spinner part for styling', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const part = element.shadowRoot?.querySelector('[part="spinner"]');
      expect(part).toBeDefined();
      expect(part).not.toBeNull();
    });

    it('should have SVG marked as aria-hidden', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const svg = element.shadowRoot?.querySelector('svg');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Arc Prop', () => {
    it('should apply default arc value', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      expect(element.arc).toBe(DEFAULT_ARC);
    });

    it('should apply custom arc value', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner arc="0.5"></sando-spinner>`);
      await element.updateComplete;

      expect(element.arc).toBe(0.5);
    });

    it('should reflect arc attribute', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      element.arc = 0.25;
      await element.updateComplete;

      expect(element.getAttribute('arc')).toBe('0.25');
    });

    it('should update stroke-dasharray when arc changes', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner arc="0.5"></sando-spinner>`);
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle');
      const dasharray = circle?.getAttribute('stroke-dasharray');

      // arc=0.5 means 50% visible: arcLength ≈ 28.27, gapLength ≈ 28.27
      const expectedArcLength = CIRCUMFERENCE * 0.5;
      const expectedGapLength = CIRCUMFERENCE * 0.5;

      expect(dasharray).toBe(`${expectedArcLength} ${expectedGapLength}`);
    });

    it('should calculate correct stroke-dasharray for default arc (0.75)', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle');
      const dasharray = circle?.getAttribute('stroke-dasharray');

      const expectedArcLength = CIRCUMFERENCE * DEFAULT_ARC;
      const expectedGapLength = CIRCUMFERENCE * (1 - DEFAULT_ARC);

      expect(dasharray).toBe(`${expectedArcLength} ${expectedGapLength}`);
    });

    it('should clamp arc value below minimum to MIN_ARC', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner arc="0.01"></sando-spinner>`);
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle');
      const dasharray = circle?.getAttribute('stroke-dasharray');

      // Should clamp to MIN_ARC (0.1)
      const expectedArcLength = CIRCUMFERENCE * MIN_ARC;
      const expectedGapLength = CIRCUMFERENCE * (1 - MIN_ARC);

      expect(dasharray).toBe(`${expectedArcLength} ${expectedGapLength}`);
    });

    it('should clamp arc value above maximum to MAX_ARC', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner arc="1.5"></sando-spinner>`);
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle');
      const dasharray = circle?.getAttribute('stroke-dasharray');

      // Should clamp to MAX_ARC (1.0) - full circle
      const expectedArcLength = CIRCUMFERENCE * MAX_ARC;
      const expectedGapLength = CIRCUMFERENCE * (1 - MAX_ARC);

      expect(dasharray).toBe(`${expectedArcLength} ${expectedGapLength}`);
    });

    it('should handle arc=1 (full circle)', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner arc="1"></sando-spinner>`);
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle');
      const dasharray = circle?.getAttribute('stroke-dasharray');

      // Full circle: gap should be 0
      expect(dasharray).toBe(`${CIRCUMFERENCE} 0`);
    });

    it('should update arc dynamically', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      element.arc = 0.3;
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle');
      const dasharray = circle?.getAttribute('stroke-dasharray');

      const expectedArcLength = CIRCUMFERENCE * 0.3;
      const expectedGapLength = CIRCUMFERENCE * 0.7;

      expect(dasharray).toBe(`${expectedArcLength} ${expectedGapLength}`);
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      it(`should apply ${size} size`, async () => {
        element = await fixture<SandoSpinner>(html`<sando-spinner size="${size}"></sando-spinner>`);
        await element.updateComplete;

        expect(element.size).toBe(size);
        expect(element.getAttribute('size')).toBe(size);
      });
    });

    it('should reflect size attribute to property', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      element.setAttribute('size', 'lg');
      await element.updateComplete;

      expect(element.size).toBe('lg');
    });

    it('should reflect size property to attribute', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      element.size = 'xl';
      await element.updateComplete;

      expect(element.getAttribute('size')).toBe('xl');
    });
  });

  describe('Variant Prop', () => {
    const variants = ['default', 'inverted'] as const;

    variants.forEach((variant) => {
      it(`should apply ${variant} variant`, async () => {
        element = await fixture<SandoSpinner>(
          html`<sando-spinner variant="${variant}"></sando-spinner>`
        );
        await element.updateComplete;

        expect(element.variant).toBe(variant);
        expect(element.getAttribute('variant')).toBe(variant);
      });
    });

    it('should reflect variant attribute to property', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      element.setAttribute('variant', 'inverted');
      await element.updateComplete;

      expect(element.variant).toBe('inverted');
    });

    it('should reflect variant property to attribute', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      element.variant = 'inverted';
      await element.updateComplete;

      expect(element.getAttribute('variant')).toBe('inverted');
    });
  });

  describe('Label Prop', () => {
    it('should apply default label', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      expect(element.label).toBe(DEFAULT_LABEL);
    });

    it('should apply custom label', async () => {
      element = await fixture<SandoSpinner>(
        html`<sando-spinner label="Loading user data"></sando-spinner>`
      );
      await element.updateComplete;

      expect(element.label).toBe('Loading user data');
    });

    it('should update label dynamically', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      element.label = 'Processing request';
      await element.updateComplete;

      expect(element.label).toBe('Processing request');
    });

    it('should reflect label to aria-label attribute', async () => {
      element = await fixture<SandoSpinner>(
        html`<sando-spinner label="Custom loading"></sando-spinner>`
      );
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.spinner');
      expect(wrapper?.getAttribute('aria-label')).toBe('Custom loading');
    });
  });

  describe('Accessibility', () => {
    it('should have role="status"', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.spinner');
      expect(wrapper?.getAttribute('role')).toBe(SPINNER_ROLE);
    });

    it('should have correct default aria-label', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.spinner');
      expect(wrapper?.getAttribute('aria-label')).toBe(DEFAULT_LABEL);
    });

    it('should apply custom aria-label from label prop', async () => {
      element = await fixture<SandoSpinner>(
        html`<sando-spinner label="Fetching results"></sando-spinner>`
      );
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.spinner');
      expect(wrapper?.getAttribute('aria-label')).toBe('Fetching results');
    });

    it('should have SVG marked as aria-hidden', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const svg = element.shadowRoot?.querySelector('svg');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should be accessible in all size variants', async () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      for (const size of sizes) {
        element = await fixture<SandoSpinner>(html`<sando-spinner size="${size}"></sando-spinner>`);
        await element.updateComplete;

        const wrapper = element.shadowRoot?.querySelector('.spinner');
        expect(wrapper?.getAttribute('role')).toBe(SPINNER_ROLE);
        expect(wrapper?.getAttribute('aria-label')).toBe(DEFAULT_LABEL);
      }
    });

    it('should be accessible in all variant modes', async () => {
      const variants = ['default', 'inverted'] as const;

      for (const variant of variants) {
        element = await fixture<SandoSpinner>(
          html`<sando-spinner variant="${variant}"></sando-spinner>`
        );
        await element.updateComplete;

        const wrapper = element.shadowRoot?.querySelector('.spinner');
        expect(wrapper?.getAttribute('role')).toBe(SPINNER_ROLE);
        expect(wrapper?.getAttribute('aria-label')).toBe(DEFAULT_LABEL);
      }
    });
  });

  describe('SVG Structure', () => {
    it('should render SVG with spinner__svg class', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const svg = element.shadowRoot?.querySelector('svg.spinner__svg');
      expect(svg).not.toBeNull();
    });

    it('should render circle with spinner__circle class', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle.spinner__circle');
      expect(circle).not.toBeNull();
    });

    it('should have SVG inside spinner wrapper', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.spinner');
      const svg = wrapper?.querySelector('svg');
      expect(svg).not.toBeNull();
    });
  });

  describe('Flavor System', () => {
    it('should allow explicit flavor to be set', async () => {
      element = await fixture<SandoSpinner>(
        html`<sando-spinner flavor="strawberry"></sando-spinner>`
      );
      await element.updateComplete;

      expect(element.flavor).toBe('strawberry');
      expect(element.effectiveFlavor).toBe('strawberry');
    });

    it('should allow explicit flavor override', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div flavor="strawberry">
          <sando-spinner flavor="tonkatsu"></sando-spinner>
        </div>
      `);

      element = container.querySelector('sando-spinner') as SandoSpinner;
      await element.updateComplete;

      expect(element.flavor).toBe('tonkatsu');
    });

    it('should use default flavor when none specified', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      // effectiveFlavor should return the default flavor 'original'
      expect(element.effectiveFlavor).toBe('original');
    });

    it('should reflect flavor attribute', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      element.flavor = 'chocolate';
      await element.updateComplete;

      expect(element.getAttribute('flavor')).toBe('chocolate');
    });
  });

  describe('Snapshot Tests', () => {
    it('should match default state snapshot', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });

    describe('Size Snapshots', () => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

      sizes.forEach((size) => {
        it(`should match ${size} size snapshot`, async () => {
          element = await fixture<SandoSpinner>(
            html`<sando-spinner size="${size}"></sando-spinner>`
          );
          await element.updateComplete;

          expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
        });
      });
    });

    describe('Variant Snapshots', () => {
      const variants = ['default', 'inverted'] as const;

      variants.forEach((variant) => {
        it(`should match ${variant} variant snapshot`, async () => {
          element = await fixture<SandoSpinner>(
            html`<sando-spinner variant="${variant}"></sando-spinner>`
          );
          await element.updateComplete;

          expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
        });
      });
    });

    describe('Arc Snapshots', () => {
      const arcValues = [0.25, 0.5, 0.75, 1.0] as const;

      arcValues.forEach((arc) => {
        it(`should match arc=${arc} snapshot`, async () => {
          element = await fixture<SandoSpinner>(html`<sando-spinner arc="${arc}"></sando-spinner>`);
          await element.updateComplete;

          expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
        });
      });
    });

    it('should match custom label snapshot', async () => {
      element = await fixture<SandoSpinner>(
        html`<sando-spinner label="Custom loading message"></sando-spinner>`
      );
      await element.updateComplete;

      expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty label gracefully', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner label=""></sando-spinner>`);
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.spinner');
      // Should still have aria-label attribute (empty is valid)
      expect(wrapper?.hasAttribute('aria-label')).toBe(true);
    });

    it('should handle multiple rapid property changes', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);

      element.size = 'xs';
      element.size = 'sm';
      element.size = 'lg';
      element.size = 'xl';
      await element.updateComplete;

      expect(element.size).toBe('xl');
      expect(element.getAttribute('size')).toBe('xl');
    });

    it('should handle multiple rapid arc changes', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);

      element.arc = 0.1;
      element.arc = 0.5;
      element.arc = 0.9;
      element.arc = 0.3;
      await element.updateComplete;

      expect(element.arc).toBe(0.3);

      const circle = element.shadowRoot?.querySelector('circle');
      const dasharray = circle?.getAttribute('stroke-dasharray');
      const expectedArcLength = CIRCUMFERENCE * 0.3;
      const expectedGapLength = CIRCUMFERENCE * 0.7;

      expect(dasharray).toBe(`${expectedArcLength} ${expectedGapLength}`);
    });

    it('should maintain accessibility after property updates', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);

      element.size = 'xl';
      element.variant = 'inverted';
      element.label = 'Updated label';
      element.arc = 0.5;
      await element.updateComplete;

      const wrapper = element.shadowRoot?.querySelector('.spinner');
      expect(wrapper?.getAttribute('role')).toBe(SPINNER_ROLE);
      expect(wrapper?.getAttribute('aria-label')).toBe('Updated label');
    });

    it('should handle negative arc value', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner arc="-0.5"></sando-spinner>`);
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle');
      const dasharray = circle?.getAttribute('stroke-dasharray');

      // Should clamp to MIN_ARC (0.1)
      const expectedArcLength = CIRCUMFERENCE * MIN_ARC;
      const expectedGapLength = CIRCUMFERENCE * (1 - MIN_ARC);

      expect(dasharray).toBe(`${expectedArcLength} ${expectedGapLength}`);
    });

    it('should handle zero arc value', async () => {
      element = await fixture<SandoSpinner>(html`<sando-spinner arc="0"></sando-spinner>`);
      await element.updateComplete;

      const circle = element.shadowRoot?.querySelector('circle');
      const dasharray = circle?.getAttribute('stroke-dasharray');

      // Should clamp to MIN_ARC (0.1)
      const expectedArcLength = CIRCUMFERENCE * MIN_ARC;
      const expectedGapLength = CIRCUMFERENCE * (1 - MIN_ARC);

      expect(dasharray).toBe(`${expectedArcLength} ${expectedGapLength}`);
    });
  });

  describe('Constants', () => {
    it('should have correct default size', () => {
      expect(DEFAULT_SIZE).toBe('md');
    });

    it('should have correct default variant', () => {
      expect(DEFAULT_VARIANT).toBe('default');
    });

    it('should have correct default label', () => {
      expect(DEFAULT_LABEL).toBe('Loading');
    });

    it('should have correct default arc', () => {
      expect(DEFAULT_ARC).toBe(0.25);
    });

    it('should have correct MIN_ARC', () => {
      expect(MIN_ARC).toBe(0.1);
    });

    it('should have correct MAX_ARC', () => {
      expect(MAX_ARC).toBe(1.0);
    });

    it('should have correct SVG_VIEWBOX', () => {
      expect(SVG_VIEWBOX).toBe('0 0 24 24');
    });

    it('should have correct CIRCLE_CENTER', () => {
      expect(CIRCLE_CENTER).toBe(12);
    });

    it('should have correct CIRCLE_RADIUS', () => {
      expect(CIRCLE_RADIUS).toBe(9);
    });

    it('should have correct CIRCUMFERENCE', () => {
      const expected = 2 * Math.PI * CIRCLE_RADIUS;
      expect(CIRCUMFERENCE).toBeCloseTo(expected, 5);
    });
  });
});
