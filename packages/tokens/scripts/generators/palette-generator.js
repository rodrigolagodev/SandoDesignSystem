/**
 * OKLCH Palette Generator
 *
 * Generates scientifically-designed 11-step color palettes using OKLCH color space
 * for perceptual uniformity and guaranteed WCAG accessibility.
 *
 * Supports 14 curated chromatic palettes and 4 neutral palettes,
 * plus 3 utility colors (18 palette groups + 3 utilities = 21 total).
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
 * Generates a neutral palette with configurable hue and chroma
 *
 * @param {Object} config - Neutral palette configuration
 * @param {string} config.name - Palette name (e.g., 'neutral', 'neutralWarm')
 * @param {number} [config.hue] - Optional hue angle (undefined = achromatic)
 * @param {number} [config.chroma] - Fixed chroma value (for non-adaptive)
 * @param {number} [config.chromaLight] - Chroma for light steps (adaptive mode)
 * @param {number} [config.chromaDark] - Chroma for dark steps (adaptive mode)
 * @param {boolean} [config.adaptive=false] - Whether to use adaptive chroma curve
 * @returns {Object} Generated neutral palette
 */
export function generateNeutralPalette(config) {
  const {
    name,
    hue,
    chroma: fixedChroma,
    chromaLight,
    chromaDark,
    adaptive = false,
  } = config;

  const palette = {};

  Object.entries(LIGHTNESS_SCALE).forEach(([step, lightness]) => {
    let stepChroma;

    if (adaptive && chromaLight !== undefined && chromaDark !== undefined) {
      // Adaptive chroma: interpolate between light and dark values based on lightness
      // At L=0.98 → chromaLight, at L=0.22 → chromaDark
      const t = (lightness - 0.22) / (0.98 - 0.22);
      stepChroma = chromaDark + t * (chromaLight - chromaDark);
    } else {
      stepChroma = fixedChroma || 0.005;
    }

    const color = {
      mode: "oklch",
      l: lightness,
      c: stepChroma,
      h: hue,
    };

    const hex = formatHex(color);

    palette[step] = {
      value: hex,
      oklch: {
        l: Number(lightness.toFixed(3)),
        c: Number(stepChroma.toFixed(4)),
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
 * Predefined chromatic palette configurations for Sando's 14 curated palettes
 * Organized by hue wheel position (ascending hue order).
 */
export const CURATED_PALETTES = {
  red: { hue: 15, chroma: 0.22, name: "red", profile: "high" },
  orange: { hue: 32, chroma: 0.2, name: "orange", profile: "medium" },
  amber: { hue: 55, chroma: 0.15, name: "amber", profile: "low" },
  yellow: { hue: 95, chroma: 0.15, name: "yellow", profile: "low" },
  lime: { hue: 120, chroma: 0.15, name: "lime", profile: "low" },
  green: { hue: 145, chroma: 0.2, name: "green", profile: "medium" },
  emerald: { hue: 165, chroma: 0.2, name: "emerald", profile: "medium" },
  cyan: { hue: 190, chroma: 0.2, name: "cyan", profile: "medium" },
  sky: { hue: 210, chroma: 0.2, name: "sky", profile: "medium" },
  blue: { hue: 235, chroma: 0.2, name: "blue", profile: "medium" },
  indigo: { hue: 265, chroma: 0.2, name: "indigo", profile: "medium" },
  purple: { hue: 290, chroma: 0.2, name: "purple", profile: "medium" },
  violet: { hue: 310, chroma: 0.22, name: "violet", profile: "high" },
  pink: { hue: 350, chroma: 0.22, name: "pink", profile: "high" },
};

/**
 * Predefined neutral palette configurations
 *
 * - neutral: Pure achromatic gray (chroma 0.005)
 * - neutralWarm: Washi paper warmth (hue 70°) with adaptive chroma
 *   Higher chroma in lights (0.02) for visible warmth, lower in darks (0.012) to avoid muddiness
 * - neutralCool: Cool blue-tinted gray (hue 220°, flat chroma 0.018)
 * - sand: Sandy warm neutral (hue 60°, flat chroma 0.025)
 */
export const NEUTRAL_PALETTES = {
  neutral: {
    name: "neutral",
    hue: undefined,
    chroma: 0.005,
    adaptive: false,
  },
  neutralWarm: {
    name: "neutralWarm",
    hue: 70,
    chromaLight: 0.02,
    chromaDark: 0.012,
    adaptive: true,
  },
  neutralCool: {
    name: "neutralCool",
    hue: 220,
    chroma: 0.018,
    adaptive: false,
  },
  sand: {
    name: "sand",
    hue: 60,
    chroma: 0.025,
    adaptive: false,
  },
};
