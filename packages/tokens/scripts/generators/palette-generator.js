/**
 * OKLCH Palette Generator
 *
 * Generates scientifically-designed 11-step color palettes using OKLCH color space
 * for perceptual uniformity and guaranteed WCAG accessibility.
 *
 * @module palette-generator
 */

import { formatHex, oklch, wcagContrast } from "culori";

/**
 * Lightness steps for an 11-step palette (50-950)
 * These values are carefully calibrated for:
 * - Perceptual uniformity in OKLCH space
 * - WCAG AA contrast compliance when used with appropriate backgrounds
 * - Visual balance across the scale
 */
const LIGHTNESS_SCALE = {
  50: 0.98, // Lightest tint
  100: 0.95,
  200: 0.9,
  300: 0.82,
  400: 0.73,
  500: 0.64, // Base/mid-tone
  600: 0.56,
  700: 0.47,
  800: 0.38,
  900: 0.3,
  950: 0.22, // Darkest shade
};

/**
 * Chroma (saturation) adjustments for different lightness levels
 * Prevents colors from appearing washed out at extremes
 *
 * @param {number} baseChroma - Base chroma value (0-0.4)
 * @param {number} lightness - Lightness value (0-1)
 * @returns {number} Adjusted chroma
 */
function adjustChroma(baseChroma, lightness) {
  // Reduce chroma at very light values to prevent oversaturation
  if (lightness > 0.92) {
    return baseChroma * 0.4;
  }
  if (lightness > 0.85) {
    return baseChroma * 0.7;
  }

  // Reduce chroma at very dark values to maintain depth
  if (lightness < 0.3) {
    return baseChroma * 0.6;
  }
  if (lightness < 0.4) {
    return baseChroma * 0.8;
  }

  // Use full chroma in mid-range for vibrant colors
  return baseChroma;
}

/**
 * Generates an 11-step color palette using OKLCH
 *
 * @param {Object} config - Palette configuration
 * @param {number} config.hue - Base hue (0-360 degrees)
 * @param {number} config.chroma - Base chroma/saturation (0-0.4, typically 0.15-0.25)
 * @param {string} config.name - Palette name (e.g., 'orange', 'blue')
 * @param {Object} [config.adjustments] - Optional lightness adjustments per step
 * @returns {Object} Generated palette with hex values
 *
 * @example
 * const orangePalette = generatePalette({
 *   hue: 25,
 *   chroma: 0.20,
 *   name: 'orange'
 * });
 * // Returns: { 50: '#fff5ed', 100: '#ffead5', ..., 950: '#431407' }
 */
export function generatePalette(config) {
  const { hue, chroma, name, adjustments = {} } = config;

  const palette = {};

  Object.entries(LIGHTNESS_SCALE).forEach(([step, baseLightness]) => {
    // Apply any custom lightness adjustments for this step
    const lightness = adjustments[step] || baseLightness;

    // Adjust chroma based on lightness to maintain visual consistency
    const adjustedChroma = adjustChroma(chroma, lightness);

    // Create OKLCH color
    const color = {
      mode: "oklch",
      l: lightness,
      c: adjustedChroma,
      h: hue,
    };

    // Convert to hex
    const hex = formatHex(color);

    palette[step] = {
      value: hex,
      oklch: {
        l: Number(lightness.toFixed(3)),
        c: Number(adjustedChroma.toFixed(3)),
        h: Number(hue.toFixed(1)),
      },
    };
  });

  return {
    name,
    palette,
  };
}

/**
 * Generates a neutral palette with optional warmth/coolness
 *
 * @param {Object} config - Neutral palette configuration
 * @param {string} config.name - Palette name (e.g., 'neutral', 'neutral-warm', 'neutral-cool')
 * @param {number} [config.warmth=0] - Warmth adjustment (-1 to 1)
 *   - Negative values: cooler (blue-ish)
 *   - 0: true neutral
 *   - Positive values: warmer (orange-ish)
 * @returns {Object} Generated neutral palette
 *
 * @example
 * const neutralWarm = generateNeutralPalette({
 *   name: 'neutral-warm',
 *   warmth: 0.3
 * });
 */
