import { create } from "@storybook/theming/create";
import { lightPalette, typography, layout } from "./variables";

/**
 * Sando Design System - Light Theme
 *
 * Light mode Storybook theme using warm neutral tones
 * with orange primary accent color.
 */
export const sandoLightTheme = create({
  base: "light",

  // Brand
  brandTitle: "Sando Design System",
  brandUrl: "/",
  brandImage: "/sando-logo.svg",
  brandTarget: "_self",

  // Colors
  colorPrimary: lightPalette.primary,
  colorSecondary: lightPalette.primaryHover,

  // UI
  appBg: lightPalette.appBg,
  appContentBg: lightPalette.contentBg,
  appBorderColor: lightPalette.border,
  appBorderRadius: layout.appBorderRadius,
  appPreviewBg: lightPalette.contentBg,

  // Typography
  fontBase: typography.fontBase,
  fontCode: typography.fontCode,

  // Text colors
  textColor: lightPalette.textPrimary,
  textInverseColor: lightPalette.textInverse,
  textMutedColor: lightPalette.textMuted,

  // Toolbar
  barTextColor: lightPalette.textSecondary,
  barSelectedColor: lightPalette.primary,
  barHoverColor: lightPalette.primaryHover,
  barBg: lightPalette.contentBg,

  // Form colors
  inputBg: lightPalette.contentBg,
  inputBorder: lightPalette.border,
  inputTextColor: lightPalette.textPrimary,
  inputBorderRadius: layout.inputBorderRadius,

  // Button colors
  buttonBg: lightPalette.primary,
  buttonBorder: lightPalette.primaryHover,

  // Boolean input colors
  booleanBg: lightPalette.appBg,
  booleanSelectedBg: lightPalette.primary,
});

export default sandoLightTheme;
