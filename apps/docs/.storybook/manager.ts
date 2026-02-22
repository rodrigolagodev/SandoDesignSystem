import { addons } from "@storybook/manager-api";
import {
  defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges";
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
 *
 * Badge colors are inlined hex values (not from palette) since status colors
 * were removed from the token system. These are Storybook UI colors only.
 */

addons.setConfig({
  // Theme is set by storybook-dark-mode addon based on parameters.darkMode.light/dark
  tagBadges: [
    // Stable - Production-ready components
    {
      tags: "stable",
      badge: {
        text: "Stable",
        bgColor: "#d8ffd8", // green.50
        fgColor: "#007400", // green.700
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
        bgColor: "#fff9cb", // yellow.50
        fgColor: "#765600", // yellow.700
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
        bgColor: "#c4ffff", // blue.50
        fgColor: "#0063b8", // blue.700
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
        bgColor: "#ffe1e5", // red.50
        fgColor: "#b50030", // red.700
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
        bgColor: "#f3e8ff", // purple.50
        fgColor: "#6b21a8", // purple.700
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
