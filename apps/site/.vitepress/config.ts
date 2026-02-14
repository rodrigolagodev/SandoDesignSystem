import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Sando Design System",
  description:
    "A modern, accessible, token-based design system built with Web Components",
  base: "/SandoDesignSystem/docs/",
  ignoreDeadLinks: true,

  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Guide", link: "/getting-started/introduction" },
      { text: "Tokens", link: "/tokens/architecture" },
      { text: "Components", link: "/components/overview" },
      {
        text: "Storybook",
        link: "https://rodrigolagodev.github.io/SandoDesignSystem/storybook/",
        target: "_blank",
      },
    ],

    sidebar: {
      "/getting-started/": [
        {
          text: "Getting Started",
          items: [
            { text: "Introduction", link: "/getting-started/introduction" },
            { text: "Installation", link: "/getting-started/installation" },
            { text: "Quick Start", link: "/getting-started/quick-start" },
            { text: "Theming", link: "/getting-started/theming" },
            { text: "Dependencies", link: "/getting-started/dependencies" },
          ],
        },
      ],

      "/tokens/": [
        {
          text: "Design Tokens",
          items: [
            { text: "Architecture", link: "/tokens/architecture" },
            { text: "Ingredients", link: "/tokens/ingredients" },
            { text: "Flavors", link: "/tokens/flavors" },
            { text: "Recipes", link: "/tokens/recipes" },
            { text: "Testing", link: "/tokens/testing" },
          ],
        },
      ],

      "/components/": [
        {
          text: "Components",
          items: [
            { text: "Overview", link: "/components/overview" },
            { text: "Badge", link: "/components/badge" },
            { text: "Button", link: "/components/button" },
            { text: "Checkbox", link: "/components/checkbox" },
            { text: "Form", link: "/components/form" },
            { text: "Form Group", link: "/components/form-group" },
            { text: "Help Text", link: "/components/help-text" },
            { text: "Icon", link: "/components/icon" },
            { text: "Input", link: "/components/input" },
            { text: "Label", link: "/components/label" },
            { text: "Radio", link: "/components/radio" },
            { text: "Select", link: "/components/select" },
            { text: "Skeleton", link: "/components/skeleton" },
            { text: "Spinner", link: "/components/spinner" },
            { text: "Switch", link: "/components/switch" },
            { text: "Tag", link: "/components/tag" },
            { text: "Textarea", link: "/components/textarea" },
          ],
        },
      ],

      "/guides/": [
        {
          text: "Philosophy",
          items: [
            {
              text: "Why Flavors, Not Themes",
              link: "/guides/flavor-philosophy",
            },
          ],
        },
        {
          text: "Guides",
          items: [
            { text: "Contributing", link: "/guides/contributing" },
            { text: "Accessibility", link: "/guides/accessibility" },
            { text: "Browser Support", link: "/guides/browser-support" },
          ],
        },
      ],

      "/docs/design-system/flavors/": [
        {
          text: "Flavor Profiles",
          items: [
            {
              text: "Brutalist",
              link: "/docs/design-system/flavors/brutalist",
            },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/rodrigolagodev/SandoDesignSystem",
      },
    ],

    search: {
      provider: "local",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 Rodrigo Lago",
    },
  },

  markdown: {
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    lineNumbers: true,
  },

  vite: {
    ssr: {
      noExternal: ["@sando/tokens"],
    },
    build: {
      rollupOptions: {
        external: ["@sando/components/button", "@sando/components"],
      },
    },
  },
});
