import { addons } from "@storybook/manager-api";
import {
  defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges";
import { lightPalette } from "./themes";
import "./manager.css";

/**
 * Sando Design System Storybook Manager Configuration
 *
 * Features:
 * - Dark/light mode controlled by storybook-dark-mode addon
 * - Tag badges for component status (stable, beta, new, deprecated)
 *
 * Note: Theme switching is now handled by the storybook-dark-mode addon.
 * The addon automatically syncs the Manager UI theme with the toggle button.
 * Our custom Sando themes are configured in preview.js parameters.darkMode.
 */

// Use light palette for badge colors (they look good in both modes)
const palette = lightPalette;

addons.setConfig({
  // Theme is set by storybook-dark-mode addon based on parameters.darkMode.light/dark
  tagBadges: [
    // Stable - Production-ready components
    {
      tags: "stable",
      badge: {
        text: "Stable",
        bgColor: palette.success,
        fgColor: palette.successText,
      },
      display: {
        sidebar: ["component", "docs", "group"],
        toolbar: true,
      },
    },
    // Beta - Components in testing phase
    {
      tags: "beta",
      badge: {
        text: "Beta",
        bgColor: palette.warning,
        fgColor: palette.warningText,
      },
      display: {
        sidebar: ["component", "docs", "group"],
        toolbar: true,
      },
    },
    // New - Recently added components
    {
      tags: "new",
      badge: {
        text: "New",
        bgColor: palette.info,
        fgColor: palette.infoText,
      },
      display: {
        sidebar: ["component", "docs", "group"],
        toolbar: true,
      },
    },
    // Deprecated - Components scheduled for removal
    {
      tags: "deprecated",
      badge: {
        text: "Deprecated",
        bgColor: palette.error,
        fgColor: palette.errorText,
      },
      display: {
        sidebar: ["component", "docs", "group"],
        toolbar: true,
      },
    },
    // Updated - Recently modified components
    {
      tags: "updated",
      badge: {
        text: "Updated",
        bgColor: palette.purple,
        fgColor: palette.purpleText,
      },
      display: {
        sidebar: ["component", "docs", "group"],
        toolbar: true,
      },
    },
    // Include default config for other tags
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
