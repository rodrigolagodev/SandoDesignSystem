import { create } from "@storybook/theming/create";
import { darkPalette, typography, layout } from "./variables";

/**
 * Sando Design System - Dark Theme
 *
 * Dark mode Storybook theme using inverted warm neutrals
 * with adjusted orange primary for dark backgrounds.
 */
export const sandoDarkTheme = create({
  base: "dark",

  // Brand
  brandTitle: "Sando Design System",
  brandUrl: "/",
  brandImage: "/sando-logo.svg",
  brandTarget: "_self",

  // Colors
  colorPrimary: darkPalette.primary,
  colorSecondary: darkPalette.primaryHover,

  // UI
  appBg: darkPalette.appBg,
  appContentBg: darkPalette.contentBg,
  appBorderColor: darkPalette.border,
  appBorderRadius: layout.appBorderRadius,
  appPreviewBg: darkPalette.contentBg,

  // Typography
  fontBase: typography.fontBase,
  fontCode: typography.fontCode,

  // Text colors
  textColor: darkPalette.textPrimary,
  textInverseColor: darkPalette.textInverse,
  textMutedColor: darkPalette.textMuted,

  // Toolbar
  barTextColor: darkPalette.textSecondary,
  barSelectedColor: darkPalette.primary,
  barHoverColor: darkPalette.primaryHover,
  barBg: darkPalette.contentBg,

  // Form colors
  inputBg: darkPalette.contentBg,
  inputBorder: darkPalette.border,
  inputTextColor: darkPalette.textPrimary,
  inputBorderRadius: layout.inputBorderRadius,

  // Button colors
  buttonBg: darkPalette.primary,
  buttonBorder: darkPalette.primaryHover,

  // Boolean input colors
  booleanBg: darkPalette.appBg,
  booleanSelectedBg: darkPalette.primary,
});

export default sandoDarkTheme;
