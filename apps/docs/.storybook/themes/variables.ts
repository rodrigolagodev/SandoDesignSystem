/**
 * Sando Design System - Storybook Theme Variables
 *
 * Warm Precision Design Language (精密な温もり):
 * - Primary: Amber palette (hue 55°) — Kohaku (琥珀)
 * - Neutral: NeutralWarm palette (hue 70°) — Washi (和紙)
 *
 * @see packages/tokens/src/flavors/sando/
 */

// ============================================================================
// Color Palettes - Aligned with Sando Flavor Tokens
// ============================================================================

/**
 * Light mode color palette
 * Warm Precision design language with Amber accent and NeutralWarm neutrals
 *
 * Key mappings:
 * - primary → amber.600
 * - primaryHover → amber.700
 * - appBg → neutralWarm.50
 * - contentBg → WHITE (per requirement: previews should be white)
 * - textPrimary → neutralWarm.950
 * - border → neutralWarm.300
 */
export const lightPalette = {
  // Primary colors (amber - Warm Precision accent, hue 55°)
  primary: "#8D6E10", // amber.600
  primaryHover: "#6B530C", // amber.700
  primaryLight: "#FFF8E1", // amber.50
  primaryDark: "#4A3A09", // amber.800

  // Background colors (neutralWarm)
  appBg: "#FAF9F6", // neutralWarm.50
  contentBg: "#FFFFFF", // pure white
  sidebarBg: "#FAF9F6", // neutralWarm.50

  // Text colors (neutralWarm)
  textPrimary: "#1E1B17", // neutralWarm.950
  textSecondary: "#5C5549", // neutralWarm.600
  textMuted: "#9E9689", // neutralWarm.400
  textInverse: "#FFFFFF",

  // Border colors (neutralWarm)
  border: "#CFC9C0", // neutralWarm.300
  borderLight: "#E8E1D9", // neutralWarm.200

  // Interactive states (amber accent)
  selected: "#FFF8E1", // amber.50
  selectedText: "#4A3A09", // amber.800
  selectedBorder: "#8D6E10", // amber.600 — 2px left border accent
  selectedHoverBg: "#FFE88A", // amber.100
  selectedHoverText: "#4A3A09", // amber.800 (same as selectedText)
  hoverText: "#1E1B17", // neutralWarm.950 — text darkens on hover
  hover: "#F5F0EB", // neutralWarm.100
  focus: "#8D6E10", // amber.600

  // Status colors — aligned with chromatic palettes (Phase 10)
  success: "#d8ffd8", // green.50
  successText: "#007400", // green.700
  warning: "#fff9cb", // yellow.50
  warningText: "#765600", // yellow.700
  error: "#ffe1e5", // red.50
  errorText: "#b50030", // red.700
  info: "#c4ffff", // blue.50
  infoText: "#0063b8", // blue.700
  purple: "#f3e8ff", // keep as-is (not a state color)
  purpleText: "#6b21a8", // keep as-is
} as const;

/**
 * Dark mode color palette
 * Warm Precision design language with Amber accent and Neutral achromatic neutrals
 *
 * Key mappings:
 * - primary → amber.400
 * - primaryHover → amber.300
 * - appBg → neutral.950
 * - contentBg → near black (per requirement: previews should be black in dark mode)
 * - textPrimary → neutral.50
 * - border → neutral.800
 */
export const darkPalette = {
  // Primary colors (amber - adjusted for dark mode)
  primary: "#D4A017", // amber.400
  primaryHover: "#FFCA28", // amber.300
  primaryLight: "#2A2005", // amber.950
  primaryDark: "#A88514", // amber.500

  // Background colors (neutral - inverted)
  appBg: "#0F0F0F", // neutral.950
  contentBg: "#0A0A0A", // near black
  sidebarBg: "#0F0F0F", // neutral.950

  // Text colors (neutral - inverted)
  textPrimary: "#F5F5F5", // neutral.50
  textSecondary: "#C7C7C7", // neutral.300
  textMuted: "#A0A0A0", // neutral.400
  textInverse: "#0F0F0F",

  // Border colors (neutral - inverted)
  border: "#292929", // neutral.800
  borderLight: "#1A1A1A", // neutral.900

  // Interactive states
  selected: "#1E1B17", // neutralWarm.950
  selectedText: "#D4A017", // amber.400
  selectedBorder: "#D4A017", // amber.400 — 2px left border accent
  selectedHoverBg: "#2E2A24", // neutralWarm.900
  selectedHoverText: "#FFCA28", // amber.300
  hoverText: "#F5F5F5", // neutral.50 — text brightens on hover
  hover: "#1A1A1A", // neutral.900
  focus: "#D4A017", // amber.400

  // Status colors — dark mode, aligned with chromatic palettes (Phase 10)
  success: "#003f00", // green.900
  successText: "#cefdce", // green.100
  warning: "#412a00", // yellow.900
  warningText: "#fbefc2", // yellow.100
  error: "#6c000d", // red.900
  errorText: "#ffd7db", // red.100
  info: "#003170", // blue.900
  infoText: "#baf8ff", // blue.100
  purple: "#581c87", // keep as-is
  purpleText: "#d8b4fe", // keep as-is
} as const;

// ============================================================================
// Typography - Aligned with Sando Flavor font.family tokens
// ============================================================================

export const typography = {
  // Headings: Space Grotesk (Warm Precision)
  fontHeading: '"Space Grotesk", "Arial", sans-serif',
  // Body: DM Sans
  fontBase:
    '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  // Code: Fira Code
  fontCode: '"Fira Code", "JetBrains Mono", Consolas, monospace',
} as const;

// ============================================================================
// Layout - Aligned with Sando Flavor border.radius tokens
// ============================================================================

export const layout = {
  // border.radius.emphasis → 4px (Warm Precision)
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
