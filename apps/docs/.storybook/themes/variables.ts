/**
 * Sando Design System - Storybook Theme Variables
 *
 * Centralized color palettes, typography, and layout values
 * for Storybook manager theming. Aligned with Sando flavor tokens.
 *
 * Colors extracted from flavor "sando":
 * - Primary: brown palette (Tonkatsu Amber) - hue 50°
 * - Neutral: neutralWarm palette (Shokupan) - hue 30°
 *
 * OKLCH to HEX conversions for Storybook compatibility.
 */

// ============================================================================
// Color Palettes - Aligned with Sando Flavor Tokens
// ============================================================================

/**
 * Light mode color palette
 * Matches sando/flavor.json semantic tokens
 *
 * Key mappings:
 * - primary → color.action.solid.background.default → brown.600
 * - primaryHover → color.action.solid.background.hover → brown.700
 * - appBg → color.background.base → neutralWarm.50
 * - contentBg → WHITE (per requirement: previews should be white)
 * - textPrimary → color.text.heading → neutralWarm.950
 * - border → color.border.default → neutralWarm.300
 */
export const lightPalette = {
  // Primary colors (brown - Tonkatsu Amber, hue 50°)
  // action.solid.background.default → brown.600 oklch(0.55 0.08 50)
  primary: "#8b5a2b",
  // action.solid.background.hover → brown.700 oklch(0.46 0.07 50)
  primaryHover: "#704a24",
  // brown.100 oklch(0.96 0.02 50)
  primaryLight: "#f7f0e8",
  // brown.800 oklch(0.37 0.06 50)
  primaryDark: "#5a3c1e",

  // Background colors
  // background.base → neutralWarm.50 oklch(0.98 0.018 30)
  appBg: "#faf8f6",
  // OVERRIDE: Preview backgrounds should be pure white
  contentBg: "#ffffff",
  // background.base → neutralWarm.50
  sidebarBg: "#faf8f6",

  // Text colors
  // text.heading → neutralWarm.950 oklch(0.22 0.018 30)
  textPrimary: "#2d2926",
  // text.body → neutralWarm.800 oklch(0.38 0.018 30)
  textSecondary: "#524b45",
  // text.muted → neutralWarm.500 oklch(0.64 0.018 30)
  textMuted: "#9c938a",
  // text.on-solid → white
  textInverse: "#ffffff",

  // Border colors
  // border.default → neutralWarm.300 oklch(0.82 0.018 30)
  border: "#ccc5be",
  // border.muted → neutralWarm.200 oklch(0.9 0.018 30)
  borderLight: "#e5dfda",

  // Interactive states
  // selection.background → brown.100
  selected: "#f7f0e8",
  // brown.700
  selectedText: "#704a24",
  // background.hover → neutralWarm.100 oklch(0.95 0.018 30)
  hover: "#f2eeea",
  // focus.ring → brown.500 oklch(0.65 0.08 50)
  focus: "#a06b35",

  // Status colors (for badges) - from state tokens
  success: "#e6f4ea",
  successText: "#1e7e34",
  warning: "#fff8e6",
  warningText: "#b8860b",
  error: "#fce8e8",
  errorText: "#c62828",
  info: "#e8f4fc",
  infoText: "#1565c0",
  purple: "#f3e8ff",
  purpleText: "#6b21a8",
} as const;

/**
 * Dark mode color palette
 * Matches sando/flavor-dark.json semantic tokens
 *
 * Key mappings:
 * - primary → color.action.solid.background.default → brown.500
 * - primaryHover → color.action.solid.background.hover → brown.400
 * - appBg → color.background.base → neutralWarm.950
 * - contentBg → BLACK (per requirement: previews should be black in dark mode)
 * - textPrimary → color.text.heading → neutralWarm.50
 * - border → color.border.default → neutralWarm.600
 */
export const darkPalette = {
  // Primary colors (brown - adjusted for dark mode)
  // action.solid.background.default (dark) → brown.500 oklch(0.65 0.08 50)
  primary: "#a06b35",
  // action.solid.background.hover (dark) → brown.400 oklch(0.74 0.07 50)
  primaryHover: "#ba8a52",
  // brown.950 oklch(0.21 0.04 50)
  primaryLight: "#2a1f14",
  // brown.300 oklch(0.84 0.05 50)
  primaryDark: "#d4b896",

  // Background colors
  // background.base (dark) → neutralWarm.950 oklch(0.22 0.018 30)
  appBg: "#2d2926",
  // OVERRIDE: Preview backgrounds should be pure black in dark mode
  contentBg: "#000000",
  // neutralWarm.950
  sidebarBg: "#2d2926",

  // Text colors
  // text.heading (dark) → neutralWarm.50 oklch(0.98 0.018 30)
  textPrimary: "#faf8f6",
  // text.body (dark) → neutralWarm.200 oklch(0.9 0.018 30)
  textSecondary: "#e5dfda",
  // text.muted (dark) → neutralWarm.400 oklch(0.73 0.018 30)
  textMuted: "#b3aaa1",
  // text.on-solid → white
  textInverse: "#2d2926",

  // Border colors
  // border.default (dark) → neutralWarm.600 oklch(0.56 0.018 30)
  border: "#6e655c",
  // border.muted (dark) → neutralWarm.700 oklch(0.47 0.018 30)
  borderLight: "#5a524a",

  // Interactive states
  // selection.background (dark) → brown.800 oklch(0.37 0.06 50)
  selected: "#5a3c1e",
  // brown.400
  selectedText: "#ba8a52",
  // background.hover (dark) → neutralWarm.800 oklch(0.38 0.018 30)
  hover: "#524b45",
  // focus.ring (dark) → brown.400
  focus: "#ba8a52",

  // Status colors (for badges - dark mode variants)
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
  // border.radius.emphasis → 8px (border.radius.200)
  appBorderRadius: 8,
  // border.radius.muted → 2px (border.radius.50)
  inputBorderRadius: 4,
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