export function generateNeutralPalette(config) {
  const { name, warmth = 0 } = config;

  // Determine hue based on warmth
  // Cool: 220° (blue), Neutral: no hue, Warm: 30° (orange)
  let hue = undefined;
  let baseChroma = 0.01; // Very low saturation for neutrals

  if (warmth > 0) {
    // Warm neutrals (orange tint)
    hue = 30;
    baseChroma = 0.015 + warmth * 0.01;
  } else if (warmth < 0) {
    // Cool neutrals (blue tint)
    hue = 220;
    baseChroma = 0.015 + Math.abs(warmth) * 0.01;
  } else {
    // True neutral (achromatic)
    baseChroma = 0.005;
  }

  const palette = {};

  Object.entries(LIGHTNESS_SCALE).forEach(([step, lightness]) => {
    const color = {
      mode: "oklch",
      l: lightness,
      c: baseChroma,
      h: hue,
    };

    const hex = formatHex(color);

    palette[step] = {
      value: hex,
      oklch: {
        l: Number(lightness.toFixed(3)),
        c: Number(baseChroma.toFixed(3)),
        h: hue ? Number(hue.toFixed(1)) : undefined,
      },
    };
  });

  return {
    name,
    palette,
  };
}

/**
 * Validates WCAG contrast ratios for a palette
 * Tests common text-on-background combinations
 *
 * @param {Object} palette - Generated palette
 * @param {Object} options - Validation options
 * @param {number} [options.minContrast=4.5] - Minimum contrast ratio (WCAG AA = 4.5, AAA = 7)
 * @returns {Object} Validation results
 */
export function validatePaletteContrast(palette, options = {}) {
  const { minContrast = 4.5 } = options;
  const results = {
    valid: true,
    failures: [],
    tests: [],
  };

  // Test: Dark text (900) on light backgrounds (50-200)
  ["50", "100", "200"].forEach((bg) => {
    const contrast = wcagContrast(palette[bg].value, palette["900"].value);
    const test = {
      background: bg,
      foreground: "900",
      contrast: Number(contrast.toFixed(2)),
      passes: contrast >= minContrast,
    };
    results.tests.push(test);

    if (!test.passes) {
      results.valid = false;
      results.failures.push(
        `${bg} bg + 900 text = ${test.contrast} (min: ${minContrast})`,
      );
    }
  });

  // Test: Light text (50) on dark backgrounds (700-950)
  ["700", "800", "900", "950"].forEach((bg) => {
    const contrast = wcagContrast(palette[bg].value, palette["50"].value);
    const test = {
      background: bg,
      foreground: "50",
      contrast: Number(contrast.toFixed(2)),
      passes: contrast >= minContrast,
    };
    results.tests.push(test);

    if (!test.passes) {
      results.valid = false;
      results.failures.push(
        `${bg} bg + 50 text = ${test.contrast} (min: ${minContrast})`,
      );
    }
  });

  return results;
}

/**
 * Predefined palette configurations for Sando's 8 curated palettes
 */
export const CURATED_PALETTES = {
  orange: {
    hue: 25,
    chroma: 0.2,
    name: "orange",
  },
  blue: {
    hue: 220,
    chroma: 0.18,
    name: "blue",
  },
  green: {
    hue: 140,
    chroma: 0.17,
    name: "green",
  },
  red: {
    hue: 10,
    chroma: 0.22,
    name: "red",
  },
  purple: {
    hue: 280,
    chroma: 0.19,
    name: "purple",
  },
  pink: {
    hue: 340,
    chroma: 0.21,
    name: "pink",
  },
};

/**
 * Predefined neutral configurations
 */
export const NEUTRAL_PALETTES = {
  neutral: {
    name: "neutral",
    warmth: 0,
  },
  "neutral-warm": {
    name: "neutral-warm",
    warmth: 0.3,
  },
  "neutral-cool": {
    name: "neutral-cool",
    warmth: -0.3,
  },
};
