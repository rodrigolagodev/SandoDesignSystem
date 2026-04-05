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
 * Aligned with VitePress color mappings for visual consistency.
 *
 * Key mappings (aligned with VitePress --vp-c-* variables):
 * - primary → amber.600 (VitePress --vp-c-brand-1)
 * - primaryHover → amber.700 (VitePress --vp-c-brand-2)
 * - appBg → neutralWarm.100 (VitePress --vp-c-bg-alt) — sidebar/toolbar chrome
 * - contentBg → neutralWarm.50 (VitePress --vp-c-bg) — main content area
 * - sidebarBg → neutralWarm.100 (VitePress --vp-c-bg-alt)
 * - textPrimary → neutralWarm.950 (VitePress --vp-c-text-1)
 * - textSecondary → neutralWarm.800 (VitePress --vp-c-text-2)
 * - textMuted → neutralWarm.500 (VitePress --vp-c-text-3)
 * - border → neutralWarm.300 (VitePress --vp-c-border)
 */
export const lightPalette = {
  // Primary colors (amber - Warm Precision accent, hue 55°)
  primary: "#B45600", // amber.600
  primaryHover: "#973B00", // amber.700
  primaryLight: "#FFEFD3", // amber.50
  primaryDark: "#702A00", // amber.800

  // Background colors (neutralWarm) — aligned with VitePress
  appBg: "#F8ECE0", // neutralWarm.100 (VitePress --vp-c-bg-alt — sidebar/toolbar chrome)
  contentBg: "#FFF6EA", // neutralWarm.50 (VitePress --vp-c-bg — main content area)
  sidebarBg: "#F8ECE0", // neutralWarm.100 (VitePress --vp-c-bg-alt)

  // Text colors (neutralWarm) — aligned with VitePress
  textPrimary: "#1E1A15", // neutralWarm.950 (VitePress --vp-c-text-1)
  textSecondary: "#47413C", // neutralWarm.800 (VitePress --vp-c-text-2)
  textMuted: "#928B83", // neutralWarm.500 (VitePress --vp-c-text-3)
  textInverse: "#FFFFFF",

  // Border colors (neutralWarm) — aligned with VitePress
  border: "#CBC3B9", // neutralWarm.300 (VitePress --vp-c-border)
  borderLight: "#E6DCD2", // neutralWarm.200

  // Interactive states (amber accent)
  selected: "#FFEFD3", // amber.50
  selectedText: "#702A00", // amber.800
  selectedBorder: "#B45600", // amber.600 — 2px left border accent
  selectedHoverBg: "#FFE5C9", // amber.100
  selectedHoverText: "#702A00", // amber.800 (same as selectedText)
  hoverText: "#1E1A15", // neutralWarm.950 — text darkens on hover
  hover: "#E6DCD2", // neutralWarm.200 (visible against neutralWarm.100 sidebar bg)
  focus: "#B45600", // amber.600
} as const;

/**
 * Dark mode color palette
 * Warm Precision design language with Amber accent and Neutral achromatic neutrals
 * Aligned with VitePress dark mode color mappings for visual consistency.
 *
 * Key mappings (aligned with VitePress .dark --vp-c-* variables):
 * - primary → amber.400 (VitePress --vp-c-brand-1)
 * - primaryHover → amber.300 (VitePress --vp-c-brand-2)
 * - appBg → neutral.900 (VitePress --vp-c-bg-alt) — sidebar/toolbar chrome
 * - contentBg → neutral.950 (VitePress --vp-c-bg) — main content area
 * - sidebarBg → neutral.900 (VitePress --vp-c-bg-alt) — used by manager.css
 * - textPrimary → neutral.50 (VitePress --vp-c-text-1)
 * - textSecondary → neutral.200 (VitePress --vp-c-text-2)
 * - border → neutral.600 (VitePress --vp-c-border)
 */
export const darkPalette = {
  // Primary colors (amber - adjusted for dark mode)
  primary: "#EE8B3E", // amber.400
  primaryHover: "#FFA85D", // amber.300
  primaryLight: "#370700", // amber.950
  primaryDark: "#CF6F19", // amber.500

  // Background colors (neutral - inverted) — aligned with VitePress
  appBg: "#302D2E", // neutral.900 (VitePress --vp-c-bg-alt) — sidebar/toolbar chrome
  contentBg: "#1D1A1A", // neutral.950 (VitePress --vp-c-bg) — main content area
  sidebarBg: "#302D2E", // neutral.900 (VitePress --vp-c-bg-alt) — used by manager.css

  // Text colors (neutral - inverted) — aligned with VitePress
  textPrimary: "#FCF7F8", // neutral.50 (VitePress --vp-c-text-1)
  textSecondary: "#E1DDDE", // neutral.200 (VitePress --vp-c-text-2)
  textMuted: "#AAA6A7", // neutral.400 (VitePress --vp-c-text-3)
  textInverse: "#1D1A1A", // neutral.950

  // Border colors (neutral - inverted) — aligned with VitePress
  border: "#777374", // neutral.600 (VitePress --vp-c-border)
  borderLight: "#454142", // neutral.800

  // Interactive states
  selected: "#1E1A15", // neutralWarm.950
  selectedText: "#EE8B3E", // amber.400
  selectedBorder: "#EE8B3E", // amber.400 — 2px left border accent
  selectedHoverBg: "#322D27", // neutralWarm.900
  selectedHoverText: "#FFA85D", // amber.300
  hoverText: "#FCF7F8", // neutral.50 — text brightens on hover
  hover: "#454142", // neutral.800 (visible contrast against neutral.900 appBg)
  focus: "#EE8B3E", // amber.400
} as const;

// ============================================================================
// Typography - Aligned with Sando Flavor font.family tokens
// ============================================================================

export const typography = {
  // Headings: Outfit (Warm Precision)
  fontHeading: '"Outfit", system-ui, sans-serif',
  // Body: Source Sans 3
  fontBase: '"Source Sans 3", system-ui, sans-serif',
  // Code: Fira Code
  fontCode: '"Fira Code", Consolas, monospace',
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
