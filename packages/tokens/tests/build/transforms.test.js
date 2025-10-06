/**
 * Style Dictionary Transform Tests
 *
 * Tests the custom transforms:
 * - css-var-reference transform
 * - name-css-sando transform
 */

import { describe, it, expect } from 'vitest';
import cssVarReference from '../../build/transforms/css-var-reference.js';
import nameCssSando from '../../build/transforms/name-css-sando.js';

describe('Transform: css-var-reference', () => {
  describe('Filter Function', () => {
    it('should match tokens with references in original value', () => {
      const token = {
        value: 'hsl(17, 88%, 40%)', // resolved
        original: {
          value: '{color.brand.700.value}' // original reference
        }
      };

      const result = cssVarReference.filter(token);
      expect(result).toBe(true);
    });

    it('should not match tokens without references', () => {
      const token = {
        value: 'hsl(17, 88%, 40%)',
        original: {
          value: 'hsl(17, 88%, 40%)' // no reference
        }
      };

      const result = cssVarReference.filter(token);
      expect(result).toBe(false);
    });

    it('should not match tokens with only resolved values', () => {
      const token = {
        value: 'hsl(17, 88%, 40%)'
        // no original property
      };

      const result = cssVarReference.filter(token);
      expect(result).toBeFalsy();
    });

    it('should not match non-string values', () => {
      const token = {
        value: 400,
        original: {
          value: 400
        }
      };

      const result = cssVarReference.filter(token);
      expect(result).toBe(false);
    });
  });

  describe('Transform Function', () => {
    it('should convert simple reference to CSS var()', () => {
      const token = {
        original: {
          value: '{color.brand.700.value}'
        }
      };

      const result = cssVarReference.transform(token);
      expect(result).toBe('var(--sando-color-brand-700)');
    });

    it('should convert nested reference to CSS var()', () => {
      const token = {
        original: {
          value: '{color.action.solid.background.default.value}'
        }
      };

      const result = cssVarReference.transform(token);
      expect(result).toBe('var(--sando-color-action-solid-background-default)');
    });

    it('should handle multiple references in clamp()', () => {
      const token = {
        original: {
          value: 'clamp({font.size.600.value}, 5vw, {font.size.700.value})'
        }
      };

      const result = cssVarReference.transform(token);
      expect(result).toBe('clamp(var(--sando-font-size-600), 5vw, var(--sando-font-size-700))');
    });

    it('should handle references with hyphens', () => {
      const token = {
        original: {
          value: '{border.radius.circle.value}'
        }
      };

      const result = cssVarReference.transform(token);
      expect(result).toBe('var(--sando-border-radius-circle)');
    });

    it('should preserve non-reference parts of the value', () => {
      const token = {
        original: {
          value: '0 4px 6px {color.neutral.900.value}'
        }
      };

      const result = cssVarReference.transform(token);
      expect(result).toBe('0 4px 6px var(--sando-color-neutral-900)');
    });
  });

  describe('Transform Properties', () => {
    it('should have correct name', () => {
      expect(cssVarReference.name).toBe('name/css-var-reference');
    });

    it('should be a value transform', () => {
      expect(cssVarReference.type).toBe('value');
    });

    it('should be transitive', () => {
      expect(cssVarReference.transitive).toBe(true);
    });
  });
});

describe('Transform: name-css-sando', () => {
  describe('Transform Function', () => {
    it('should add --sando- prefix to token names', () => {
      const token = {
        path: ['color', 'brand', '700']
      };

      const result = nameCssSando.transform(token);
      expect(result).toBe('--sando-color-brand-700');
    });

    it('should handle single-level paths', () => {
      const token = {
        path: ['spacing']
      };

      const result = nameCssSando.transform(token);
      expect(result).toBe('--sando-spacing');
    });

    it('should handle deeply nested paths', () => {
      const token = {
        path: ['button', 'solid', 'backgroundColor', 'default']
      };

      const result = nameCssSando.transform(token);
      expect(result).toBe('--sando-button-solid-backgroundColor-default');
    });

    it('should handle paths with numbers', () => {
      const token = {
        path: ['color', 'brand', '700']
      };

      const result = nameCssSando.transform(token);
      expect(result).toBe('--sando-color-brand-700');
    });

    it('should handle camelCase in paths', () => {
      const token = {
        path: ['button', 'backgroundColor']
      };

      const result = nameCssSando.transform(token);
      expect(result).toBe('--sando-button-backgroundColor');
    });
  });

  describe('Transform Properties', () => {
    it('should have correct name', () => {
      expect(nameCssSando.name).toBe('name/css-sando');
    });

    it('should be a name transform', () => {
      expect(nameCssSando.type).toBe('name');
    });
  });
});

describe('Transform Integration', () => {
  it('should work together: name + reference', () => {
    const token = {
      path: ['button', 'solid', 'backgroundColor', 'default'],
      value: 'hsl(17, 88%, 40%)',
      original: {
        value: '{color.action.solid.background.default.value}'
      }
    };

    // Apply name transform
    const name = nameCssSando.transform(token);
    expect(name).toBe('--sando-button-solid-backgroundColor-default');

    // Apply reference transform
    const value = cssVarReference.transform(token);
    expect(value).toBe('var(--sando-color-action-solid-background-default)');

    // Result should be:
    // --sando-button-solid-backgroundColor-default: var(--sando-color-action-solid-background-default);
  });
});
