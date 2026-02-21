import { create } from "@storybook/theming/create";
import { darkPalette, typography, layout } from "./variables";

/**
 * Sando Design System - Dark Theme
 *
 * Dark mode Storybook theme using inverted warm neutrals
 * with adjusted Kohaku amber (琥珀) primary for dark backgrounds.
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
export const sandoDarkTheme = create({
  // ============================================================================
  // BASE THEME
  // ============================================================================
  // Determines the base theme to extend ("light" or "dark")
  // This affects default colors that aren't explicitly set
  base: "dark",

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
  // Note: Lighter shade for dark mode to ensure visibility
  colorPrimary: darkPalette.primary,

  // Secondary accent color - used for secondary actions and hover states
  // Appears in: secondary buttons, hover effects
  colorSecondary: darkPalette.primaryHover,

  // ============================================================================
  // UI CHROME COLORS
  // ============================================================================
  // Background colors for different UI regions

  // Main application background (sidebar, toolbar areas)
  // This is the overall chrome background color
  appBg: darkPalette.appBg,

  // Content area background (docs page, canvas area behind preview)
  // The main content reading area
  appContentBg: darkPalette.contentBg,

  // Story preview iframe background
  // This is the actual canvas where components render
  // Set to BLACK for dark mode per design requirement
  appPreviewBg: "#000000",

  // Border color for UI element dividers
  // Used between panels, around cards, etc.
  appBorderColor: darkPalette.border,

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
  // The main readable text color (light on dark background)
  textColor: darkPalette.textPrimary,

  // Inverse text color for text on light/colored backgrounds
  // Used on light badges, inverted sections, etc.
  textInverseColor: darkPalette.textInverse,

  // Muted text color for secondary/supporting content
  // Used for descriptions, captions, hints
  textMutedColor: darkPalette.textMuted,

  // ============================================================================
  // TOOLBAR COLORS
  // ============================================================================
  // Colors for the top toolbar and its items

  // Default text color for toolbar items
  // The normal, non-interactive state
  barTextColor: darkPalette.textSecondary,

  // Hover state color for toolbar items
  // When mouse hovers over an item
  barHoverColor: darkPalette.primaryHover,

  // Selected/active state color for toolbar items
  // Currently active tool or toggle
  barSelectedColor: darkPalette.primary,

  // Toolbar background color
  // The horizontal bar at the top of the canvas
  barBg: darkPalette.appBg,

  // ============================================================================
  // FORM INPUT COLORS
  // ============================================================================
  // Colors for form controls (controls panel, search, etc.)

  // Background color for text inputs and textareas
  inputBg: darkPalette.appBg,

  // Border color for input fields
  inputBorder: darkPalette.border,

  // Text color inside input fields
  inputTextColor: darkPalette.textPrimary,

  // Border radius for input fields (in pixels)
  inputBorderRadius: layout.inputBorderRadius,

  // ============================================================================
  // BUTTON COLORS
  // ============================================================================
  // Colors for button elements in the UI

  // Background color for primary buttons
  buttonBg: darkPalette.primary,

  // Border color for buttons
  buttonBorder: darkPalette.primaryHover,

  // ============================================================================
  // BOOLEAN TOGGLE COLORS
  // ============================================================================
  // Colors for boolean/checkbox toggle controls

  // Background color for unselected boolean toggles
  booleanBg: darkPalette.appBg,

  // Background color for selected/checked boolean toggles
  booleanSelectedBg: darkPalette.primary,

  // ============================================================================
  // GRID CONFIGURATION
  // ============================================================================
  // Settings for the background grid overlay

  // Size of each grid cell in pixels (for grid addon)
  // Controls the spacing of the visual grid overlay
  gridCellSize: 8,
});

export default sandoDarkTheme;
