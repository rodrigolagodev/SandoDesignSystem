/**
 * Token Value Validation Tests
 *
 * Tests the actual values of tokens:
 * - Color format (HSL)
 * - Dimension units (rem, px)
 * - Value ranges (opacity 0-1, etc.)
 * - Font weights (100-900)
 * - Animation durations (ms)
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tokensRoot = path.resolve(__dirname, '../../src');

function loadTokenFile(layer, fileName) {
  const filePath = path.join(tokensRoot, layer, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function findTokensByType(obj, targetType, currentPath = []) {
  const tokens = [];

  for (const key in obj) {
    const value = obj[key];
    const newPath = [...currentPath, key];

    if (typeof value === 'object' && value !== null) {
      if (value.type === targetType && 'value' in value) {
        tokens.push({
          path: newPath.join('.'),
          value: value.value,
          token: value
        });
      }
      tokens.push(...findTokensByType(value, targetType, newPath));
    }
  }

  return tokens;
}

describe('Color Token Values', () => {
  const colors = loadTokenFile('ingredients', 'color.json');
  const colorTokens = findTokensByType(colors, 'color');

  it('should have color tokens', () => {
    expect(colorTokens.length).toBeGreaterThan(0);
  });

  describe('HSL Format', () => {
    colorTokens.forEach(({ path, value }) => {
      // Skip references and special values
      if (typeof value === 'string' && (value.includes('{') || value === 'transparent')) {
        return;
      }

      it(`${path} should use HSL format`, () => {
        const hslPattern = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
        expect(value).toMatch(hslPattern);
      });

      it(`${path} should have valid hue (0-360)`, () => {
        const match = value.match(/hsl\((\d+),/);
        if (match) {
          const hue = parseInt(match[1]);
          expect(hue).toBeGreaterThanOrEqual(0);
          expect(hue).toBeLessThanOrEqual(360);
        }
      });

      it(`${path} should have valid saturation (0-100%)`, () => {
        const match = value.match(/,\s*(\d+)%/);
        if (match) {
          const saturation = parseInt(match[1]);
          expect(saturation).toBeGreaterThanOrEqual(0);
          expect(saturation).toBeLessThanOrEqual(100);
        }
      });

      it(`${path} should have valid lightness (0-100%)`, () => {
        const match = value.match(/,\s*\d+%\s*,\s*(\d+)%/);
        if (match) {
          const lightness = parseInt(match[1]);
          expect(lightness).toBeGreaterThanOrEqual(0);
          expect(lightness).toBeLessThanOrEqual(100);
        }
      });
    });
  });

  describe('Special Color Values', () => {
    it('should have utility colors', () => {
      expect(colors.color.utility).toBeDefined();
      expect(colors.color.utility.white).toBeDefined();
      expect(colors.color.utility.black).toBeDefined();
      expect(colors.color.utility.transparent).toBeDefined();
    });

    it('should accept transparent value', () => {
      expect(colors.color.utility.transparent.value).toBe('transparent');
    });
  });
});

describe('Dimension Token Values', () => {
  const space = loadTokenFile('ingredients', 'space.json');
  const border = loadTokenFile('ingredients', 'border.json');
  const font = loadTokenFile('ingredients', 'font.json');

  const dimensionTokens = [
    ...findTokensByType(space, 'dimension'),
    ...findTokensByType(border, 'dimension'),
    ...findTokensByType(font, 'dimension')
  ];

  it('should have dimension tokens', () => {
    expect(dimensionTokens.length).toBeGreaterThan(0);
  });

  dimensionTokens.forEach(({ path, value }) => {
    // Skip references
    if (typeof value === 'string' && value.includes('{')) {
      return;
    }

    it(`${path} should have valid unit (rem, px, em, %)`, () => {
      const validUnits = /(rem|px|em|%)$/;
      expect(value).toMatch(validUnits);
    });

    it(`${path} should have numeric value`, () => {
      const numericPart = parseFloat(value);
      expect(isNaN(numericPart)).toBe(false);
      expect(numericPart).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Spacing Scale', () => {
    const spacingTokens = findTokensByType(space, 'dimension');

    spacingTokens.forEach(({ path, value }) => {
      it(`${path} should use rem units (scalable)`, () => {
        expect(value).toMatch(/rem$/);
      });
    });
  });

  describe('Border Radius', () => {
    it('should have special values', () => {
      expect(border.border.radius.circle.value).toBe('50%');
      expect(border.border.radius.full.value).toBe('9999px');
    });
  });
});

describe('Font Weight Values', () => {
  const font = loadTokenFile('ingredients', 'font.json');
  const fontWeightTokens = findTokensByType(font, 'fontWeight');

  it('should have font weight tokens', () => {
    expect(fontWeightTokens.length).toBeGreaterThan(0);
  });

  fontWeightTokens.forEach(({ path, value }) => {
    // Skip references
    if (typeof value === 'string' && value.includes('{')) {
      return;
    }

    it(`${path} should be a valid CSS font-weight`, () => {
      const validWeights = ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold'];
      expect(validWeights).toContain(value);
    });

    if (!isNaN(parseInt(value))) {
      it(`${path} should be in range 100-900`, () => {
        const weight = parseInt(value);
        expect(weight).toBeGreaterThanOrEqual(100);
        expect(weight).toBeLessThanOrEqual(900);
        expect(weight % 100).toBe(0); // Should be multiples of 100
      });
    }
  });
});

describe('Duration Values', () => {
  const animation = loadTokenFile('ingredients', 'animation.json');
  const durationTokens = findTokensByType(animation, 'duration');

  it('should have duration tokens', () => {
    expect(durationTokens.length).toBeGreaterThan(0);
  });

  durationTokens.forEach(({ path, value }) => {
    // Skip references
    if (typeof value === 'string' && value.includes('{')) {
      return;
    }

    it(`${path} should use ms or s unit`, () => {
      expect(value).toMatch(/(ms|s)$/);
    });

    it(`${path} should have numeric value >= 0`, () => {
      const numericPart = parseFloat(value);
      expect(isNaN(numericPart)).toBe(false);
      expect(numericPart).toBeGreaterThanOrEqual(0);
    });

    it(`${path} should be reasonable duration (0-2000ms)`, () => {
      let milliseconds;

      if (value.endsWith('ms')) {
        milliseconds = parseFloat(value);
      } else if (value.endsWith('s')) {
        milliseconds = parseFloat(value) * 1000;
      }

      expect(milliseconds).toBeLessThanOrEqual(2000);
    });
  });
});

describe('Opacity Values', () => {
  const opacity = loadTokenFile('ingredients', 'opacity.json');
  const opacityTokens = findTokensByType(opacity, 'number');

  it('should have opacity tokens', () => {
    expect(opacityTokens.length).toBeGreaterThan(0);
  });

  opacityTokens.forEach(({ path, value }) => {
    // Skip references
    if (typeof value === 'string' && value.includes('{')) {
      return;
    }

    it(`${path} should be a number`, () => {
      const numValue = parseFloat(value);
      expect(isNaN(numValue)).toBe(false);
    });

    it(`${path} should be in range 0-1`, () => {
      const numValue = parseFloat(value);
      expect(numValue).toBeGreaterThanOrEqual(0);
      expect(numValue).toBeLessThanOrEqual(1);
    });
  });
});

describe('Line Height Values', () => {
  const font = loadTokenFile('ingredients', 'font.json');
  const lineHeightTokens = findTokensByType(font, 'number');

  lineHeightTokens.forEach(({ path, value }) => {
    // Skip references and opacity tokens
    if (path.includes('opacity') || (typeof value === 'string' && value.includes('{'))) {
      return;
    }

    it(`${path} should be a number`, () => {
      const numValue = parseFloat(value);
      expect(isNaN(numValue)).toBe(false);
    });

    it(`${path} should be reasonable line-height (1-3)`, () => {
      const numValue = parseFloat(value);
      expect(numValue).toBeGreaterThanOrEqual(1);
      expect(numValue).toBeLessThanOrEqual(3);
    });
  });
});

describe('Z-Index Values', () => {
  const zIndex = loadTokenFile('ingredients', 'z-index.json');
  const zIndexTokens = findTokensByType(zIndex, 'number');

  it('should have z-index tokens', () => {
    expect(zIndexTokens.length).toBeGreaterThan(0);
  });

  zIndexTokens.forEach(({ path, value }) => {
    // Skip references
    if (typeof value === 'string' && value.includes('{')) {
      return;
    }

    it(`${path} should be an integer`, () => {
      const numValue = parseInt(value);
      expect(isNaN(numValue)).toBe(false);
      expect(numValue).toBe(parseFloat(value)); // No decimals
    });

    it(`${path} should be reasonable z-index (-1 to 10000)`, () => {
      const numValue = parseInt(value);
      expect(numValue).toBeGreaterThanOrEqual(-1);
      expect(numValue).toBeLessThanOrEqual(10000);
    });
  });

  it('should have proper z-index hierarchy', () => {
    const hide = parseInt(zIndex['z-index'].hide.value);
    const base = parseInt(zIndex['z-index'].base.value);
    const raised = parseInt(zIndex['z-index'].raised.value);
    const modal = parseInt(zIndex['z-index'].modal.value);
    const tooltip = parseInt(zIndex['z-index'].tooltip.value);

    expect(hide).toBeLessThan(base);
    expect(base).toBeLessThan(raised);
    expect(raised).toBeLessThan(modal);
    expect(modal).toBeLessThan(tooltip);
  });
});

describe('Cubic Bezier (Easing) Values', () => {
  const animation = loadTokenFile('ingredients', 'animation.json');
  const easingTokens = findTokensByType(animation, 'cubicBezier');

  it('should have easing tokens', () => {
    expect(easingTokens.length).toBeGreaterThan(0);
  });

  easingTokens.forEach(({ path, value }) => {
    // Skip references
    if (typeof value === 'string' && value.includes('{')) {
      return;
    }

    it(`${path} should be valid easing function`, () => {
      const cubicBezierPattern = /^cubic-bezier\(\s*-?\d+\.?\d*\s*,\s*-?\d+\.?\d*\s*,\s*-?\d+\.?\d*\s*,\s*-?\d+\.?\d*\s*\)$/;
      const namedEasings = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];

      const isValid = cubicBezierPattern.test(value) || namedEasings.includes(value);
      expect(isValid).toBe(true);
    });
  });
});

describe('Shadow Values', () => {
  const elevation = loadTokenFile('ingredients', 'elevation.json');
  const shadowTokens = findTokensByType(elevation, 'shadow');

  it('should have shadow tokens', () => {
    expect(shadowTokens.length).toBeGreaterThan(0);
  });

  shadowTokens.forEach(({ path, value }) => {
    // Skip references
    if (typeof value === 'string' && value.includes('{')) {
      return;
    }

    if (value === 'none') {
      it(`${path} can be 'none'`, () => {
        expect(value).toBe('none');
      });
    } else {
      it(`${path} should have valid box-shadow syntax`, () => {
        // Basic check: should contain numbers and rgba
        expect(value).toMatch(/\d+/);
        expect(value).toMatch(/rgba?\(/);
      });
    }
  });
});

describe('Font Family Values', () => {
  const font = loadTokenFile('ingredients', 'font.json');
  const fontFamilyTokens = findTokensByType(font, 'fontFamily');

  it('should have font family tokens', () => {
    expect(fontFamilyTokens.length).toBeGreaterThan(0);
  });

  fontFamilyTokens.forEach(({ path, value }) => {
    // Skip references
    if (typeof value === 'string' && value.includes('{')) {
      return;
    }

    it(`${path} should be non-empty string`, () => {
      expect(value).toBeDefined();
      expect(value.length).toBeGreaterThan(0);
    });

    it(`${path} should have at least one font`, () => {
      const fonts = value.split(',').map(f => f.trim());
      expect(fonts.length).toBeGreaterThan(0);
    });
  });
});
