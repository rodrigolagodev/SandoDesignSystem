/**
 * Sando Design System - Storybook Theme Variables
 *
 * Brutalist Design Language:
 * - Primary: Vermillion palette (hue 25°) - Electric red-orange accent
 * - Neutral: Ink palette (zero chroma) - Pure neutrals
 *
 * @see packages/tokens/src/flavors/brutalist/
 */

// ============================================================================
// Color Palettes - Aligned with Sando Flavor Tokens
// ============================================================================

/**
 * Light mode color palette
 * Brutalist design language with Vermillion accent and Ink neutrals
 *
 * Key mappings:
 * - primary → vermillion.600
 * - primaryHover → vermillion.700
 * - appBg → ink.50
 * - contentBg → WHITE (per requirement: previews should be white)
 * - textPrimary → ink.950
 * - border → ink.300
 */
export const lightPalette = {
  // Primary colors (vermillion - Brutalist accent, hue 25°)
  primary: "#C13B1E", // vermillion.600
  primaryHover: "#9E2F18", // vermillion.700
  primaryLight: "#FEE2E2", // vermillion.100 approx
  primaryDark: "#7A2515", // vermillion.800

  // Background colors (ink - pure neutrals)
  appBg: "#FAFAFA", // ink.50
  contentBg: "#FFFFFF", // pure white
  sidebarBg: "#FAFAFA", // ink.50

  // Text colors (ink)
  textPrimary: "#171717", // ink.950
  textSecondary: "#525252", // ink.700
  textMuted: "#A3A3A3", // ink.500
  textInverse: "#FFFFFF",

  // Border colors (ink)
  border: "#D4D4D4", // ink.300
  borderLight: "#E5E5E5", // ink.200

  // Interactive states (vermillion accent)
  selected: "#FEE2E2", // vermillion.100 approx
  selectedText: "#7A2515", // vermillion.800
  hover: "#F5F5F5", // ink.100
  focus: "#C13B1E", // vermillion.600

  // Status colors (keep same)
  success: "#dcfce7",
  successText: "#166534",
  warning: "#fef3c7",
  warningText: "#92400e",
  error: "#fee2e2",
  errorText: "#991b1b",
  info: "#dbeafe",
  infoText: "#1e40af",
  purple: "#f3e8ff",
  purpleText: "#6b21a8",
} as const;

/**
 * Dark mode color palette
 * Brutalist design language with Vermillion accent and Ink neutrals
 *
 * Key mappings:
 * - primary → vermillion.500
 * - primaryHover → vermillion.400
 * - appBg → ink.950
 * - contentBg → near black (per requirement: previews should be black in dark mode)
 * - textPrimary → ink.50
 * - border → ink.800
 */
export const darkPalette = {
  // Primary colors (vermillion - adjusted for dark mode)
  primary: "#D4553B", // vermillion.500
  primaryHover: "#E07159", // vermillion.400
  primaryLight: "#450A0A", // vermillion.950 approx
  primaryDark: "#C13B1E", // vermillion.600

  // Background colors (ink - inverted)
  appBg: "#171717", // ink.950
  contentBg: "#0A0A0A", // near black
  sidebarBg: "#171717", // ink.950

  // Text colors (ink - inverted)
  textPrimary: "#FAFAFA", // ink.50
  textSecondary: "#D4D4D4", // ink.300
  textMuted: "#A3A3A3", // ink.500
  textInverse: "#171717",

  // Border colors (ink - inverted)
  border: "#404040", // ink.800
  borderLight: "#262626", // ink.900

  // Interactive states
  selected: "#450A0A", // vermillion.950 approx
  selectedText: "#D4553B", // vermillion.500
  hover: "#262626", // ink.900
  focus: "#D4553B", // vermillion.500

  // Status colors (dark mode - keep same)
  success: "#14532d",
  successText: "#86efac",
  warning: "#78350f",
  warningText: "#fcd34d",
  error: "#7f1d1d",
  errorText: "#fca5a5",
  info: "#1e3a8a",
  infoText: "#93c5fd",
  purple: "#581c87",
  purpleText: "#d8b4fe",
} as const;

// ============================================================================
// Typography - Aligned with Sando Flavor font.family tokens
// ============================================================================

export const typography = {
  // font.family.body → Inter
  fontBase:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  // font.family.mono → JetBrains Mono
  fontCode: '"JetBrains Mono", "Fira Code", Consolas, monospace',
} as const;

// ============================================================================
// Layout - Aligned with Sando Flavor border.radius tokens
// ============================================================================

export const layout = {
  // border.radius.emphasis → 4px (brutalist - sharper)
  appBorderRadius: 4,
  // border.radius.muted → 2px
  inputBorderRadius: 2,
} as const;

// ============================================================================
// Timing - Aligned with Sando Flavor animation.duration tokens
// ============================================================================

export const timing = {
  // animation.duration.fast → 100ms
  fast: "100ms",
  // animation.duration.normal → 200ms
  normal: "200ms",
} as const;

// Type exports
export type ColorPalette = typeof lightPalette;
