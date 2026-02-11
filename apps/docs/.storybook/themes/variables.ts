/**
 * Sando Design System - Storybook Theme Variables
 *
 * Centralized color palettes, typography, and layout values
 * for Storybook manager theming. Based on Sando design tokens.
 */

// ============================================================================
// Color Palettes
// ============================================================================

/**
 * Light mode color palette
 * Uses warm neutral tones with orange primary
 */
export const lightPalette = {
  // Primary colors (orange)
  primary: "#f97316", // orange-500
  primaryHover: "#ea580c", // orange-600
  primaryLight: "#ffedd5", // orange-100
  primaryDark: "#c2410c", // orange-700

  // Background colors
  appBg: "#fafaf9", // neutralWarm-50
  contentBg: "#ffffff",
  sidebarBg: "#fafaf9", // neutralWarm-50

  // Text colors
  textPrimary: "#0c0a09", // neutralWarm-950
  textSecondary: "#44403c", // neutralWarm-700
  textMuted: "#78716c", // neutralWarm-500
  textInverse: "#fafaf9", // neutralWarm-50

  // Border colors
  border: "#e7e5e4", // neutralWarm-200
  borderLight: "#f5f5f4", // neutralWarm-100

  // Interactive states
  selected: "#ffedd5", // orange-100
  selectedText: "#c2410c", // orange-700
  hover: "#f5f5f4", // neutralWarm-100
  focus: "#f97316", // orange-500

  // Status colors (for badges)
  success: "#dcfce7", // green-100
  successText: "#166534", // green-800
  warning: "#fef3c7", // amber-100
  warningText: "#92400e", // amber-800
  error: "#fee2e2", // red-100
  errorText: "#991b1b", // red-800
  info: "#dbeafe", // blue-100
  infoText: "#1e40af", // blue-800
  purple: "#f3e8ff", // purple-100
  purpleText: "#6b21a8", // purple-800
} as const;

/**
 * Dark mode color palette
 * Inverted warm neutrals with adjusted orange for dark backgrounds
 */
export const darkPalette = {
  // Primary colors (orange - adjusted for dark mode)
  primary: "#fb923c", // orange-400
  primaryHover: "#f97316", // orange-500
  primaryLight: "#431407", // orange-950
  primaryDark: "#fdba74", // orange-300

  // Background colors
  appBg: "#0c0a09", // neutralWarm-950
  contentBg: "#1c1917", // neutralWarm-900
  sidebarBg: "#0c0a09", // neutralWarm-950

  // Text colors
  textPrimary: "#fafaf9", // neutralWarm-50
  textSecondary: "#d6d3d1", // neutralWarm-300
  textMuted: "#a8a29e", // neutralWarm-400
  textInverse: "#0c0a09", // neutralWarm-950

  // Border colors
  border: "#292524", // neutralWarm-800
  borderLight: "#1c1917", // neutralWarm-900

  // Interactive states
  selected: "#431407", // orange-950
  selectedText: "#fb923c", // orange-400
  hover: "#1c1917", // neutralWarm-900
  focus: "#fb923c", // orange-400

  // Status colors (for badges - dark mode variants)
  success: "#14532d", // green-900
  successText: "#86efac", // green-300
  warning: "#78350f", // amber-900
  warningText: "#fcd34d", // amber-300
  error: "#7f1d1d", // red-900
  errorText: "#fca5a5", // red-300
  info: "#1e3a8a", // blue-900
  infoText: "#93c5fd", // blue-300
  purple: "#581c87", // purple-900
  purpleText: "#d8b4fe", // purple-300
} as const;

// ============================================================================
// Typography
// ============================================================================

export const typography = {
  fontBase:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Fira Code", "JetBrains Mono", Consolas, monospace',
} as const;

// ============================================================================
// Layout
// ============================================================================

export const layout = {
  appBorderRadius: 8,
  inputBorderRadius: 4,
} as const;

// ============================================================================
// Timing
// ============================================================================

export const timing = {
  fast: "200ms",
  normal: "300ms",
} as const;

// Type exports
export type ColorPalette = typeof lightPalette;
