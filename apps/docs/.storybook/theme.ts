import { create } from "@storybook/theming/create";

/**
 * Sando Design System Storybook Theme
 *
 * Custom theme with Sando brand colors based on the design system's
 * orange primary palette and warm neutral tones.
 */
export default create({
  base: "light",

  // Brand
  brandTitle: "Sando Design System",
  brandUrl: "/",
  brandImage: "/sando-logo.svg",
  brandTarget: "_self",

  // Colors - Using Sando's orange primary
  colorPrimary: "#f97316", // orange-500
  colorSecondary: "#ea580c", // orange-600

  // UI
  appBg: "#fafaf9", // stone-50
  appContentBg: "#ffffff",
  appBorderColor: "#e7e5e4", // stone-200
  appBorderRadius: 8,

  // Typography
  fontBase:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Fira Code", "JetBrains Mono", Consolas, monospace',

  // Text colors
  textColor: "#1c1917", // stone-900
  textInverseColor: "#fafaf9", // stone-50
  textMutedColor: "#78716c", // stone-500

  // Toolbar
  barTextColor: "#57534e", // stone-600
  barSelectedColor: "#f97316", // orange-500
  barHoverColor: "#ea580c", // orange-600
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#d6d3d1", // stone-300
  inputTextColor: "#1c1917", // stone-900
  inputBorderRadius: 4,

  // Button colors
  buttonBg: "#f97316",
  buttonBorder: "#ea580c",

  // Boolean colors
  booleanBg: "#fafaf9",
  booleanSelectedBg: "#f97316",
});
