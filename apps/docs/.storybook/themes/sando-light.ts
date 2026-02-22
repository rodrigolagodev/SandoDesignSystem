import { create } from "@storybook/theming/create";
import { lightPalette, typography, layout } from "./variables";

/**
 * Sando Design System - Light Theme
 *
 * Light mode Storybook theme using warm neutral tones
 * with Kohaku amber (琥珀) primary accent color.
 *
 * This file contains ALL available Storybook theme variables.
 * Each variable is documented with its purpose for easy customization.
 *
 * @see https://storybook.js.org/docs/configure/theming
 *
 * Available variables (from ThemeVarsColors interface):
 * - colorPrimary, colorSecondary
 * - appBg, appContentBg, appPreviewBg, appBorderColor, appBorderRadius
 * - fontBase, fontCode
 * - textColor, textInverseColor, textMutedColor
 * - barTextColor, barHoverColor, barSelectedColor, barBg
 * - buttonBg, buttonBorder
 * - booleanBg, booleanSelectedBg
 * - inputBg, inputBorder, inputTextColor, inputBorderRadius
 * - brandTitle, brandUrl, brandImage, brandTarget
 * - gridCellSize
 */
export const sandoLightTheme = create({
  // ============================================================================
  // BASE THEME
  // ============================================================================
  // Determines the base theme to extend ("light" or "dark")
  // This affects default colors that aren't explicitly set
  base: "light",

  // ============================================================================
  // BRAND IDENTITY
  // ============================================================================
  // These appear in the sidebar header

  // Title shown in the sidebar (can include HTML)
  brandTitle: "Sando Design System",

  // URL when clicking the brand title/logo
  brandUrl: "/",

  // Path to brand logo image (replaces brandTitle if set)
  // Uncomment and set path to use a logo instead of text
  // brandImage: "/sando-logo.svg",

  // Link target for brandUrl ("_self" = same tab, "_blank" = new tab)
  brandTarget: "_self",

  // ============================================================================
  // PRIMARY COLORS
  // ============================================================================
  // Main accent colors used throughout the UI

  // Primary brand color - used for highlights, active states, and accents
  // Appears in: active nav items, primary buttons, links
  colorPrimary: lightPalette.primary,

  // Secondary accent color - used for secondary actions and hover states
  // Appears in: secondary buttons, hover effects
  colorSecondary: lightPalette.primaryHover,

  // ============================================================================
  // UI CHROME COLORS
  // ============================================================================
  // Background colors for different UI regions

  // Main application background (sidebar, toolbar areas)
  // This is the overall chrome background color
  appBg: lightPalette.appBg,

  // Content area background (docs page, canvas area behind preview)
  // The main content reading area
  appContentBg: lightPalette.contentBg,

  // Story preview iframe background
  // This is the actual canvas where components render
  // Set to WHITE for light mode per design requirement
  appPreviewBg: "#ffffff",

  // Border color for UI element dividers
  // Used between panels, around cards, etc.
  appBorderColor: lightPalette.border,

  // Global border radius for UI containers (in pixels)
  // Affects cards, panels, and other containers
  appBorderRadius: layout.appBorderRadius,

  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================
  // Font families for different content types

  // Primary font stack for UI text, headings, and body copy
  // Used throughout the Storybook interface
  fontBase: typography.fontBase,

  // Monospace font stack for code blocks and technical content
  // Used in source code panels, args tables, etc.
  fontCode: typography.fontCode,

  // ============================================================================
  // TEXT COLORS
  // ============================================================================
  // Colors for different text hierarchies

  // Primary text color for headings and important content
  // The main readable text color
  textColor: lightPalette.textPrimary,

  // Inverse text color for text on dark/colored backgrounds
  // Used on primary buttons, dark badges, etc.
  textInverseColor: lightPalette.textInverse,

  // Muted text color for secondary/supporting content
  // Used for descriptions, captions, hints
  textMutedColor: lightPalette.textMuted,

  // ============================================================================
  // TOOLBAR COLORS
  // ============================================================================
  // Colors for the top toolbar and its items

  // Default text color for toolbar items
  // The normal, non-interactive state
  barTextColor: lightPalette.textSecondary,

  // Hover state color for toolbar items
  // When mouse hovers over an item
  barHoverColor: lightPalette.primaryHover,

  // Selected/active state color for toolbar items
  // Currently active tool or toggle
  barSelectedColor: lightPalette.primary,

  // Toolbar background color
  // The horizontal bar at the top of the canvas
  barBg: lightPalette.appBg,

  // ============================================================================
  // FORM INPUT COLORS
  // ============================================================================
  // Colors for form controls (controls panel, search, etc.)

  // Background color for text inputs and textareas
  inputBg: lightPalette.appBg,

  // Border color for input fields
  inputBorder: lightPalette.border,

  // Text color inside input fields
  inputTextColor: lightPalette.textPrimary,

  // Border radius for input fields (in pixels)
  inputBorderRadius: layout.inputBorderRadius,

  // ============================================================================
  // BUTTON COLORS
  // ============================================================================
  // Colors for button elements in the UI

  // Background color for primary buttons
  buttonBg: lightPalette.primary,

  // Border color for buttons
  buttonBorder: lightPalette.primaryHover,

  // ============================================================================
  // BOOLEAN TOGGLE COLORS
  // ============================================================================
  // Colors for boolean/checkbox toggle controls

  // Background color for unselected boolean toggles
  booleanBg: lightPalette.appBg,

  // Background color for selected/checked boolean toggles
  booleanSelectedBg: lightPalette.primary,

  // ============================================================================
  // GRID CONFIGURATION
  // ============================================================================
  // Settings for the background grid overlay

  // Size of each grid cell in pixels (for grid addon)
  // Controls the spacing of the visual grid overlay
  gridCellSize: 8,
});

export default sandoLightTheme;
