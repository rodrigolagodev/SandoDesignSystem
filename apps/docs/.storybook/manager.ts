import { addons } from "@storybook/manager-api";
import {
  defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges";
import theme from "./theme";
import "./manager.css";

/**
 * Sando Design System Storybook Manager Configuration
 *
 * Configures the Storybook UI with custom theme and tag badges
 * for component status indication (stable, beta, new, deprecated).
 */
addons.setConfig({
  theme,
  tagBadges: [
    // Stable - Production-ready components
    {
      tags: "stable",
      badge: {
        text: "Stable",
        bgColor: "#dcfce7", // green-100
        fgColor: "#166534", // green-800
      },
      display: {
        sidebar: ["component"],
        toolbar: undefined,
      },
    },
    // Beta - Components in testing phase
    {
      tags: "beta",
      badge: {
        text: "Beta",
        bgColor: "#fef3c7", // amber-100
        fgColor: "#92400e", // amber-800
      },
      display: {
        sidebar: ["component"],
        toolbar: undefined,
      },
    },
    // New - Recently added components
    {
      tags: "new",
      badge: {
        text: "New",
        bgColor: "#dbeafe", // blue-100
        fgColor: "#1e40af", // blue-800
      },
      display: {
        sidebar: ["component"],
        toolbar: undefined,
      },
    },
    // Deprecated - Components scheduled for removal
    {
      tags: "deprecated",
      badge: {
        text: "Deprecated",
        bgColor: "#fee2e2", // red-100
        fgColor: "#991b1b", // red-800
      },
      display: {
        sidebar: ["component"],
        toolbar: undefined,
      },
    },
    // Updated - Recently modified components
    {
      tags: "updated",
      badge: {
        text: "Updated",
        bgColor: "#f3e8ff", // purple-100
        fgColor: "#6b21a8", // purple-800
      },
      display: {
        sidebar: ["component"],
        toolbar: undefined,
      },
    },
    // Include default config for other tags
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
